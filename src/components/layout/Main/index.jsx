import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollToTop from "../../../utils/ScrollToTop";
import ScrollToTopButton from "../../../utils/ScrollToTopBtn";
import BackButton from "../../../utils/BackBtn";

const ContinentContext = React.createContext();

/**
 * Main component that wraps the main content of the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.selectedContinent - The currently selected continent.
 * @param {function} props.setSelectedContinent - A function to set the selected continent.
 * @returns {JSX.Element} The rendered Main component.
 */
const Main = ({ selectedContinent, setSelectedContinent }) => {
  return (
    <ContinentContext.Provider
      value={{ selectedContinent, setSelectedContinent }}
    >
      <ScrollToTop />
      <main className="pt-[7rem] min-h-screen">
        <BackButton />
        <Outlet />
        <ScrollToTopButton />
      </main>
    </ContinentContext.Provider>
  );
};

Main.propTypes = {
  selectedContinent: PropTypes.string,
  setSelectedContinent: PropTypes.func,
};

export { Main, ContinentContext };
