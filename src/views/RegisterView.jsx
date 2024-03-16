import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../config/axios-config";
import TextInput from "../components/TextInput";
import ReCAPTCHA from "react-google-recaptcha";
import LayoutRegistration from "../components/LayoutRegistration";
import { useDispatch } from "react-redux";
import { setRegister } from "../redux/registerSlice";

const RegisterView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const recaptchaRef = React.createRef();
  const [capValue, setCapValue] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsshowPasswordConfirm] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [textRegisterError, setTextRegisterError] = useState("");

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setIsshowPasswordConfirm(!isShowPasswordConfirm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" && value !== "") {
      validatePassword(value);
    } else if (name === "confirmPassword") {
      const confirmPasswordError =
        value === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : value !== formData.password
          ? "Passwords don't match"
          : "";
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordError,
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value
          ? ""
          : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    }
  };

  const validatePassword = (password) => {
    const passwordLengthRegex = /^.{6,}$/;
    const passwordContainsLetterRegex = /[A-Za-z]/;
    const passwordContainsNumberRegex = /\d/;
    const passwordContainsSpecialCharsRegex = /[@&_*$]/; // Allow only '_', '@', '&', or '*' as special characters

    const isValidLength = passwordLengthRegex.test(password);
    const containsLetter = passwordContainsLetterRegex.test(password);
    const containsNumber = passwordContainsNumberRegex.test(password);
    const containsSpecialChars =
      passwordContainsSpecialCharsRegex.test(password);

    let passwordError = "";
    if (!isValidLength) {
      passwordError = "Password must be at least 6 characters long.";
    } else if (!containsLetter) {
      passwordError = "Password must contain at least one letter.";
    } else if (!containsNumber) {
      passwordError = "Password must contain at least one number.";
    } else if (!containsSpecialChars) {
      passwordError =
        "Password must only contain '_', '@', '&', or '*' as special characters.";
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordError,
    }));
  };

  const formReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterError(false);

    // Check if any form field is empty
    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );
    const errorFields = Object.keys(formErrors).filter(
      (key) => formErrors[key] !== ""
    );

    if (emptyFields.length > 0) {
      // Update formErrors state for empty fields
      const newFormErrors = {};
      emptyFields.forEach((field) => {
        newFormErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...newFormErrors,
      }));
    } else if (errorFields.length === 0) {
      // Check if there are no error fields
      try {
        const token = await recaptchaRef.current.executeAsync();
        if (token) {
          const response = await request.post("/register", formData);
          if (response.status === 201) {
            dispatch(setRegister({ email: formData?.email }));
            navigate("/verify-email");
          }

          formReset();
        }
      } catch (error) {
        setIsRegisterError(true);
        setTextRegisterError(error?.response?.data?.message);
        console.error("Registration failed:", error);
        // Handle registration error
      }
    }
  };

  return (
    <>
      <LayoutRegistration>
        <h2 className="text-4xl font-bold text-left mb-4">SIGN UP</h2>
        <p className="text-xs font-normal text-left mb-4">
          Welcome new member to F-Booking! A website that provides easy and
          convenient accommodation booking services.
        </p>
        <div
          className={`text-red-500 text-xs h-fit p-1 px-2 bg-red-100 font-medium boder border-2 border-red-200 rounded-md mb-2 ${
            isRegisterError ? "bolck" : "hidden"
          }`}
        >
          {textRegisterError || "Please check the data in the form again."}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="md:flex">
            <div className="md:w-1/2 md:mr-2">
              <TextInput
                type="text"
                name="firstName"
                label="First name"
                value={formData.firstName}
                error={formErrors.firstName}
                onChange={handleChange}
                placeholder="eg. John"
                required={true}
                maxLength={50}
              />
            </div>
            <div className="md:w-1/2 md:ml-2">
              <TextInput
                type="text"
                name="lastName"
                label="Last name"
                value={formData.lastName}
                error={formErrors.lastName}
                onChange={handleChange}
                placeholder="eg. Smith"
                required={true}
                maxLength={50}
              />
            </div>
          </div>
          <TextInput
            type="email"
            name="email"
            label="Email"
            placeholder="eg. example@example.com"
            value={formData.email}
            error={formErrors.email}
            onChange={handleChange}
            required={true}
            maxLength={200}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={formData.password}
            error={formErrors.password}
            onChange={handleChange}
            onShowPassword={togglePasswordVisibility}
            isShowPassword={isShowPassword}
            required={true}
            maxLength={100}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            placeholder="••••••••••"
            value={formData.confirmPassword}
            error={formErrors.confirmPassword}
            onChange={handleChange}
            onShowPassword={togglePasswordConfirmVisibility}
            isShowPassword={isShowPasswordConfirm}
            required={true}
            maxLength={100}
          />

          <button
            className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          Have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-sm text-indigo-500 hover:text-indigo-700 flex justify-self-end"
          >
            Sign in!
          </button>
        </div>
      </LayoutRegistration>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfzF5cpAAAAAGkbZubvP1X57SVK04KZ5aaS23mO"
        size="invisible"
        onChange={(value) => setCapValue(value)}
      />
    </>
  );
};

export default RegisterView;
