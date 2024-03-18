import { HomeModernIcon } from "@heroicons/react/24/outline";

const LayoutRegistration = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="flex justify-center items-center">
          <div className="flex-column justify-center items-center max-w-96 min-w-96">
            {children}
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-400 to-blue-700 p-8 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: "url('./src/assets/room.png')" }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <p className="text-white text-center text-5xl opacity-60 animate-pulse">
              F-BOOKING
            </p>
            <div className="w-96 mt-4">
              <p className="text-white text-center text-md opacity-30 animate-pulse">
                Welcome to F-Booking! A website that provides easy and
                convenient accommodation booking services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutRegistration;
