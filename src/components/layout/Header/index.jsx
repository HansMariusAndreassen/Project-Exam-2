import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../utils/logOut";
import { FaUser } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <header className="bg-secondary fixed w-full z-[61]">
      <nav className=" flex justify-between m-auto p-5 max-w-[1440px]">
        <h1
          onClick={() => navigate("/")}
          className="text-primary uppercase text-2xl hover:cursor-pointer hover:text-background transition-all duration-300 ease-in-out"
        >
          Havens
        </h1>
        <div className="flex gap-2">
          {token && (
            <button onClick={() => navigate("/profile")} className="btn">
              <FaUser />
            </button>
          )}

          {!token && (
            <button onClick={() => navigate("/registration")} className="btn">
              Register
            </button>
          )}
          {token && (
            <button onClick={handleLogOut} className="btn">
              Log Out
            </button>
          )}
          {!token && (
            <button onClick={() => navigate("/login")} className="btn">
              Login
            </button>
          )}
        </div>
      </nav>
      <div className="plane text-primary">
        <IoAirplaneSharp />
      </div>
    </header>
  );
};

export default Header;
