import { useState } from "react";
import { useApi } from "./ApiContext";

/**
 * Returns a function to mutate some data via the API, as well as some state
 * that tracks the response of that mutation request.
 */
export default function useMutation(method, resource, tagsToInvalidate) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // mutate can accept an optional overrideResource as a second argument
  const mutate = async (body, overrideResource) => {
    setLoading(true);
    setError(null);
    try {
      const target = overrideResource || resource;
      const options = { method };
      if (body !== undefined && body !== null)
        options.body = JSON.stringify(body);
      const result = await request(target, options);
      setData(result);
      invalidateTags(tagsToInvalidate);
      return result;
    } catch (e) {
      console.error(e);
      // Store the friendly message locally for components that read `error`
      setError(e.message);
      // Rethrow so callers (pages/components) can handle the error and show it
      // in a contextual place (e.g., per-activity error box).
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}
