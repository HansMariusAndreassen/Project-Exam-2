import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="mt-[6rem] min-h-screen">
      <Outlet />
    </main>
  );
};

export default Main;
