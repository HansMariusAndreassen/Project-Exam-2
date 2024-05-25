import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import ContinentMap from "../ContinentMap";
import useFetch from "../API/auth/FetchHook";
import { searchUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "../Cards/_components/Rating";

/**
 * SearchBar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onContinentSelect - The function to handle continent selection.
 * @returns {JSX.Element} The SearchBar component.
 */
const SearchBar = ({ onContinentSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data, loading, error, performFetch } = useFetch(
    `${searchUrl}${searchQuery}`
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const [headingText, setHeadingText] = useState("You can travel Anywhere");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateHeadingText = () => {
      if (window.innerWidth <= 416) {
        setHeadingText("Travel Anywhere");
      } else {
        setHeadingText("You can travel Anywhere");
      }
    };

    updateHeadingText();

    window.addEventListener("resize", updateHeadingText);

    return () => {
      window.removeEventListener("resize", updateHeadingText);
    };
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
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
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative top-[72px] w-full m-auto">
      <div className="flex justify-center">
        <div
          id="search-bar"
          className="bg-white gap-5 p-5 rounded-50 border-primary border-2"
          ref={searchBarRef}
        >
          <div
            className="flex justify-center items-center gap-9 hover:cursor-pointer"
            onClick={toggleExpanded}
          >
            <IoSearchSharp size={32} />
            <h2 id="searchBarH2">{headingText}</h2>
            <RxHamburgerMenu size={32} />
          </div>
          {isExpanded && (
            <div className="w-full mt-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search here..."
                  className="p-2 border rounded-50 w-full pr-10"
                  aria-label="Search for venues"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-black rounded-full p-2 hover:text-accent"
                >
                  <IoSearchSharp size={20} />
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
                      <div className="flex gap-2 my-3 border border-accent items-center hover:bg-accentTwo hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <div className="">
                          {Array.isArray(result.media) &&
                          result.media.length > 0 ? (
                            <div>
                              <img
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
              <div className="mt-20">
                <ContinentMap onContinentSelect={handleContinentSelect} />
              </div>
              <div className="flex justify-end mt-10">
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
