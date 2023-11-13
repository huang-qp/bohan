import router from "@/router";
import { register } from "@/api/register";
import { ElMessage } from 'element-plus';
const state = {

};
const getters = {

};
const mutations = {
    UPDATE_REGISTER_SUCCESS(state, data) {
        console.log(state);
        console.log(data);
        ElMessage({
          message: "注册成功",
          type: "success",
          onClose:()=>{
            router.push('/')
          }
        });
    }
};

const actions = {
    registered({ commit }, data) {
        register(data).then(res => {
            commit("UPDATE_REGISTER_SUCCESS", res)
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
