import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Alert = ({ title, detail, delay, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("red");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 500);
    }, delay);

    let colorValue;
    switch (type) {
      case "success":
        colorValue = "text-green-800 bg-green-50";
        break;
      case "error":
        colorValue = "text-red-800 bg-red-50";
        break;
      case "info":
        colorValue = "text-blue-800 bg-blue-50";
        break;
      default:
        colorValue = null;
    }
    setColor(colorValue);

    return () => clearTimeout(timer);
  }, [type, delay, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const alertClasses = `absolute inset-x-6 md:inset-x-24 top-20 z-50 p-4 text-sm rounded-lg flex justify-between ${color} ${
    visible ? "alert-fade-in block" : "alert-fade-out"
  }`;

  return (
    <>
      {color !== null && (
        <div className={alertClasses}>
          <div>
            <span className="font-medium">{title}</span>
            <p>{detail}</p>
          </div>

          <button onClick={handleClose}>
            <XCircleIcon
              className={`size-5 text-sm font-medium text-${color}-800`}
            />
          </button>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func.isRequired,
};

export default Alert;
