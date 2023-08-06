import axios from "axios";
import { getCurrentUser } from "./../utils/getUser";

const currentUser = getCurrentUser();
const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: currentUser?.token || null,
  },
});

export { makeRequest };
