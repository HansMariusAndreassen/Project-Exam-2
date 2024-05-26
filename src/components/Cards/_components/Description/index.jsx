import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a description component with an option to expand or collapse the description text.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.description - The description text.
 * @param {boolean} props.isExpanded - Indicates whether the description is expanded or collapsed.
 * @param {Function} props.toggleExpanded - A function to toggle the expanded state of the description.
 * @returns {JSX.Element} The rendered Description component.
 */
const Description = ({ description, isExpanded, toggleExpanded }) => {
  const longDescription = description.length > 100;
  const displayedDescription = isExpanded
    ? description
    : `${description.substring(0, 60)}...`;

  return (
    <div className="max-h-full">
      <h3 className="w-full text-left">Description</h3>
      <p
        className="text-left break-words break-all z-30  border-background overflow-auto max-h-[280px]"
        style={{ wordBreak: "break-word" }}
      >
        {longDescription ? displayedDescription : description}
        {longDescription && (
          <button
            className="rounded-25 text-sm cursor-pointer hover:underline"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Read less" : "Read More"}
          </button>
        )}
      </p>
    </div>
  );
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
};

export default Description;
