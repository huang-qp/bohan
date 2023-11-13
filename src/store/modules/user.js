import { addUserInfo, deleteUserInfo, editUserInfo, initUser, queryUserTable } from "@/api/bohan/system/user";
import { ElMessage } from "element-plus";
import router from "@/router";
import store from "@store";
const state = {
  // 查询条件
  queryCriteria:{

  },
  // 表格数据
  userTableData:{
    pager:{}
  },
  // 是否展示新增/修改弹窗
  isShowAddOrEditDialog:false
};
const getters = {
  getIsShowAddOrEditDialog(state){
    return state.isShowAddOrEditDialog
  }
};
const mutations = {
  // 更新初始化信息
  UPDATE_INIT_USER(state,data){
    console.log(state);
    console.log(data);
  },
  // 更新表格数据
  UPDATE_USER_TABLE_DATA(state,data){
    console.log(state);
    console.log(data);
    state.userTableData.tableData = data.tableData
    state.userTableData.pager.total = data.total
    state.userTableData.pager.currentPage = data.currentPage
  },
  //
  UPDATE_DIALOG_STATUS(state,data){
    state.isShowAddOrEditDialog = data
  }
};

const actions = {
  // 用户页面初始化
  init({commit},data){
    initUser(data).then(res=>{
      commit("UPDATE_INIT_USER",res.result)
    })
  },
  // 用户表格查询
  queryTableData({commit},data){
    queryUserTable(data).then(res=>{
      commit("UPDATE_USER_TABLE_DATA",res.result)
    })
  },
  // 新增用户信息
  addUser({commit},data){
    addUserInfo(data).then((res)=>{
      if(res.status.code==='000000'){
        ElMessage({
          message: '新增成功',
          type: "success",
          onClose:()=>{
            commit("UPDATE_DIALOG_STATUS",false)
            store.dispatch("user/queryTableData")
          }
        });
      }
    })
  },
  // 修改用户信息
  editUser({commit},data){
    editUserInfo(data).then((res)=>{
      if(res.status.code==='000000'){
        ElMessage({
          message: '修改成功',
          type: "success",
          onClose:()=>{
            commit("UPDATE_DIALOG_STATUS",false)
            store.dispatch("user/queryTableData")
          }
        });
      }
    })
  },
  updateDialogStatus({commit},data){
    commit("UPDATE_DIALOG_STATUS",data)
  },
  // 删除用户信息
  // eslint-disable-next-line no-unused-vars
  deleteUser({commit},data){
    deleteUserInfo(data).then((res)=>{
      if(res.status.code==='000000'){
        ElMessage({
          message: '删除成功',
          type: "success",
          onClose:()=>{
            store.dispatch("user/queryTableData")
          }
        });
      }
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
