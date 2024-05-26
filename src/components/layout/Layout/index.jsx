import React, { useContext, useState } from "react";
import Header from "../Header";
import { Main } from "../Main";
import Footer from "../Footer";
import SearchBar from "../../SearchBar";
import ThemeContext from "../../Theme";

/**
 * Represents the layout component of the application.
 * @component
 */
const Layout = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
  };
  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "light" ? "bg-background text-black" : "bg-secondary text-black"}`}
    >
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
// className={`${theme === "light" ? "bg-background text-black" : "bg-secondary text-white"}`}
