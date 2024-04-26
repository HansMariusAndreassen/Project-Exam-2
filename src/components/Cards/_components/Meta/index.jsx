import React from "react";
import PropTypes from "prop-types";

const Meta = ({ object }) => {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return null;
  }

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex-col gap-2 text-right">
      {entries.map(([key, value]) => (
        <p
          key={key}
        >{`${capitalizeString(key)}: ${typeof value === `boolean` ? (value ? `Yes` : `No`) : value}`}</p>
      ))}
    </div>
  );
};

Meta.propTypes = {
  object: PropTypes.object.isRequired,
};

export default Meta;
