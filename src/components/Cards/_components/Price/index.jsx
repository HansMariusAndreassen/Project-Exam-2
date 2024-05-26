import React from "react";
import PropTypes from "prop-types";

/**
 * Renders the price component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.price - The price per night.
 * @returns {JSX.Element} The rendered Price component.
 */
const Price = ({ price }) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <h2 className=" text-xl">$ {price} Per Night</h2>
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
