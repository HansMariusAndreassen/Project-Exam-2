import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../utils/logOut";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

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
          {token && (
            <button onClick={() => navigate("/profile")} className="btn">
              Profile
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
    </header>
  );
};

export default Header;
