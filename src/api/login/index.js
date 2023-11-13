import axios from "@/tool/axiosConfig"

const login_url = "/bohan/api/login"

export function login(params) {
  return axios({
    url: login_url,
    data: params,
    method: "post",
  });
}