import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { request } from "../config/axios-config";
import LayoutRegistration from "../components/LayoutRegistration";
import Logo from "../components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { removeRegister } from "../redux/registerSlice";

const VerifyEmailView = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.register.email);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailHiddenText, setEmailHiddenText] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdownText, setCountdownText] = useState("");

  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    let atIndex = email?.indexOf("@");
    let maskedEmail =
      email?.substring(0, atIndex - 2) +
      "*".repeat(5) +
      email?.substring(atIndex);
    setEmailHiddenText(maskedEmail);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (emailToken) {
          const response = await request.post("/verify-email", { emailToken });
          const { verify, email } = response.data;
          if (verify) {
            setIsVerified(true);
            setEmailHiddenText(email);
            dispatch(removeRegister())
            let count = 15;
            const countdownInterval = setInterval(() => {
              count--;
              if (count === 0) {
                clearInterval(countdownInterval);
                navigate("/login");
              } else {
                setCountdownText(count);
              }
            }, 1000);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [emailToken]);

  return (
    <LayoutRegistration>
      <Logo />
      <div className="flex justify-start items-center tracking-in-expand mb-4">
        <h2 className="text-4xl font-bold text-left">
          {isVerified ? "EMAIL VERIFIED" : "VERIFY YOUR EMAIL"}
        </h2>
        <CheckCircleIcon
          className={`h-10 w-10 text-green-600 ml-3 ${
            isVerified ? "block" : "hidden"
          }`}
        />
      </div>
      <p className="text-xs font-normal text-left mb-4 tracking-in-expand">
        To use F-Booking, confirm your email address with the email we sent.
      </p>
      <div className="flex justify-start items-center tracking-in-expand">
        <EnvelopeIcon className="h-8 w-8 text-indigo-600" />
        <p className="ml-2 text-xl font-bold text-indigo-600">
          {emailHiddenText}
        </p>
      </div>
      <p
        className={`text-xs mt-3 tracking-in-expand ${
          isVerified ? "block" : "hidden"
        }`}
      >
        Return to the automatic Sign in page after 15 seconds: {countdownText}
      </p>
      <button
        onClick={() => navigate("/login")}
        className="text-sm text-indigo-500 hover:text-indigo-700 mt-3"
      >
        Click to Sign in!
      </button>
    </LayoutRegistration>
  );
};

export default VerifyEmailView;
