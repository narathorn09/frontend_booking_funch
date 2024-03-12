import { useState, useEffect } from "react";
import { request } from "../config/axios-config";
import { useSelector, useDispatch } from "react-redux";
import { setNewToken, removeToken } from "../redux/tokenSlice";
import {
  EyeIcon,
  EyeSlashIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

const LoginView = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitFormLogin = async (event) => {
    event.preventDefault();

    // Get form data
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await request.post("/login", { email, password });
      const newToken = response.data.token;
      dispatch(setNewToken({ newToken: newToken }));

      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen px-16 py-16 bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="md:container md:mx-auto  grid grid-cols-1 md:grid-cols-2 h-full rounded-3xl drop-shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-400 to-blue-500 p-8 hidden md:block rounded-s-3xl h-full">
          <div className="flex w-fit border border-gray-300 rounded-full p-2">
            <HomeModernIcon className="h-5 w-5 text-white" />
            <h1 className="text-white font-medium ml-2">F-Booking</h1>
          </div>
        </div>
        <div className="container bg-white py-32 px-5 md:px-40 rounded-e-3xl rounded-s-3xl md:rounded-e-3xl md:rounded-s-none">
          <div className="flex-column justify-center content-center">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Sign in to F-Booking
              <div className="">
                <p className="text-xs break-words">Token: {token}</p>
                <button onClick={()=> dispatch(removeToken())} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  <p className="text-xs">LOGOUT</p>
                </button>
              </div>
            </h2>
            <form onSubmit={submitFormLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-8 right-0 flex items-center px-2 h-6 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
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
              <a
                href="#"
                className="ml-2 text-sm text-indigo-500 hover:text-indigo-700 flex justify-self-end"
              >
                Register now!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
