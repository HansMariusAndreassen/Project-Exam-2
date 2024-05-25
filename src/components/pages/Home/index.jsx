import React from "react";
import Cards from "../../Cards";

/**
 * Renders the Home component.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return (
    <>
      <h1 className="text-primary text-xl text-center">Featured Venues</h1>
      <Cards />
    </>
  );
};

export default Home;
