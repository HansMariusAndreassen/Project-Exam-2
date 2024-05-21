import React, { useState, useRef, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const DropdownMenu = ({ onActivate, listItems }) => {
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
      <button onClick={() => setIsOpen(!isOpen)} className="hover:text-primary">
        <FaRegEdit size={18} />
      </button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#FFF",
            listStyle: "none",
            borderRadius: 5,
            top: 25,
            right: -15,
            minWidth: 100,
          }}
        >
          {listItems.map((item, index) => (
            <li
              key={index}
              className="p-3 text-left hover:underline hover:text-primary hover:cursor-pointer"
              onClick={() => {
                onActivate(item.value);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  onActivate: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
};

export default DropdownMenu;
