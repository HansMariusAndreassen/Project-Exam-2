import React from "react";
import { useParams } from "react-router-dom";
import FetchVenue from "../../API/fetch/Venue";

const Booking = () => {
  const { id } = useParams();
  console.log(id);

  const { venue, loading, error } = FetchVenue(id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log(venue);

  return (
    <div className="flex justify-center">
      <h1>Booking</h1>
    </div>
  );
};

export default Booking;
