import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FetchVenue from "../../components/API/fetch/Venue";
import MyBookingCalendar from "../../components/Calendar";
import ImageCarousel from "../../components/Cards/_components/Images";
import Description from "../../components/Cards/_components/Description";
import Address from "../../components/Cards/_components/Address";
import Price from "../../components/Cards/_components/Price";
import Meta from "../../components/Cards/_components/Meta";
import OwnerInfo from "../../components/Cards/_components/Owner";
import Rating from "../../components/Cards/_components/Rating";
import useToken from "../../hooks/useToken";

/**
 * Renders the Booking component.
 *
 * @returns {JSX.Element} The rendered Booking component.
 */
const Booking = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const { id } = useParams();
  const { venue, loading, error } = FetchVenue(id);
  const data = venue.data;
  const token = useToken();

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
    <div className="m-auto bg-background mb-16">
      <ImageCarousel
        images={data.media}
        imageStyle={{ height: `auto`, width: `100%` }}
      />
      <div className="px-3 m-auto md:px-5 lg:max-w-4xl">
        <div className="my-5 px-3 flex justify-between flex-wrap gap-5">
          <div>
            <div>
              <h1 className="text-2xl text-ellipsis overflow-hidden max-w-96">
                {data.name}
              </h1>
              <div className="flex items-center gap-3 mb-5">
                Venue Rating: <Rating rating={data.rating} />
              </div>
              <Address object={data.location} />
            </div>
          </div>
          <div>
            <Price price={data.price} />
            <div>
              <p className="text-lg mb-5">Max Guests: {data.maxGuests}</p>
              <Meta object={data.meta} />
            </div>
          </div>
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
