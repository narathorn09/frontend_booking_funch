import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNewToken, removeToken } from "../redux/tokenSlice";

export const checkLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp > Math.round(new Date().getTime() / 1000)) {
          dispatch(setNewToken({ newToken: token, dataDecode: decoded }));
          return;
        } else {
          dispatch(removeToken());
          navigate("/login"); // Redirect to login page
        }
      } catch (err) {
        console.log("Error decoding token:", err);
        dispatch(removeToken());
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token]);
};
