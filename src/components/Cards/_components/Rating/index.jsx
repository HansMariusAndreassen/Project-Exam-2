import React from "react";
import PropTypes from "prop-types";
import { IoStar } from "react-icons/io5";

/**
 * Renders a rating component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.rating - The rating value.
 * @returns {JSX.Element} - The rendered Rating component.
 */
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
