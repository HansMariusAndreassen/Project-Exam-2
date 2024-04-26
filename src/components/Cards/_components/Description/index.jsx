import React from "react";
import PropTypes from "prop-types";

const Description = ({ description, isExpanded, toggleExpanded }) => {
  const longDescription = description.length > 100;
  const displayedDescription = isExpanded
    ? description
    : `${description.substring(0, 100)}...`;

  return (
    <div>
      <h3 className="w-full text-left">Description</h3>
      <p className="w-full text-left text-wrap z-20">
        {longDescription ? displayedDescription : description}
        {longDescription && (
          <button
            className="text-accent text-sm cursor-pointer hover:underline"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Read less" : "Read More"}
          </button>
        )}
      </p>
    </div>
  );
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
};

export default Description;
