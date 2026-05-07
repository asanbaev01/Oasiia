import { useState, useEffect } from "react";
import i18n from "../i18n";

export function useFetch(fetchFn, params = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn(...params);
        if (cancelled) return;
        if (response?.data?.results !== undefined) {
          setData(response.data.results);
        } else if (Array.isArray(response?.data)) {
          setData(response.data);
        } else {
          setData(response.data || response);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("useFetch error:", err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [JSON.stringify(params), i18n.language]);

  return { data, loading, error };
}
