import { useState, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const performFetch = useCallback(
    async (options = {}) => {
      setLoading(true);
      setError(null); // Reset error state before new request
      setIsSuccess(false); // Reset success state before new request
      const token = localStorage.getItem("accessToken");
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          ...options.headers,
        });

        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
          headers.append("X-Noroff-API-Key", apiKey);
        }

        const response = await fetch(url || options.url, {
          ...options,
          headers,
        });

        const json = await response.json();

        if (!response.ok) {
          const errorMessage =
            json.errors && json.errors[0] && json.errors[0].message
              ? json.errors[0].message
              : `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }

        setData(json);
        setIsSuccess(true); // Set success state if response is okay
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, apiKey]
  );

  return { data, loading, error, performFetch, isSuccess };
};

export default useFetch;
