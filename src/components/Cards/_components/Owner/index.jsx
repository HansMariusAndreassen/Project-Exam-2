import React from "react";
import PropTypes from "prop-types";

const OwnerInfo = ({ owner }) => {
  return (
    <div className="flex-col gap-2 text-left text-ellipsis overflow-hidden">
      <h3>Owner Information:</h3>
      <ul>
        <li>
          <a href={`/profile/${owner.name}`}>
            Name: <span className="text-sm">{owner.name}</span>
          </a>
        </li>
        <li>
          Email: <span className="text-sm">{owner.email}</span>
        </li>
      </ul>
    </div>
  );
};

OwnerInfo.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default OwnerInfo;
