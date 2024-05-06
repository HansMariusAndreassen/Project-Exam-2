import { useState, useCallback } from "react";
import heavens_API_Key from "../../../utils/constants";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performFetch = useCallback(
    async (options = {}) => {
      setLoading(true);
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          ...options.headers,
        });

        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
          headers.append("X-Noroff-API-Key", heavens_API_Key);
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
    [url]
  );

  return { data, loading, error, performFetch };
};

export default useFetch;
