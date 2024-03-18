import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Calendar = ({ onClickDate, disabledDates, isBlur }) => {
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

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currYear, currMonth, day);
    for (const { startDate, endDate } of disabledDates) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start !== end) {
        start.setDate(start.getDate() - 1);
      } else {
        end.setDate(end.getDate() + 1);
      }

      if (dateToCheck >= start && dateToCheck <= end) {
        return true;
      }
    }
    return false;
  };

  const isOldDay = (day) => {
    const currentDate = new Date();
    const dateToCheck = new Date(currYear, currMonth, day+1);
    if (dateToCheck < currentDate) {
      return true;
    }
    return false;
  };

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
          className="w-100 h-12 flex items-center justify-center"
        >
          <div
            className={`text-center text-gray-400 w-12 h-12 flex items-center justify-center`}
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
      let isDisabled = isDateDisabled(i);
      let isDisabledOldDay = isOldDay(i);
      daysArray.push(
        <div
          key={`curr${i}`}
          className={`h-12 w-100 flex items-center justify-center `}
        >
          <button
            className={`text-center w-12 h-12 flex items-center justify-center rounded-full ${
              isToday ? "border border-purple-600 text-indigo" : ""
            } ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed bg-red-500 text-white"
                : isBlur
                ? ""
                : " hover:bg-purple-500 hover:text-white "
            } ${
              isDisabledOldDay
                ? "text-gray-400 w-12 h-12 cursor-not-allowed hover:bg-white hover:text-gray-400"
                : ""
            }`}
            onClick={
              isDisabledOldDay
                ? () => {}
                : () => onClickDate(i, currMonth, currYear)
            }
            disabled={isDisabled}
          >
            {i}
          </button>
        </div>
      );
    }

    // Push inactive days from next month
    for (let i = lastDayofMonth; daysArray.length < 42; i++) {
      daysArray.push(
        <div
          key={`next${i}`}
          className="w-100 h-12 flex items-center justify-center"
        >
          <div
            className={`text-center text-gray-400 w-12 h-12 flex items-center justify-center`}
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

  return (
    <div
      className={`wrapper bg-white rounded-lg shadow-md p-6 ${
        isBlur ? "blur-sm" : ""
      }`}
    >
      <header className="flex justify-between items-center mb-6 md:px-10">
        <p className="text-lg font-semibold text-indigo-500">{`${months[currMonth]} ${currYear}`}</p>
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

Calendar.propTypes = {
  onClickDate: PropTypes.func.isRequired,
  disabledDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  isBlur: PropTypes.bool,
};

export default Calendar;
