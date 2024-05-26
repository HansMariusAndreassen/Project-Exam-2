import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../utils/logOut";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import ThemeContext from "../../Theme";

/**
 * Represents the header component of the application.
 * @returns {JSX.Element} The header component.
 */
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-secondary fixed w-full z-[61]">
      <nav className="flex justify-between items-center m-auto p-5 max-w-[1440px]">
        <h1
          onClick={() => navigate("/")}
          className="text-primary uppercase text-2xl hover:cursor-pointer hover:text-background transition-all duration-300 ease-in-out"
        >
          Havens
        </h1>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-primary focus:outline-none flex"
            aria-label="toggle menu"
          >
            {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
        <div className="hidden md:flex flex-wrap gap-2">
          <button
            type="button"
            className={`toggle-switch ${theme}`}
            onClick={toggleTheme}
            aria-label="dark light toggle button"
          >
            <span className="icon">{theme === "light" ? "🌞" : "🌜"}</span>
          </button>
          {token && (
            <button
              onClick={() => {
                navigate("/profile");
                closeMenu();
              }}
              aria-label="user profile button"
              className="btn"
            >
              <FaUser />
            </button>
          )}
          {!token && (
            <button
              onClick={() => {
                navigate("/registration");
                closeMenu();
              }}
              aria-label="register button"
              className="btn"
            >
              Register
            </button>
          )}
          {token && (
            <button
              onClick={() => {
                handleLogOut();
                closeMenu();
              }}
              className="btn"
            >
              Log Out
            </button>
          )}
          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
              className="btn"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <div
        ref={menuRef}
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-secondary w-full`}
      >
        <div className={`flex justify-around pb-5`}>
          <button
            type="button"
            className={`toggle-switch ${theme}`}
            onClick={() => {
              toggleTheme();
            }}
            aria-label="dark light toggle button"
          >
            <span className="icon">{theme === "light" ? "🌞" : "🌜"}</span>
          </button>
          {token && (
            <button
              onClick={() => {
                navigate("/profile");
              }}
              aria-label="user profile button"
              className="btn"
            >
              <FaUser />
            </button>
          )}
          {!token && (
            <button
              onClick={() => {
                navigate("/registration");
              }}
              aria-label="register button"
              className="btn"
            >
              Register
            </button>
          )}
          {token && (
            <button
              onClick={() => {
                handleLogOut();
              }}
              className="btn"
            >
              Log Out
            </button>
          )}
          {!token && (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="plane text-primary">
        <IoAirplaneSharp />
      </div>
    </header>
  );
};

export default Header;
