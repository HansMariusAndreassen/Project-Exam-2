import React from "react";
import PropTypes from "prop-types";

const OwnerInfo = ({ owner }) => {
  return (
    <div className="">
      <h3>Venue Owner:</h3>
      <a
        href={`/profile/${owner.name}`}
        className="flex items-center gap-3 p-1 rounded-25 hover:shadow-lg transition-all duration-300 ease-in-out"
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
