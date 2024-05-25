import React, { useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

/**
 * Modal component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the modal.
 * @param {boolean} props.isOpen - Determines whether the modal is open or not.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {boolean} props.isSuccess - Determines whether the modal represents a success state or not.
 * @returns {ReactNode} The rendered modal component.
 */
const Modal = ({ children, isOpen, onClose, isSuccess }) => {
  const location = useLocation();
  useEffect(() => {
    if (!isOpen) return;
    if (isSuccess && location.pathname !== "/booking") {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[999]">
      <div className="bg-background p-10 rounded-25 flex flex-col gap-5">
        <div className={`circle-loader ${isSuccess ? "load-complete" : ""}`}>
          <div className={`checkmark ${isSuccess ? "draw" : ""}`}></div>
        </div>
        {children}
        <button
          className="btn m-auto mt-5"
          onClick={() => {
            if (!isSuccess) {
              onClose();
            }
          }}
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
  isSuccess: PropTypes.bool,
};

export default Modal;
