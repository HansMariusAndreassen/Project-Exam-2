import React, { useState } from "react";
import Header from "../Header";
import { Main } from "../Main";
import Footer from "../Footer";
import SearchBar from "../../SearchBar";

/**
 * Renders the layout of the application.
 *
 * @component
 * @returns {JSX.Element} The layout component.
 */
const Layout = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar onContinentSelect={handleContinentSelect} />
      <Main
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
      />
      <Footer />
    </div>
  );
};

export default Layout;
