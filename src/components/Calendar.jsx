import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Calendar = () => {
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let daysArray = [];

    // Push inactive days from previous month
    for (let i = firstDayofMonth; i > 0; i--) {
      daysArray.push(
        <div
          key={`prev${i}`}
          className="w-100 h-16 flex items-center justify-center"
        >
          <div
            className={`text-center text-gray-400 w-16 h-16 flex items-center justify-center`}
          >
            {lastDateofLastMonth - i + 1}
          </div>
        </div>
      );
    }

    // Push current month days
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === new Date().getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear();
      daysArray.push(
        <div
          key={`curr${i}`}
          className={`h-16 w-100 flex items-center justify-center `}
        >
          <button
            className={`text-center w-16 h-16 flex items-center justify-center rounded-full hover:bg-purple-600 hover:text-white ${
              isToday ? "bg-purple-600 text-white" : ""
            } `}
            onClick={() => handleDateClick(i)}
          >
            {i}
          </button>
        </div>
      );
    }

    // Push inactive days from next month
    for (let i = lastDayofMonth; i < 6; i++) {
      daysArray.push(
        <div
          key={`next${i}`}
          className="w-100 h-16 flex items-center justify-center"
        >
          <div
            className={`text-center text-gray-400 w-16 h-16 flex items-center justify-center`}
          >
            {i - lastDayofMonth + 1}
          </div>
        </div>
      );
    }

    return daysArray;
  };

  const handlePrevNext = (change) => {
    let newMonth = currMonth + change;
    let newYear = currYear;

    if (newMonth < 0 || newMonth > 11) {
      newYear = new Date(currYear, newMonth).getFullYear();
      newMonth = new Date(currYear, newMonth).getMonth();
    }

    setCurrMonth(newMonth);
    setCurrYear(newYear);
  };

  const handleDateClick = (day) => {

    console.log(`Selected date: ${day}/${currMonth + 1}/${currYear}`);

  };

  return (
    <div className="wrapper bg-white rounded-lg shadow-md p-6">
      <header className="flex justify-between items-center mb-6">
        <p className="text-lg font-semibold">{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons flex space-x-2">
          <span
            id="prev"
            className="material-symbols-rounded cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={() => handlePrevNext(-1)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </span>
          <span
            id="next"
            className="material-symbols-rounded cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={() => handlePrevNext(1)}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </span>
        </div>
      </header>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="text-gray-500 font-semibold text-center">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
