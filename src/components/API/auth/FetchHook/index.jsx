import { useState, useCallback } from "react";

/**
 * Custom hook for making API requests using the fetch function.
 *
 * @param {string} url - The URL to make the API request to.
 * @returns {object} - An object containing the response data, loading state, error state, success state, and a function to perform the fetch.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const performFetch = useCallback(
    async (options = {}) => {
      setLoading(true);
      setError(null);
      setIsSuccess(false);
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
        setIsSuccess(true);
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
