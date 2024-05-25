import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook that retrieves and manages the access token from local storage.
 *
 * @returns {string} The access token.
 */
const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("accessToken");
      if (newToken !== token) {
        setToken(newToken);

        if (location.pathname === "/profile/") {
          navigate("/");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token, navigate, location]);

  return token;
};

export default useToken;
