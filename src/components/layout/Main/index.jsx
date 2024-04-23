import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="mt-40 min-h-screen">
      <Outlet />
    </main>
  );
};

export default Main;
