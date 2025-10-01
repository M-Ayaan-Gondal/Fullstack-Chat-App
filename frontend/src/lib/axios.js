import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",  // backend URL
  withCredentials: true, // if cookies in use
});
