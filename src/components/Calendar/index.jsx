import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import Modal from "../Modal";
import useBookVenue from "../API/fetch/Booking";
import { useNavigate } from "react-router-dom";

const MyBookingCalendar = ({ bookings, venueId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [viewDate, setViewDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venueId: `${venueId}`,
  });
  const [bookingSuccess, setBookingSuccess] = useState(false); // New state for booking success

  const { submitBooking, loading, error } = useBookVenue();

  const navigate = useNavigate();

  const clearDates = () => {
    setValue(null); // FIX THIS BUG. CANNOT SET VALUE TO NULL
    setGuests(1);
  };

  const tileDisabled = ({ date, view }) =>
    view === "month" &&
    bookings.some(
      (booking) =>
        date >= new Date(booking.dateFrom) && date <= new Date(booking.dateTo)
    );

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const isRangeValid = (startDate, endDate) => {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (tileDisabled({ date: currentDate, view: "month" })) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
  };

  const handleDateChange = (newRange) => {
    if (Array.isArray(newRange) && newRange.length === 2) {
      const [startDate, endDate] = newRange;
      if (isRangeValid(startDate, endDate)) {
        setValue(newRange);
        setBooking({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: guests,
          venueId: `${venueId}`,
        });
      } else {
        alert(
          "Invalid date range. You have selected a date range that is already booked."
        );
        setValue([new Date(), new Date()]); // Resets to a default range
      }
    } else {
      console.log("Date range cleared or invalid input:", newRange);
      setValue([new Date(), new Date()]); // Resets to a default range
    }
  };

  const handleTodayClick = () => {
    setViewDate(new Date());
  };

  const handleBooking = async () => {
    try {
      await submitBooking(booking);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setBookingSuccess(false);
    }
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  // Sync viewDate with value
  useEffect(() => {
    if (value && value.length === 2) {
      setViewDate(value[0]);
    }
  }, [value]);

  return (
    <div>
      <Modal isOpen={isVisible} onClose={toggleVisibility}>
        <div className="flex flex-col gap-2 transition-all duration-100">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {bookingSuccess ? (
            <>
              <h1 className="text-2xl mb-5">Booking Successful!</h1>
              <p>Your booking has been successfully made.</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl mb-5">Booking Summary</h1>
              <p>
                <strong>From:</strong> {value[0].toDateString()}
              </p>
              <p>
                <strong>To:</strong> {value[1].toDateString()}
              </p>
              <p>
                <strong>Guests:</strong> {guests}
              </p>
              <button
                onClick={handleBooking}
                className="text-xl mt-5 btn-revert m-auto"
              >
                Confirm Booking
              </button>
            </>
          )}
        </div>
      </Modal>
      <div className="flex flex-col items-center">
        <div className="flex gap-3 my-3"></div>
        <div className="flex-col">
          <div className="bg-primary flex mb-0">
            <div className="w-full h-10 bg-primary text-white text-center p-2">
              <button onClick={handleTodayClick}>Today</button>
            </div>
            <div className="w-full h-10 bg-accentTwo text-center text-white p-2">
              Occupied
            </div>
            <div className="w-full h-10 bg-white text-center p-2">
              Available
            </div>
            <div className="w-full h-10 bg-accent text-white text-center p-2">
              Your selection
            </div>
          </div>
          <div>
            <Calendar
              onChange={handleDateChange}
              value={value}
              tileDisabled={tileDisabled}
              selectRange={true}
              activeStartDate={viewDate}
              onActiveStartDateChange={({ activeStartDate }) =>
                setViewDate(activeStartDate)
              }
            />
          </div>
          <div className="flex flex-col gap-3 items-center justify-center bg-secondary py-5">
            <div className="btn">
              <label htmlFor="guests">Number of Guests:</label>
              <select
                name="guests"
                id="guests"
                value={guests}
                onChange={handleGuestsChange}
                className="ml-2 p-1 border rounded-25"
              >
                {[...Array(12).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                {
                  value
                    ? toggleVisibility()
                    : alert(
                        "Please select your to and from dates on the calendar!"
                      );
                }
              }}
              type="button"
              className="px-10 py-2 text-black text-xl bg-primary rounded-full hover:bg-background hover:text-secondary transition-all duration-300 ease-in-out"
            >
              {!bookingSuccess && "BOOK NOW"}
              {bookingSuccess && "BOOKED!"}
            </button>
            <button
              onClick={
                !bookingSuccess ? clearDates : () => navigate("/profile")
              }
              className="btn"
            >
              {!bookingSuccess && "Clear Dates"}
              {bookingSuccess && "Go to profile!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MyBookingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ),
  venueId: PropTypes.string.isRequired,
};

export default MyBookingCalendar;
