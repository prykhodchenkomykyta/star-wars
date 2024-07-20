"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  overflow-auto bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-lg w-1/2 h-[70%] relative"
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-xl text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
