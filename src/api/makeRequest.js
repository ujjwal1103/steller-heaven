import axios from "axios";
import { getCurrentUser } from "./../utils/getUser";

const currentUser = getCurrentUser();

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_BASE_URL
    : process.env.REACT_APP_BASE_URL;


const makeRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: currentUser?.token || null,
  },
});

export { makeRequest };
