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

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex-col gap-2 text-left text-ellipsis overflow-hidden">
      {entries.map(([key, value]) => (
        <p key={key}>{`${capitalizeString(key)}: ${value}`}</p>
      ))}
    </div>
  );
};

Address.propTypes = {
  object: PropTypes.object.isRequired,
};

export default Address;
