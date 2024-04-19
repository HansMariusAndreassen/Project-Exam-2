import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <h1>Hello world</h1>
      <Outlet />
    </main>
  );
};

export default Main;
