import { HomeModernIcon } from "@heroicons/react/24/outline";
import "../css/animation.css";

const LayoutRegistration = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center">
          <div className="flex-column justify-center items-center max-w-96 min-w-96">
            {children}
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-400 to-blue-500 p-8 hidden md:block">
          {/* <div className="flex w-fit border border-gray-300 rounded-full p-2 px-4 tracking-in-expand">
            <HomeModernIcon className="h-5 w-5 text-white" />
            <h1 className="text-white font-medium ml-2">F-Booking</h1>
          </div> */}
        </div>
   
      </div>
    </div>
  );
};

export default LayoutRegistration;
