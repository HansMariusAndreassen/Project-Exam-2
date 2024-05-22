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

const Booking = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const { id } = useParams();
  const { venue, loading, error } = FetchVenue(id);
  const data = venue.data;
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
        <div className="my-5 px-5 flex justify-between items-center">
          <h1 className="text-2xl text-ellipsis overflow-hidden">
            <span className="text-sm font-text block">Venue Title:</span>
            {data.name}
          </h1>
          <div>
            <span className="text-sm block">Venue Price:</span>
            <Price price={data.price} />
          </div>
        </div>
        <div className="my-5 flex justify-between p-5 gap-5">
          <Address object={data.location} />
          <Meta object={data.meta} />
        </div>
        <div className="my-5 flex justify-between p-5 gap-5">
          <OwnerInfo owner={data.owner} />
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
        {console.log(data.id)}
        <MyBookingCalendar
          bookings={data.bookings}
          venueId={data.id}
          pricePerNight={data.price}
        />
      </div>
    </div>
  );
};

export default Booking;
