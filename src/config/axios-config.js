import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_API_SERVER;

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});