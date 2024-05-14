import { useState, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const performFetch = useCallback(
    async (options = {}) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          ...options.headers,
        });

        if (token) {
          console.log("Logged in. Using token and key");
          headers.append("Authorization", `Bearer ${token}`);
          headers.append("X-Noroff-API-Key", apiKey);
        }

        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, apiKey]
  );

  return { data, loading, error, performFetch };
};

export default useFetch;
