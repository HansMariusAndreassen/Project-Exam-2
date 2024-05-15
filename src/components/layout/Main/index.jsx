import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ContinentContext = React.createContext();

const Main = ({ selectedContinent, setSelectedContinent }) => {
  return (
    <ContinentContext.Provider
      value={{ selectedContinent, setSelectedContinent }}
    >
      <main className="pt-[9rem] min-h-screen">
        <Outlet />
      </main>
    </ContinentContext.Provider>
  );
};

Main.propTypes = {
  selectedContinent: PropTypes.string,
  setSelectedContinent: PropTypes.func,
};

export { Main, ContinentContext };
