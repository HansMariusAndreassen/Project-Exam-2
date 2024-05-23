import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="m-auto text-2xl fixed bottom-8 left-[47%] px-4 py-2 rounded-full bg-secondary text-background bg-opacity-80 hover:bg-primary hover:text-secondary transition-all duration-300 ease-in-out z-50"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
