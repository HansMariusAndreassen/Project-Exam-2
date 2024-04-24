import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ContinentMap from "../ContinentMap";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="m-auto">
      <h1>SearchBar</h1>
      <div
        onClick={() => toggleExpanded()}
        className="flex justify-center :hover cursor-pointer"
      >
        <div
          className={`bg-white gap-5 p-5 rounded-50 border-primary border-2 ${isExpanded ? "flex-col" : "justify-center items-center"}`}
        >
          <div className="flex justify-center items-center gap-10 px-10">
            <IoSearchSharp size={32} />
            <h2>You can go anywhere</h2>
            <RxHamburgerMenu size={32} />
          </div>
          <div className="flex">
            {isExpanded && (
              <div className="w-full mt-10">
                <input
                  type="text"
                  placeholder="Search for dates"
                  className="mt-3 p-2 border rounded-50 w-full"
                  aria-label="Search for dates"
                />
                <input
                  type="text"
                  placeholder="Search locations"
                  className="mt-3 p-2 border rounded-50 w-full"
                  aria-label="Search locations"
                />
                <div className="mt-10">
                  <ContinentMap />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
