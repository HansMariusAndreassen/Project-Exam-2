import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[999]">
      <div className="bg-background p-10 rounded-25 flex flex-col gap-5">
        <span className="modalLoader mb-5"></span>
        {children}
        <button
          className="btn m-auto mt-5 "
          onClick={onClose}
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
