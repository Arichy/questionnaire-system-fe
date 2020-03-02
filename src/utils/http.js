import axios from "axios";
import cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:7001",
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default instance;
