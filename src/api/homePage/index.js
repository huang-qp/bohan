import axios from "@/tool/axiosConfig"

const fetchMenuList_url = "/bohan/api/fetchMenuList"
const queryHomePageTable_url = "/bohan/api/homePage/queryHomePageTable"

export function fetchMenuList(params) {
  return axios({
    url: fetchMenuList_url,
    data: params,
    method: "post",
  });
}

export function queryHomePageTable(params) {
  return axios({
    url: queryHomePageTable_url,
    data: params,
    method: "post",
  });
}