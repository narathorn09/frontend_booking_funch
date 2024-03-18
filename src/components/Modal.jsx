import React from "react";
import PropTypes from "prop-types";

function Modal({
  children,
  onToggle,
  onClose,
  isOpen,
  title,
  textOk,
  textCancel,
  onOk,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 backdrop-blur-sm overflow-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className={`relative p-4 md:p-0 w-full max-w-2xl max-h-full ${
            isOpen ? "alert-fade-in block" : "alert-fade-out"
          } `}
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-6 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold dark:text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-6">{children}</div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={onOk}
                type="button"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                {textOk}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 "
              >
                {textCancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onToggle: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  textOk: PropTypes.string,
  textCancel: PropTypes.string,
  onOk: PropTypes.func,
};

export default Modal;
