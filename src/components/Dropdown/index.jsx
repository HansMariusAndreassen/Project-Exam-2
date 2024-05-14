import React, { useState, useRef, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const DropdownMenu = ({ onActivate, listItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full hover:text-primary"
      >
        <FaRegEdit size={16} />
      </button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#FFF",
            listStyle: "none",
            borderRadius: 5,
          }}
        >
          <li
            className="p-2 hover:underline hover:text-primary hover:cursor-pointer"
            onClick={() => {
              onActivate();
              setIsOpen(false);
            }}
          >
            {listItem}
          </li>
        </ul>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  onActivate: PropTypes.func.isRequired,
  listItem: PropTypes.string.isRequired,
};

export default DropdownMenu;
