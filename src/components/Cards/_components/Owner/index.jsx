import React from "react";
import PropTypes from "prop-types";

/**
 * Renders the owner information component.
 *
 * @component
 * @param {Object} owner - The owner object containing owner details.
 * @param {string} owner.name - The name of the owner.
 * @param {string} owner.email - The email of the owner.
 * @param {Object} owner.avatar - The avatar object containing avatar details.
 * @param {string} owner.avatar.url - The URL of the owner's avatar image.
 * @returns {JSX.Element} The rendered owner information component.
 */
const OwnerInfo = ({ owner }) => {
  return (
    <div className="">
      <h3>Venue Owner:</h3>
      <a
        href={`/profile/${owner.name}`}
        className="flex items-center gap-3 p-2 rounded-25 border border-secondary border-opacity-0 hover:border-opacity-100 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-in-out"
      >
        <div>
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={owner.avatar.url}
            alt="Profile avatar"
          />
        </div>
        <ul>
          <li>{owner.name}</li>
          <li>{owner.email}</li>
        </ul>
      </a>
    </div>
  );
};

OwnerInfo.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default OwnerInfo;
