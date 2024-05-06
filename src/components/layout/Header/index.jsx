import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-secondary fixed w-full z-50">
      <nav className=" flex justify-between m-auto p-5 max-w-[1440px]">
        <h1
          onClick={() => navigate("/")}
          className="text-primary uppercase text-2xl :hover: cursor-pointer"
        >
          Havens
        </h1>
        <div className="flex gap-2">
          <button onClick={() => navigate("/registration")} className="btn">
            Register
          </button>
          <button className="btn">Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
