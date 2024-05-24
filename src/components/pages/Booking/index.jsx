import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FetchVenue from "../../API/fetch/Venue";
import MyBookingCalendar from "../../Calendar";
import ImageCarousel from "../../Cards/_components/Images";
import Description from "../../Cards/_components/Description";
import Address from "../../Cards/_components/Address";
import Price from "../../Cards/_components/Price";
import Meta from "../../Cards/_components/Meta";
import OwnerInfo from "../../Cards/_components/Owner";
import Rating from "../../Cards/_components/Rating";
import useToken from "../../../hooks/useToken";

const Booking = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const { id } = useParams();
  const { venue, loading, error } = FetchVenue(id);
  const data = venue.data;
  const token = useToken();
  console.log(data);

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
    <div className="max-w-[600px] m-auto bg-background">
      <ImageCarousel
        images={data.media}
        imageStyle={{ height: `auto`, width: `600px` }}
      />
      <div className="px-3 m-auto">
        <div className="my-5 px-5 flex justify-between flex-wrap gap-5">
          <div>
            <h1 className="text-2xl text-ellipsis overflow-hidden max-w-[320px]">
              {data.name}
            </h1>
            <div className="flex align-center text-lg gap-1 justify-center">
              Venue Rating: <Rating rating={data.rating} />
            </div>
          </div>
          <div>
            <Price price={data.price} />
            <p className="text-lg text-center">Max Guests: {data.maxGuests}</p>
          </div>
        </div>
        <div className="my-5 flex justify-between p-5 gap-5">
          <Address object={data.location} />
          <Meta object={data.meta} />
        </div>
        <div className="my-5 flex justify-between p-5 gap-5">
          {token ? (
            <OwnerInfo owner={data.owner} />
          ) : (
            <p className="italic">Please log in to view owner</p>
          )}
        </div>
        <div className="my-5 flex justify-between p-5 gap-5">
          <Description
            description={data.description}
            isExpanded={expandedCard === venue.id}
            toggleExpanded={() => toggleExpanded(venue.id)}
          />
        </div>
      </div>
      <div className="my-5">
        <MyBookingCalendar
          bookings={data.bookings}
          venueId={data.id}
          pricePerNight={data.price}
          guests={numGuests}
          setGuests={setNumGuests}
          maxGuests={data.maxGuests}
        />
      </div>
    </div>
  );
};

export default Booking;
