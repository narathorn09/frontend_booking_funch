import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../config/axios-config";
import { useDispatch } from "react-redux";
import { setNewToken } from "../redux/tokenSlice";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import TextInput from "../components/TextInput";

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
      [name]: value ? "" : `${name} is required`,
    }));
  };

  const checkFormErrors = (prevErrors) => {
    if (formData.email === "" && formData.password === "") {
      setFormErrors({
        email: "Email is required",
        password: "Password is required",
      });
      return true;
    } else if (formData.email === "") {
      setFormErrors({
        ...formErrors,
        email: "Email is required",
      });
      return true;
    } else if (formData.password === "") {
      setFormErrors({
        ...formErrors,
        password: "Password is required",
      });
      return true;
    }
    return false;
  };

  const submitFormLogin = async (event) => {
    event.preventDefault();
    
    if (checkFormErrors()) {
      return; // Exit the function if there are errors
    }

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
    <div className="min-h-screen px-16 py-16 bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="md:container md:mx-auto  grid grid-cols-1 md:grid-cols-2 h-full rounded-3xl drop-shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-400 to-blue-500 p-8 hidden md:block rounded-s-3xl h-full">
          <div className="flex w-fit border border-gray-300 rounded-full p-2 tracking-in-expand">
            <HomeModernIcon className="h-5 w-5 text-white" />
            <h1 className="text-white font-medium ml-2">F-Booking</h1>
          </div>
        </div>
        <div className="container bg-white py-32 px-5 md:px-40 rounded-e-3xl rounded-s-3xl md:rounded-e-3xl md:rounded-s-none">
          <div className="flex-column justify-center content-center">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Sign in to F-Booking
              <div
                className={`text-red-500 text-xs italic h-1 ${
                  isLoninError ? "visible" : "invisible"
                }`}
              >
                Email or password incorrect! Please check again.
              </div>
              <div></div>
            </h2>
            <form onSubmit={submitFormLogin} className="space-y-4">
              <TextInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                error={formErrors.email}
                onChange={handleChange}
                required={true}
              />
              <TextInput
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                placeholder="Enter your password"
                error={formErrors.password}
                onChange={handleChange}
                onShowPassword={togglePasswordVisibility}
                isShowPassword={showPassword}
                required={true}
              />
              <div className="flex-col items-center justify-center">
                <div className="flex items-center justify-end mb-3">
                  <a
                    href="#"
                    className="text-sm text-indigo-500 hover:text-indigo-700 "
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center mt-4">
              Don't have an account?
              <button
                onClick={() =>navigate("/register")}
                className="ml-2 text-sm text-indigo-500 hover:text-indigo-700 flex justify-self-end"
              >
                Register now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
