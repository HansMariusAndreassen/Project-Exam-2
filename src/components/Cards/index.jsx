import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchVenues from "../API/fetch/Venues";
import ImageCarousel from "./_components/Images";
import Description from "./_components/Description";
import Price from "./_components/Price";
import Country from "./_components/Country";
import Rating from "./_components/Rating";
import { ContinentContext } from "../layout/Main";

const Cards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filteredVenues, setFilteredVenues] = useState([]); // [1
  const { venues, loading, error } = FetchVenues(page, limit);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  const { selectedContinent, setSelectedContinent } =
    useContext(ContinentContext);

  useEffect(() => {
    if (venues.data) {
      if (selectedContinent) {
        const filtered = venues.data.filter(
          (venue) => venue.location.continent === selectedContinent
        );
        setFilteredVenues(filtered);
      } else {
        setFilteredVenues(venues.data);
      }
      setPage(1);
    }
  }, [selectedContinent, venues.data]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleLimitChange = (event) => setLimit(Number(event.target.value));

  const handleRemoveFilter = () => {
    setSelectedContinent(null);
  };

  const paginatedVenues = filteredVenues?.slice(0, page * limit);

  if (loading) {
    return (
      <div>
        <span className="loader">Loading</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <span className="loader">{error}</span>
      </div>
    );
  }

  const toggleExpanded = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flex gap-10 justify-center flex-wrap m-auto text-white">
      {selectedContinent && (
        <div className="bg-background rounded-25 pl-3 flex items-center gap-5">
          <p className="text-secondary">
            Showing Venues in {selectedContinent}
          </p>
          <button onClick={handleRemoveFilter} className="btn">
            Remove Filter
          </button>
        </div>
      )}
      <div className="w-full flex items-center justify-end mx-5">
        <label className="text-background" htmlFor="limit">
          Venues per page:{" "}
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="ml-2 p-2 rounded-25 text-black btn"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
        </select>
      </div>
      {filteredVenues.length === 0 ? (
        <p className="text-lg text-background">
          No current venues in selected continent.
        </p>
      ) : (
        paginatedVenues.map((venue) => (
          <div key={venue.id} className="cards">
            <ImageCarousel images={venue.media} />
            {expandedCard !== venue.id && (
              <Country country={venue.location.country} />
            )}
            <h2 className="w-full text-left text-wrap p-3 text-xl flex justify-between items-center overflow-hidden">
              {venue.name.length > 18
                ? `${venue.name.slice(0, 18)}..`
                : venue.name}{" "}
            </h2>
            <span className="px-3">
              <Rating rating={venue.rating} />
            </span>
            <div className="w-full px-3">
              <Description
                description={venue.description}
                isExpanded={expandedCard === venue.id}
                toggleExpanded={() => toggleExpanded(venue.id)}
              />
            </div>
            <div className="flex justify-between w-full p-3">
              <Price price={venue.price} />
              <button
                className="btn"
                onClick={() => navigate(`/booking/${venue.id}`)}
              >
                View
              </button>
            </div>
          </div>
        ))
      )}
      <div className="w-full flex justify-center mt-5">
        <button
          className="btn mr-2"
          onClick={handlePreviousPage}
          hidden={page === 1}
        >
          Show less
        </button>
        <button
          className="btn"
          onClick={handleNextPage}
          hidden={page * limit >= filteredVenues?.length}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Cards;
