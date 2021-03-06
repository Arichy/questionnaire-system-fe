import axios from "axios";
import { endsWith } from "lodash-es";
import { message } from "ant-design-vue";
import router from "../router";

import { HOST } from "@/config";

const instance = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const { data, status } = err.response || {};
    if (status === 401) {
      if (endsWith(data.message, "jwt expired")) {
        message.error("登陆超时，请重新登陆");
        router.replace("/login");
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
