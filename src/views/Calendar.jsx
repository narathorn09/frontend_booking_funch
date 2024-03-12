import { useEffect, useState } from "react";
import { useAxiosWithToken } from "../config/axios-config";
import { checkLogin } from "../utils/checkLogin.js";
import { useSelector } from "react-redux";

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
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center content-center p-9 text-warp">
      <p className="text-center">Calendar</p>
      <p> {auth?.email}</p>
      <p> {auth?.firstName}</p>
      <p> {auth?.lastName}</p>
    </div>
  );
};

export default CalendarView;
