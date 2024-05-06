import React from "react";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import SearchBar from "../../SearchBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
