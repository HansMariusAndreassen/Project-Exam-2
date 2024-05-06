import React, { useState } from "react";
import PropTypes from "prop-types"; // Un-comment this line if using PropTypes
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Calendar from "react-calendar";

const MyBookingCalendar = ({ bookings }) => {
  const [value, setValue] = useState([new Date(), new Date()]);
  const [isVisible, setIsVisible] = useState(false);
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());

  const clearDates = () => {
    setValue(null);
    setCalendarStartDate(new Date());
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
        setCalendarStartDate(startDate);
      } else {
        alert(
          "Invalid date range. You have selected a date range that is already booked."
        );
        setValue([new Date(), new Date()]); // Resets to a default range
      }
    } else {
      console.log("Date range cleared or invalid input:", newRange);
      setValue([new Date(), new Date()]); // Resets to a default range
      setCalendarStartDate(new Date());
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex gap-3 my-3">
          <button
            onClick={clearDates}
            className={!isVisible ? "hidden" : "btn"}
          >
            Clear Dates
          </button>
          <button
            onClick={toggleVisibility}
            className={isVisible ? "btn-revert p-3" : "btn-revert m-3 p-3"}
          >
            {isVisible ? "Close" : "Book Now"}
          </button>
        </div>
      </div>
      <div className="flex-col">
        <div className="bg-primary flex mb-0">
          <div className="w-full h-10 bg-primary text-white text-center p-2">
            Today
          </div>
          <div className="w-full h-10 bg-accentTwo text-center text-white p-2">
            Occupied
          </div>
          <div className="w-full h-10 bg-white text-center p-2">Available</div>
          <div className="w-full h-10 bg-accent text-white text-center p-2">
            Your selection
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-secondary py-5">
          {isVisible && (
            <>
              <DateRangePicker
                onChange={handleDateChange}
                value={value}
                tileDisabled={tileDisabled}
              />
              {value && <button className={"btn-revert mt-3"}>Checkout</button>}
            </>
          )}
        </div>
        <div>
          <Calendar
            onChange={handleDateChange}
            value={value}
            tileDisabled={tileDisabled}
            activeStartDate={calendarStartDate}
            className="noPinterEvents"
          />
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
};

export default MyBookingCalendar;
