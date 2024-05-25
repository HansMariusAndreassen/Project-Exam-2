import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component scrolls the window to the top whenever the pathname changes.
 * @returns {null}
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
