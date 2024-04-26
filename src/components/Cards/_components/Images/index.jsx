import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="relative max-w-2xl mx-auto overflow-hidden rounded-t-25">
      {images.map((image, index) => (
        <div
          key={index}
          className={index === current ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.5s ease" }}
        >
          {index === current && (
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              className="w-full object-cover bg-white"
              style={{ height: "200px", width: "350px" }}
            />
          )}
        </div>
      ))}
      {length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute rounded-50 top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 cursor-pointer bg-secondary text-background bg-opacity-60"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute rounded-50 top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 cursor-pointer bg-secondary text-background bg-opacity-60"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageCarousel;
