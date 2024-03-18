import axios from "axios";
import { useSelector } from "react-redux";
const baseURL = import.meta.env.VITE_REACT_APP_API_SERVER;

export const useAxiosWithToken = () => {
  const token = useSelector((state) => state.token.value);
  const requestWithToken = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return requestWithToken;
};

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});