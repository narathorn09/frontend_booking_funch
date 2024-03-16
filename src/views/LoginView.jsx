import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../config/axios-config";
import { useDispatch } from "react-redux";
import { setNewToken } from "../redux/tokenSlice";
import TextInput from "../components/TextInput";
import LayoutRegistration from "../components/LayoutRegistration";
import "../css/animation.css";
import Logo from "../components/Logo";


const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoninError, setIsLoninError] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value
        ? ""
        : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
    }));
  };

  const submitFormLogin = async (event) => {
    event.preventDefault();
    setIsLoninError(false);

    try {
      const response = await request.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200 && response.data) {
        const newToken = response.data.token;
        dispatch(setNewToken({ newToken: newToken }));
        navigate("/calendar");
      }
      console.log("Login successful", response.data);
    } catch (error) {
      setIsLoninError(true);
      console.error("Error logging in:", error);
    }
  };

  return (
    <LayoutRegistration>
      <Logo />

      <h2 className="text-4xl font-bold text-left mb-4">SIGN IN</h2>
      <p className="text-xs font-normal text-left mb-4">
        Welcome to F-Booking! A website that provides easy and convenient
        accommodation booking services.
      </p>
      <div
        className={`text-red-500 text-xs h-fit p-1 px-2 bg-red-100 font-medium boder border-2 border-red-200 rounded-md mb-2 ${
          isLoninError ? "bolck" : "hidden"
        }`}
      >
        Email or password incorrect! Please check again.
      </div>
      <form onSubmit={submitFormLogin} >
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
          value={formData.password}
          placeholder="••••••••••"
          error={formErrors.password}
          onChange={handleChange}
          onShowPassword={togglePasswordVisibility}
          isShowPassword={showPassword}
          required={true}
          maxLength={100}
        />
        <div className="flex items-center justify-end -mt-2 mb-2">
          <a
            href="#"
            className="text-xs text-indigo-500 hover:text-indigo-700 "
          >
            Forgot Password?
          </a>
        </div>

        <button
          className="w-full mt-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <div className="flex items-center justify-center mt-4">
        Don't have an account?
        <button
          onClick={() => navigate("/register")}
          className="ml-2 text-sm text-indigo-500 hover:text-indigo-700 flex justify-self-end"
        >
          Sign up!
        </button>
      </div>
    </LayoutRegistration>
  );
};

export default LoginView;
