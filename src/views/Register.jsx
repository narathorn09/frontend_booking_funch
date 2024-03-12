import { useEffect, useState } from "react";
import { useAxiosWithToken } from "../config/axios-config";

const RegisterView = () => {
  const requestWithToken = useAxiosWithToken();
//   useEffect(() => {
//     const fetchData = async () => {
//       await requestWithToken.get("/user");
//     };
//     fetchData();
//   }, []);
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center content-center p-9">
      <p className="text-center">Register</p>
    </div>
  );
};

export default RegisterView;
