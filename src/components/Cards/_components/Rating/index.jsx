import React from "react";
import PropTypes from "prop-types";
import { IoStar } from "react-icons/io5";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {rating}
      <IoStar size={20} />
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
