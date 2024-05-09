import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchVenues from "../API/fetch/Venues";
import ImageCarousel from "./_components/Images";
import Description from "./_components/Description";
import Price from "./_components/Price";
import Country from "./_components/Country";
import Rating from "./_components/Rating";

const Cards = () => {
  const { venues, loading, error } = FetchVenues();
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <span className="loader">Loading</span>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleExpanded = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="flex gap-10 justify-center flex-wrap m-auto mt-5 text-white">
      {venues?.map((venue) => (
        <div key={venue.id} className="cards">
          <ImageCarousel images={venue.media} />
          {expandedCard !== venue.id && (
            <Country country={venue.location.country} />
          )}
          <h2 className="w-full text-left text-wrap p-3 text-xl flex justify-between items-center overflow-hidden">
            {venue.name}{" "}
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
      ))}
    </div>
  );
};

export default Cards;
