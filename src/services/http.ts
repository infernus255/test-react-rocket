import axios from "axios";
import url from "../constants/constants";

const http = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json"
  }
});

export default http;
