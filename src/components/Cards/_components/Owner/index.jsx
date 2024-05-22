import React from "react";
import PropTypes from "prop-types";

const OwnerInfo = ({ owner }) => {
  return (
    <div className="">
      <h3>Venue Owner:</h3>
      <div className="flex gap-3 items-center ">
        <div>
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={owner.avatar.url}
            alt=""
          />
        </div>
        <ul>
          <li>
            <span className="hover:underline hover:text-primary">
              <a href={`/profile/${owner.name}`}>{owner.name}</a>
            </span>
          </li>
          <li>
            <span>{owner.email}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

OwnerInfo.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default OwnerInfo;
