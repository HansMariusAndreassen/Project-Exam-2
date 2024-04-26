import React from "react";
import PropTypes from "prop-types";

const Price = ({ price }) => {
  return (
    <div className="flex items-center gap-2">
      <h4 className="text-secondary">$ {price} per night</h4>
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
