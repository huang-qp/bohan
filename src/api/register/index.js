import axios from "@/tool/axiosConfig"


const register_url = "/bohan/api/register"

export function register(params) {
    return axios({
      url: register_url,
      data: params,
      method: "post",
    });
  }