import React from "react";
import { useDispatch } from "react-redux";
import { removeToken } from "../redux/tokenSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="drop-shadow-md bg-white py-4 px-8 md:px-24">
      <div className="flex justify-between items-center">
        <h1 className="text-indigo-600 text-2xl font-semibold">F-BOOKING</h1>
        <nav>
          <button
            className="border border-indigo-500 py-2 px-4 rounded-md text-sm text-indigo-500 hover:bg-indigo-500 hover:text-white flex justify-self-end "
            onClick={() => dispatch(removeToken())}
          >
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
