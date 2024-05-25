import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a component that displays the country name.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.country - The name of the country to be displayed.
 * @returns {JSX.Element|null} The rendered Country component.
 */
const Country = ({ country }) => {
  const trimCountry = (country) => {
    if (country.length > 15) {
      return country.substring(0, 15) + "...";
    }
    return country;
  };

  return country !== "" && country !== null ? (
    <div className="z-10 absolute w-[350px] flex justify-end translate-y-[150px]">
      <div className="bg-secondary rounded-l-25 text-ellipsis overflow-hidden">
        <h3 className="m-auto p-2 text-background text-wrap">
          {trimCountry(country)}
        </h3>
      </div>
    </div>
  ) : null;
};

Country.propTypes = {
  country: PropTypes.string,
};

export default Country;
