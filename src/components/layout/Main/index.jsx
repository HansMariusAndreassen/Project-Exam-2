import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollToTop from "../../../utils/ScrollToTop";
import ScrollToTopButton from "../../../utils/ScrollToTopBtn";
import BackButton from "../../../utils/BackBtn";

/**
 * Context object for managing continent data.
 * @type {React.Context}
 */
const ContinentContext = React.createContext();

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
