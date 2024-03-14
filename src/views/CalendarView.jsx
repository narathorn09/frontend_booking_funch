import { useEffect, useState } from "react";
import { useAxiosWithToken } from "../config/axios-config.js";
import { checkLogin } from "../utils/checkLogin.js";
import { useSelector } from "react-redux";
import Calendar from "../components/Calendar.jsx";

const CalendarView = () => {
  checkLogin();

  const auth = useSelector((state) => state.token.decode);
  const requestWithToken = useAxiosWithToken();

  useEffect(() => {
    const fetchData = async () => {
      await requestWithToken.get("/user");
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center content-center p-9 text-warp">
        <p className="text-center">Calendar</p>
      </div>
      asd
      <Calendar />
    </div>
  );
};

export default CalendarView;
