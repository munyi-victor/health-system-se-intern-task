// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import axios from "../api/axios";

/**
 * Custom hook for fetching data from an API endpoint using Axios.
 * Automatically includes JWT token from Axios interceptor.
 *
 * @param url - The API endpoint to fetch data from
 * @returns An object containing the data, loading state, and error
 */
const useFetch = <T = any>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<T>(url);
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
