import React from "react";
import PropTypes from "prop-types";

const Price = ({ price }) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <h2 className="text-secondary text-xl">$ {price} Per Night</h2>
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
