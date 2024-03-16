import React from "react";
import PropTypes from "prop-types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const TextInput = ({
  type,
  name,
  label,
  value,
  error,
  onChange,
  placeholder,
  onShowPassword,
  isShowPassword,
  required,
  maxLength
}) => {
  const isPasswordInput = type === "password";
  const isEmailInput = type === "email";

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {required && <span className="text-red-500 mr-1">*</span>}{label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPasswordInput ? (isShowPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`mt-1 p-2 w-full border border-gray-300 rounded-md outline-indigo-300 ${
            (error || (isEmailInput && value && !isValidEmail(value))) ? "border-red-500 focus:outline-red-400" : ""
          }`}
        />
        {isPasswordInput && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center justify-center px-2 pt-1 h-100"
            onClick={() => onShowPassword()}
          >
            {isShowPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <p
        className={`text-red-500 text-xs font-medium h-1 ${
          (error || (isEmailInput && value && !isValidEmail(value))) ? "visible" : "invisible"
        } `}
      >
        {isEmailInput && value && !isValidEmail(value) ? "Please enter a valid email" : error}
      </p>
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onShowPassword: PropTypes.func,
  isShowPassword: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number
};

export default TextInput;
