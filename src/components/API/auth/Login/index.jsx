import { useCallback, useState, useEffect } from "react";
import useFetch from "../FetchHook";

/**
 * Custom hook for handling login functionality.
 *
 * @param {string} url - The URL for the login API endpoint.
 * @returns {object} - An object containing the loading state, error state, login status, login function, and success status.
 */
const useLogin = (url) => {
  const { data, loading, error, performFetch, isSuccess } = useFetch(url);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useCallback(
    (credentials) => {
      performFetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    },
    [performFetch]
  );

  useEffect(() => {
    console.log(data);
    if (data && data.data.accessToken) {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));
      setLoggedIn(true);
    }
  }, [data]);

  return { loading, error, loggedIn, login, isSuccess };
};

export default useLogin;
