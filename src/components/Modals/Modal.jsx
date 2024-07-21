"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Modal component that uses React Portals to render its content outside the main DOM hierarchy
const Modal = ({ children, onClose }) => {
  // Create a ref to attach to the modal content for detecting clicks outside
  const modalRef = useRef();

  // Effect to handle key and click events
  useEffect(() => {
    // Function to close the modal when the "Escape" key is pressed
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Trigger the onClose callback
      }
    };

    // Function to close the modal when a click is detected outside the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Trigger the onClose callback
      }
    };

    // Add event listeners for keydown and mousedown events
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Render the modal using React Portals to render outside the main DOM hierarchy
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div
        ref={modalRef} // Attach ref to detect clicks outside
        className="bg-white p-4 rounded-lg shadow-lg w-1/2 h-[70%] relative"
      >
        <button
          onClick={onClose} // Close the modal when the button is clicked
          className="absolute top-1 right-2 text-xl text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {children} {/* Render the content passed as children */}
      </div>
    </div>,
    document.body // Render the modal into the body element of the document
  );
};

export default Modal;
