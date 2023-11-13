import  router  from "@/router";
import { login } from "@/api/login";
import { ElMessage } from 'element-plus';
const state = {
  loginStatus: false,
  token:"",
};
const getters = {

};
const mutations = {
  UPDATE_LOGIN_INFORMATION(state,data){
    console.log(444);
    state.loginStatus = true
    state.token = data.result.token
    sessionStorage.setItem("token", data.result.token);
    ElMessage({
      message: '登陆成功',
      type: "success",
      onClose:()=>{
        router.push('/homePage')
      }
    });
  },
};

const actions = {
  signIn({commit},data){
    console.log(222);
    login(data).then(res=>{
      console.log(333);
      commit("UPDATE_LOGIN_INFORMATION",res)
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
