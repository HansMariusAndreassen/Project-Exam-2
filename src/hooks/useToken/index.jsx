import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("accessToken");
      if (newToken !== token) {
        setToken(newToken); // Update the state variable to trigger re-render

        if (location.pathname === "/profile/") {
          navigate("/"); // Navigate to the home page if the current path is "/profile"
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
