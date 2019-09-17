/* eslint-disable import/prefer-default-export */
import Request from "../../utils/request";

export const demo = data => {
  return Request({
    url: "/xxx",
    method: "GET",
    data
  });
};
