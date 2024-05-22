import React from "react";
import PropTypes from "prop-types";

const Address = ({ object }) => {
  if (!object) {
    return null;
  }

  const { address, city, country, continent } = object;

  return (
    <div className="flex-col gap-2 text-left">
      <h3>Venue Location:</h3>
      <ul>
        <li>
          Address:{" "}
          <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
            {address ? address : "Not provided"}
          </span>
        </li>
        <li>
          City:{" "}
          <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
            {city ? city : "Not provided"}
          </span>
        </li>
        <li>
          Country:{" "}
          <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
            {country ? country : "Not provided"}
          </span>
        </li>
        <li>
          Continent:{" "}
          <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
            {continent ? continent : "Not provided"}
          </span>
        </li>
      </ul>
    </div>
  );
};

Address.propTypes = {
  object: PropTypes.object.isRequired,
};

export default Address;
