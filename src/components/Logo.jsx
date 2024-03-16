import React from "react";
import { HomeModernIcon } from "@heroicons/react/24/outline";

const Logo = () => {
  return (
    <div className="flex w-fit border border-indigo-600 rounded-full py-1.5 px-4 mb-6 tracking-in-expand">
      <HomeModernIcon className="h-5 w-5 text-indigo-600" />
      <h1 className="text-indigo-600 font-medium ml-2">F-Booking</h1>
    </div>
  );
};

export default Logo;
