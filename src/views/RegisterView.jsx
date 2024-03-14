import React, { useState } from "react";
import { request } from "../config/axios-config";
import TextInput from "../components/TextInput";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterView = () => {
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

    if (name === "confirmPassword") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          value === ""
            ? `${name} is required `
            : value !== formData.password
            ? "Passwords don't match"
            : "",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : `${name} is required`,
      }));
    }
    if (name === "password" && formData.password !== "") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_@&*]{6,}$/;
      const isValidPassword = passwordRegex.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: isValidPassword
          ? ""
          : "Password must be at least 6 characters long and contain at least one letter, one number, and only '_', '@', '&', or '*' as special characters.",
      }));
    }
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
    try {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        const response = await request.post("/register", formData);
        console.log(response.data); // Log response data
        formReset();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <p className="text-center text-2xl mb-4">Register</p>
        <TextInput
          type="text"
          name="firstName"
          label="First name"
          value={formData.firstName}
          error={formErrors.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required={true}
          maxLength={50}
        />
        <TextInput
          type="text"
          name="lastName"
          label="Last name"
          value={formData.lastName}
          error={formErrors.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required={true}
          maxLength={50}
        />
        <TextInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
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
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          error={formErrors.confirmPassword}
          onChange={handleChange}
          onShowPassword={togglePasswordConfirmVisibility}
          isShowPassword={isShowPasswordConfirm}
          required={true}
          maxLength={100}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfzF5cpAAAAAGkbZubvP1X57SVK04KZ5aaS23mO"
          size="invisible"
          onChange={(value) => setCapValue(value)}
        />

        <div className="flex items-center justify-between">
          <button
            // disabled={true}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
