import React, { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ContinentMap from "../ContinentMap";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContinentSelect = () => {
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-10 w-full m-auto z-[60]">
      <div className="flex justify-center ">
        <div
          id="search-bar"
          className="bg-white gap-5 p-5 rounded-50 border-primary border-2"
        >
          <div
            className="flex justify-center items-center gap-10  :hover cursor-pointer"
            onClick={() => toggleExpanded()}
          >
            <IoSearchSharp size={32} />
            <h2>You can go anywhere</h2>
            <RxHamburgerMenu size={32} />
          </div>
          <div className="flex">
            {isExpanded && (
              <div className="w-full">
                <input
                  type="date"
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
                  <ContinentMap onContinentSelect={handleContinentSelect} />
                </div>
                <div className="flex justify-end">
                  <IoClose
                    size={24}
                    className=":hover cursor-pointer"
                    onClick={() => toggleExpanded()}
                  />
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
