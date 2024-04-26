import React from "react";
import PropTypes from "prop-types";

const Country = ({ country }) => {
  return country !== "" ? (
    <div className="z-10 absolute w-[350px] flex justify-end translate-y-[150px]">
      <div className="bg-secondary rounded-l-25">
        <h3 className="m-auto p-2 text-background">{country}</h3>
      </div>
    </div>
  ) : null;
};

Country.propTypes = {
  country: PropTypes.string,
};

export default Country;
