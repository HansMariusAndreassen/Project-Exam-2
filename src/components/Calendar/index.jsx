import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import Modal from "../Modal";
import useBookVenue from "../API/fetch/Booking";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

/**
 * MyBookingCalendar component displays a calendar for booking a venue.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.bookings - The array of existing bookings.
 * @param {string} props.venueId - The ID of the venue.
 * @param {number} props.pricePerNight - The price per night for the venue.
 * @param {number} props.guests - The number of guests.
 * @param {function} props.setGuests - The function to set the number of guests.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 * @returns {JSX.Element} The rendered MyBookingCalendar component.
 */
const MyBookingCalendar = ({
  bookings,
  venueId,
  pricePerNight,
  guests,
  setGuests,
  maxGuests,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [viewDate, setViewDate] = useState(new Date());
  const [booking, setBooking] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venueId: `${venueId}`,
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const { submitBooking, loading, error, isSuccess } = useBookVenue();
  const navigate = useNavigate();
  const token = useToken();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const calculateTotalCost = (startDate, endDate, guests) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
    return days * pricePerNight * guests;
  };

  const clearDates = () => {
    setValue([new Date(), new Date()]);
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
    const today = new Date().setHours(0, 0, 0, 0);
    if (startDate < today) {
      alert(
        "Sadly, we can't book in the past. Please select today or a future date."
      );
      return false;
    }
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (tileDisabled({ date: currentDate, view: "month" })) {
        alert(
          "You have selected days that are already booked. Please select different dates."
        );
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
        const cost = calculateTotalCost(startDate, endDate, guests);
        setTotalCost(cost);
        setBooking({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: Number(guests),
          venueId: `${venueId}`,
        });
      } else {
        setValue([new Date(), new Date()]);
      }
    } else {
      console.log("Date range cleared or invalid input:", newRange);
      setValue([new Date(), new Date()]);
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
    setGuests(parseInt(e.target.value, 10));
    if (value && value.length === 2) {
      const cost = calculateTotalCost(value[0], value[1], e.target.value);
      setTotalCost(cost);
    }
  };

  useEffect(() => {
    if (value && value.length === 2) {
      setViewDate(value[0]);
    }
  }, [value]);

  return (
    <div>
      <Modal
        isOpen={isVisible}
        onClose={toggleVisibility}
        isSuccess={isSuccess}
      >
        <div className="flex flex-col gap-2 transition-all duration-100">
          {loading && <p>Loading...</p>}
          {!loading && error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && bookingSuccess && (
            <>
              <h1 className="text-2xl text-center mb-5">Booking Successful!</h1>
              <p className="text-center">
                Your booking has been successfully made.
              </p>
              <p className="text-center">
                A confirmation will be sent to {userEmail}
              </p>
            </>
          )}
          {!loading && !error && !bookingSuccess && (
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
              <p>
                <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
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
            <div
              type="button"
              className="w-full h-10 bg-primary text-white text-center p-2 hover:bg-secondary hover:text-primary transition-all duration-300 ease-in-out hover:cursor-pointer"
              onClick={handleTodayClick}
            >
              Today
            </div>
            <div className="w-full h-10 bg-accentTwo text-center text-white p-2">
              Occupied
            </div>
            <div className="w-full h-10 bg-white text-center p-2">
              Available
            </div>
            <div className="w-full h-10 bg-accent text-white text-center p-2">
              Selected
            </div>
          </div>
          <div className="w-full max-w-2xl shadow-xl">
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
          {token ? (
            <div className="flex flex-col gap-3 items-center justify-center bg-background py-5">
              <div className="btn">
                <label htmlFor="guests">How many Guests?</label>
                <select
                  name="guests"
                  id="guests"
                  value={guests}
                  onChange={handleGuestsChange}
                  className="ml-2 p-2 border rounded-25 "
                >
                  {Array.from({ length: maxGuests }, (_, i) => (
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
                className="btn-revert px-10 py-2 text-black text-xl bg-primary rounded-full hover:bg-background hover:text-secondary transition-all duration-300 ease-in-out"
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
                {!bookingSuccess && "Clear Selected"}
                {bookingSuccess && "Go to profile!"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="m-auto py-2 w-full uppercase hover:bg-primary hover:text-white bg-secondary text-primary text-xl transition-all duration-300 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Please Log in to make a booking
            </button>
          )}
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
  pricePerNight: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  setGuests: PropTypes.func.isRequired,
  maxGuests: PropTypes.number.isRequired,
};

export default MyBookingCalendar;
