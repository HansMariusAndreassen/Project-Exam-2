import React, { useEffect, useState } from "react";
import useFetch from "../../auth/FetchHook";
import PropTypes from "prop-types";
import { venuesUrl } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

const VenueBanner = ({ venueId, isOwnProfile }) => {
  const { performFetch, data, loading, error } = useFetch(
    `${venuesUrl}/${venueId}?_bookings=true`
  );
  const [showBookings, setShowBookings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (venueId) {
      performFetch();
    }
  }, [venueId, performFetch]);

  useEffect(() => {
    if (data) {
      console.log("Bookings data:", data.bookings);
    }
  }, [data]);

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No venue data found</p>;

  const { name, created, _count, media, bookings } = data.data;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="pb-4 px-4 bg-background rounded-lg flex flex-col items-center w-full">
      <div className="flex gap-5 items-center w-full">
        {media && media.length > 0 ? (
          <div>
            <img
              className="w-36 h-36 object-cover mb-2"
              src={media[0].url}
              alt={`${name} banner`}
            />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-full mb-2 bg-gray-200"></div>
        )}
        <div className="flex flex-col flex-wrap m-auto items-center">
          <h3 className="text-lg font-bold text-center">{name}</h3>
          <p className="text-sm text-gray-500 text-center">
            Created: {formatDate(created)}
          </p>
          <p className="text-sm text-gray-500 text-center">
            Current Bookings: {_count.bookings}
          </p>
          {isOwnProfile ? (
            <button
              className={_count.bookings ? "btn mt-4" : "mt-4 btn-disabled"}
              disabled={_count.bookings === 0}
              onClick={() => setShowBookings((prev) => !prev)}
            >
              {!_count.bookings
                ? "No Bookings"
                : showBookings
                  ? "Hide Bookings"
                  : "Show Bookings"}
            </button>
          ) : (
            <button
              className="btn mt-4"
              onClick={() => navigate(`/booking/${venueId}`)}
            >
              View Venue
            </button>
          )}
        </div>
      </div>
      {showBookings && bookings && (
        <div className="mt-4 w-full">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="mb-4 p-2 border-b border-gray-300"
              >
                <p className="text-sm">Booking ID: {booking.id}</p>
                <p className="mt-2 text-lg">Booker Details:</p>
                <p>{`Name: ${booking.customer.name}`}</p>
                <p>{`Email: ${booking.customer.email}`}</p>
                <p>{`Date From: ${formatDate(booking.dateFrom)}`}</p>
                <p>{`Date To: ${formatDate(booking.dateTo)}`}</p>
                <p>{`Guests: ${booking.guests}`}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No bookings available</p>
          )}
        </div>
      )}
    </div>
  );
};

VenueBanner.propTypes = {
  venueId: PropTypes.string.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
};

export default VenueBanner;
