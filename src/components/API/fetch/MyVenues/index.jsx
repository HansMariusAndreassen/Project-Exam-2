import React, { useEffect, useState } from "react";
import useFetch from "../../auth/FetchHook";
import PropTypes from "prop-types";
import { venuesUrl } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaBarcode } from "react-icons/fa";
import { PiAt, PiUser, PiUsers } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";

/**
 * Renders a banner for a venue on profile page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.venueId - The ID of the venue.
 * @param {boolean} props.isOwnProfile - Indicates whether the profile is owned by the user.
 * @returns {JSX.Element} The rendered VenueBanner component.
 */
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

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No venue data found</p>;

  const { name, created, _count, media, bookings } = data.data;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="grid grid-cols-2 w-full sm:gap-20">
      {media && media.length > 0 ? (
        <div className="w-36 h-36 overflow-hidden sm:ml-auto">
          <img
            className="object-cover w-full h-full mb-2"
            src={media[0].url}
            alt={`${name} banner`}
          />
        </div>
      ) : (
        <div className="w-36 h-36 rounded-full mb-2 bg-background"></div>
      )}

      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-ellipsis overflow-hidden">
          <a
            href={`/booking/${venueId}`}
            className="hover:underline hover:text-accent"
          >
            {name.length > 30 ? name.slice(0, 30) : name}
          </a>
        </h3>
        <p className="text-sm">Created: {formatDate(created)}</p>
        <p className="text-sm">Current Bookings: {_count.bookings}</p>
        {isOwnProfile ? (
          <button
            className={
              _count.bookings
                ? "btn mt-2 text-sm mr-auto"
                : "mt-4 btn-disabled mr-auto"
            }
            disabled={_count.bookings === 0}
            onClick={() => setShowBookings((prev) => !prev)}
          >
            {!_count.bookings
              ? "No Bookings"
              : showBookings
                ? "Hide"
                : "Bookings"}
          </button>
        ) : (
          <div className="w-48 h-48 rounded-full mb-2 bg-gray-200"></div>
        )}
        <div className="flex flex-col flex-wrap m-auto items-center">
          <h3 className="text-lg font-bold text-center text-ellipsis overflow-hidden">
            <a
              href={`/booking/${venueId}`}
              className="hover:underline hover:text-accent"
            >
              {name.length > 20 ? name.slice(0, 20) : name}
            </a>
          </h3>
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
        <div className="col-span-2 flex flex-col items-center mt-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="mb-4 p-2 border-b">
                <p className="flex items-center gap-3 flex-wrap">
                  <FaBarcode size={20} /> Booking ID: <span>{booking.id}</span>
                </p>
                <p className="flex items-center font-bold gap-3">
                  <PiUser size={20} /> {`${booking.customer.name}`}
                </p>
                <p className="flex items-center gap-3">
                  <PiAt size={20} />
                  {`${booking.customer.email}`}
                </p>
                <p className="flex items-center gap-3">
                  <BsCalendar2Date size={20} />
                  {`From: ${formatDate(booking.dateFrom)}`}
                </p>
                <p className="flex items-center gap-3">
                  <BsCalendar2Date size={20} />
                  {`To: ${formatDate(booking.dateTo)}`}
                </p>
                <p className="flex items-center gap-3">
                  <PiUsers size={20} />
                  {`${booking.guests} Guests `}
                </p>
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
