/**
 * ApiContext attaches the user's authentication token to API requests when possible.
 * It also handles tags to refresh appropriate queries after a mutation.
 */

import { createContext, useContext, useState } from "react";

import { useAuth } from "../auth/AuthContext";

export const API = "https://fitnesstrac-kr.herokuapp.com/api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  /**
   * Makes an API call and parses the response as JSON if possible.
   * Throws an error if anything goes wrong.
   */
  const request = async (resource, options) => {
    const response = await fetch(API + resource, {
      ...options,
      headers,
    });
    const method =
      options && options.method ? options.method.toUpperCase() : "GET";
    let result;
    // Read response text once (if any) so we can reuse it for parsing and errors
    let rawText = undefined;
    if (response.status !== 204) {
      try {
        rawText = await response.text();
      } catch {
        rawText = undefined;
      }
    }

    // Try to parse JSON from the body when available (useful for error messages).
    // Some servers may omit the Content-Type header; in that case, try to
    // detect JSON by looking at the leading characters of the body.
    let parsedJson;
    const contentType = response.headers.get("Content-Type");
    const looksLikeJson = rawText && /^\s*[{[]/.test(rawText);
    if (
      rawText &&
      ((contentType && /json/.test(contentType)) || looksLikeJson)
    ) {
      try {
        parsedJson = JSON.parse(rawText);
      } catch {
        parsedJson = undefined;
      }
    }

    // For non-DELETE successful requests, return parsed JSON result
    if (method !== "DELETE") {
      result = parsedJson;
    } else {
      result = undefined;
    }

    if (!response.ok) {
      // Prefer the parsed JSON message when available
      let errorMessage = "Something went wrong :(";
      if (parsedJson?.message) {
        errorMessage = parsedJson.message;
      } else if (parsedJson?.error) {
        // some APIs use `error` field
        errorMessage = parsedJson.error;
      } else if (rawText) {
        errorMessage = `${response.status} ${response.statusText}: ${rawText}`;
      } else {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      const err = Error(errorMessage);
      // Attach parsed JSON so callers can inspect structured error details
      err.errorData = parsedJson;
      throw err;
    }
    return result;
  };

  const [tags, setTags] = useState({});

  /** Stores the provided query function for a given tag */
  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  /** Calls all query functions associated with the given tags */
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
