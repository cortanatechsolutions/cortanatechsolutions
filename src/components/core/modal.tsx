import { XMarkIcon } from "@heroicons/react/20/solid";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <img
        alt="Contact form"
        src={`${process.env.PUBLIC_URL}/images/we-want-to-hear-from-you.jpg`}
        width={673}
        height={1003}
        className="hidden lg:flex rounded-l-lg shadow-lg sm:w-[27.60rem]"
      />
      <div className="bg-theme-white rounded-lg shadow-lg sm:rounded-none sm:rounded-r-lg p-6 w-full max-w-md ">
        <div className="flex justify-end mb-4">
          <button
            type="reset"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
