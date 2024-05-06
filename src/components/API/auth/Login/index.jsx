import { useCallback, useState, useEffect } from "react";
import useFetch from "../FetchHook";

const useLogin = (url) => {
  const { data, loading, error, performFetch } = useFetch(url);
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
    if (data && data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoggedIn(true);
    }
  }, [data]);

  return { loading, error, loggedIn, login };
};

export default useLogin;
