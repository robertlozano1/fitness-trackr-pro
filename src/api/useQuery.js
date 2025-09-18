import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

/**
 * useQuery is a custom React hook for fetching data from the API.
 * - resource: the API endpoint (e.g. "/activities")
 * - tag: optional, used for cache invalidation after mutations
 * Returns: { data, loading, error }
 */
export default function useQuery(resource, tag) {
  // Get API request and tag functions from context
  const { request, provideTag } = useApi();

  // State for the fetched data, loading status, and error message
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const query = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource);
      setData(result);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs the query when the component mounts
  // If a tag is provided, register the query for cache invalidation
  useEffect(() => {
    if (tag) provideTag(tag, query);
    query();
  }, []);

  // Return the data, loading, and error states
  return { data, loading, error };
}
