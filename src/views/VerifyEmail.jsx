import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { request } from "../config/axios-config";
// import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await request.post("/verify-email", JSON.stringify({emailToken}) );
      const verify = response.data.verify;
      if (verify) {
        navigate("/login");
      }
    };

    fetchData();
    console.log("emailToken", JSON.stringify({emailToken}));
  }, [emailToken]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center content-center p-9 text-warp">
      <p className="text-center">verify email</p>
      {/* <p> {auth?.email}</p>
      <p> {auth?.firstName}</p>
      <p> {auth?.lastName}</p> */}
    </div>
  );
};

export default VerifyEmail;
