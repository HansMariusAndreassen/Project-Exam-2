import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed min-w-full z-50">
      <nav className="flex max-w-7xl bg-secondary p-5 m-auto rounded-b-25 gap-2 items-center justify-between">
        <h1
          onClick={() => navigate("/")}
          className="text-primary uppercase text-2xl :hover: cursor-pointer"
        >
          Havens
        </h1>
        <div className="flex gap-2">
          <button className="btn">Register</button>
          <button className="btn">Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
