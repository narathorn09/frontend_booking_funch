import React from "react";
import PropTypes from "prop-types";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const CardRoom = ({ roomData, onClickRoom, idSelect }) => {
  const isSelected = roomData._id === idSelect;

  return (
    <div
      className={`rounded overflow-hidden shadow-md bg-white flex hover:cursor-pointer hover:ring hover:ring-indigo-300 ${
        isSelected ? "ring ring-indigo-500 " : ""
      }`}
    >
      <img
        className="w-1/3 object-cover"
        src="./src/assets/room.png"
        alt="Room"
      />
      <div className="px-6 py-4 flex flex-col justify-between ">
        <div>
          <div className="font-semibold text-xl mb-2">
            {roomData.roomNumber}
          </div>
          <div className="-ml-1 text-gray-700 text-base flex items-center">
            <MapPinIcon className="size-5  mr-2" />
            <p>{roomData.location}</p>
          </div>
          <p className="text-gray-700 text-base">{roomData.detail}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-gray-700 text-base flex items-center">
            <span className="text-xl font-bold mr-1">
              ฿{roomData.pricePerNight}
            </span>
            / night
          </p>
          <button
            className="border border-indigo-500 py-1.5 px-3 rounded-md text-xs text-indigo-500 hover:bg-indigo-500 hover:text-white flex items-center"
            onClick={() => onClickRoom(roomData)}
          >
            <CalendarDaysIcon className="h-4 w-4 mr-2" /> Select
          </button>
        </div>
      </div>
    </div>
  );
};

CardRoom.propTypes = {
  roomData: PropTypes.object.isRequired,
  onClickRoom: PropTypes.func.isRequired,
  idSelect: PropTypes.string,
};

export default CardRoom;
