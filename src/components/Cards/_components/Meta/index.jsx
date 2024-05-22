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
            <FaWifi size={26} />
          </li>
        ) : null}
        {parking ? (
          <li>
            <LuParkingCircle size={26} />
          </li>
        ) : null}
        {pets ? (
          <li>
            <FaDog size={26} />
          </li>
        ) : null}
        {breakfast ? (
          <li>
            <MdOutlineFreeBreakfast size={26} />
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
