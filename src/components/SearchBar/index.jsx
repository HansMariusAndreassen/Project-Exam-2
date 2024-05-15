import React, { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ContinentMap from "../ContinentMap";
import useFetch from "../API/auth/FetchHook";
import { searchUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "../Cards/_components/Rating";

const SearchBar = ({ onContinentSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data, loading, error, performFetch } = useFetch(
    `${searchUrl}${searchQuery}`
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  // const handleContinentSelect = () => {
  //   setIsExpanded(false);
  //   onContinentSelect(onContinentSelect);
  // };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return; // Prevent searching with an empty query
    performFetch();
    setSearchQuery("");
    setShowResults(true);
  };

  const handleSearchResultClick = (id) => {
    navigate(`/booking/${id}`);
    setIsExpanded(false);
    setShowResults(false);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleContinentSelect = (continent) => {
    onContinentSelect(continent);
    setIsExpanded(false); // Close the search bar
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-10 w-full m-auto z-[60]">
      <div className="flex justify-center">
        <div
          id="search-bar"
          className="bg-white gap-5 p-5 rounded-50 border-primary border-2"
        >
          <div
            className="flex justify-center items-center gap-10 :hover cursor-pointer"
            onClick={toggleExpanded}
          >
            <IoSearchSharp size={32} />
            <h2>You can go anywhere</h2>
            <RxHamburgerMenu size={32} />
          </div>
          {isExpanded && (
            <div className="w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search here..."
                  className="mt-3 p-2 border rounded-50 w-full"
                  aria-label="Search for venues"
                />
                <button type="submit" className="hidden">
                  Search
                </button>
              </form>
              <div className="max-w-[375px]">
                {data && data.data.length === 0 && (
                  <p className="text-center">No title matches this search</p>
                )}
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center">Error: {error}</p>}
              </div>
              {showResults && data && (
                <div className="search-results">
                  {data.data.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleSearchResultClick(result.id)}
                    >
                      <div className="flex g-3 items-center  hover:border hover:cursor-pointer">
                        <div className="py-1">
                          {Array.isArray(result.media) &&
                          result.media.length > 0 ? (
                            // If media is an array and has elements, show the first one
                            <div>
                              <img
                                // className="w-20 h-auto m-2"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                                src={result.media[0].url}
                                alt={result.media[0].alternativeText || ""}
                              />
                            </div>
                          ) : result.media ? (
                            // If media is not an array but an object, render it directly
                            <div>
                              <img
                                className="w-auto h-20 m-2"
                                src={result.media.url}
                                alt={
                                  result.media.alternativeText || "Venue image"
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                        <div className="ml-3 w-full">
                          <h4 className="text-sm">
                            {result.name == ""
                              ? "Title"
                              : result.name.slice(0, 20)}
                          </h4>
                          <div className="flex mr-3 items-center justify-between">
                            <div className="text-sm">
                              {result.description == ""
                                ? "Description"
                                : result.description.slice(0, 20)}
                            </div>
                            {result.rating == 0 ? (
                              "No Rating"
                            ) : (
                              <Rating rating={result.rating} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-10">
                <ContinentMap onContinentSelect={handleContinentSelect} />
              </div>
              <div className="flex justify-end">
                <IoClose
                  size={24}
                  className=":hover cursor-pointer"
                  onClick={toggleExpanded}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onContinentSelect: PropTypes.func.isRequired,
};

export default SearchBar;
