import React from "react";
import PropTypes from "prop-types";

const Address = ({ object }) => {
  if (!object) {
    return null;
  }

  const entries = Object.entries(object);
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="flex-col gap-2 text-left text-ellipsis overflow-hidden">
      <h3>Venue Location:</h3>
      <ul>
        <li>
          {/* <PiCity /> */}
          Address:{" "}
          <span className="text-sm">
            {entries.address ? entries.address : "Not provided"}
          </span>
        </li>
        <li>
          City:{" "}
          <span className="text-sm">
            {entries.city ? entries.city : "Not provided"}
          </span>
        </li>
        <li>
          Country:{" "}
          <span className="text-sm">
            {entries.country ? entries.country : "Not provided"}
          </span>
        </li>
        <li>
          Continent:{" "}
          <span className="text-sm">
            {entries.continent ? entries.continent : "Not provided"}
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
