import { useEffect, useState } from "react";
import { baseUrl } from "../../../../utils/constants";

/**
 * Custom hook for making API requests to register a user.
 *
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} url - The URL to send the request to.
 * @param {object|null} body - The request body data (optional).
 * @returns {object} - An object containing the loading state, error state, and data from the API response.
 */
const useRegister = (method, url, body = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl + url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [method, url, body]);
  return { loading, error, data };
};

export default useRegister;
