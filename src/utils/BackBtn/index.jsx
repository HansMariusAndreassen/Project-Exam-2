import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeContext from "../../components/Theme";

/**
 * Renders a back button that navigates to the previous page.
 *
 * @returns {JSX.Element|null} The back button component.
 */
const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const landingPagePath = "/";

  if (location.pathname === landingPagePath) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className={`py-2 px-4 rounded m-auto w-full text-sm ${theme === "light" ? "text-secondary" : "text-background"}`}
    >
      Go Back
    </button>
  );
};

export default BackButton;
