import React from "react";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
