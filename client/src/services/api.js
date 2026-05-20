import axios from "axios";

const API = axios.create({
  baseURL: "https://crowd-predictor-ai.onrender.com/api",
});

export default API;