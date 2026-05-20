import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.PROD
  ? 'https://crowd-predictor-ai.onrender.com/api'
  : 'http//localhost:5000'
});

export default API;