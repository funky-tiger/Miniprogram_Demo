import Taro from "@tarojs/taro";
import { baseUrl, noConsole } from "../config";

const request_data = {
  /**
   * 公共参数，所有请求都会将其作为其中的参数
   */
  // platform: "wap",
  // rent_mode: 2
};

export default (options = { method: "GET", data: {}, headers: {} }) => {
  if (!noConsole) {
    console.info(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    );
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data
    },
    header: {
      ...options.headers,
      "Content-Type": "application/json"
    },
    method: options.method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      if (data.code !== "OK") {
        Taro.showToast({
          title: `${res.message}` || res.data.error.code || "请求出错啦",
          icon: "none",
          mask: true
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
