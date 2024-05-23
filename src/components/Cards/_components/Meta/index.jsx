import React from "react";
import PropTypes from "prop-types";
import { FaDog, FaWifi } from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";

const Meta = ({ object }) => {
  if (!object || Object.keys(object).length === 0) {
    return null;
  }

  const { wifi, parking, pets, breakfast } = object;
  const hasAmenities = wifi || parking || pets || breakfast;

  return (
    <div>
      {hasAmenities && <h3 className="mb-3">Amenities</h3>}
      <ul className="flex flex-col gap-3 items-center ">
        {wifi ? (
          <li>
            <span className="flex flex-col justify-center items-center">
              <FaWifi size={26} /> Wifi
            </span>
          </li>
        ) : null}
        {parking ? (
          <li>
            <span className="flex flex-col justify-center items-center">
              <LuParkingCircle size={26} /> Parking
            </span>
          </li>
        ) : null}
        {pets ? (
          <li>
            <span className="flex flex-col justify-center items-center">
              {" "}
              <FaDog size={26} />
              Pets
            </span>
          </li>
        ) : null}
        {breakfast ? (
          <li>
            <span className="flex flex-col justify-center items-center">
              {" "}
              <MdOutlineFreeBreakfast size={26} />
              Breakfast
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

Meta.propTypes = {
  object: PropTypes.object.isRequired,
};

export default Meta;
