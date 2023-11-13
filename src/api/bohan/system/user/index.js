import axios from "@/tool/axiosConfig"
// 初始化
const initUser_url = "/bohan/api/system/user/initUser"
// 表格查询
const queryUserTable_url = "/bohan/api/system/user/queryUserTable"
// 新增用户信息
const addUserInfo_url = "/bohan/api/system/user/addUserInfo"
// 修改用户信息
const editUserInfo_url = "/bohan/api/system/user/editUserInfo"
// 删除用户信息
const deleteUserInfo_url = "/bohan/api/system/user/deleteUserInfo"
// 初始化
export function initUser(params) {
  return axios({
    url: initUser_url,
    data: params,
    method: "post",
  });
}
// 表格查询
export function queryUserTable(params) {
  return axios({
    url: queryUserTable_url,
    data: params,
    method: "post",
  });
}
// 新增用户信息
export function addUserInfo(params) {
  return axios({
    url: addUserInfo_url,
    data: params,
    method: "post",
  });
}
// 修改用户信息
export function editUserInfo(params) {
  return axios({
    url: editUserInfo_url,
    data: params,
    method: "post",
  });
}
// 删除用户信息
export function deleteUserInfo(params) {
  return axios({
    url: deleteUserInfo_url,
    data: params,
    method: "post",
  });
}