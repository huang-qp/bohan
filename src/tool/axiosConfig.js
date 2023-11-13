import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import router from "../router";
import store from "../store";
// import router from '@/router/create-router'
import { ElLoading } from "element-plus";

// 响应时间
axios.defaults.timeout = 5 * 1000;
// 配置cookie
// axios.defaults.withCredentials = true
// 配置cookie
// axios.defaults.headers.common['Authorization '] = token
// 配置请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// 静态资源
// Vue.prototype.$static = ''
// 配置接口地址
axios.defaults.baseURL = "http://127.0.0.1:9999";

console.log(axios.defaults.headers);
// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading,
  baseURL = "";
if (process.env.NODE_ENV === "production") {
  baseURL = "";
} else if (process.env.NODE_ENV === "development") {
  baseURL = "http://127.0.0.1:9999";
  // baseURL = "";
}

function startLoading() {
  loading = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.7)"
  });
}

function endLoading() {
  loading.close();
}

// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// create an axios instance 创建一个axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests 跨越请求时发送cookie
  timeout: 60000 // request timeout
});

// request interceptor 拦截器
service.interceptors.request.use(
  (config) => {
    // do something before request is sent 发送请求之前
    if ((store.state.login.token || true)) {
      //方法是post,data不存在时，设置空对象。解决调用接口参数异常的错误
      if (config.method == "post" && !config.data) {
        config.data = {};
      }
      config.baseURL = baseURL;

      showFullScreenLoading();
      return config;
    } else {
      if (config.url === "/bohan/api/login") {
        //方法是post,data不存在时，设置空对象。解决调用接口参数异常的错误
        if (config.method == "post" && !config.data) {
          config.data = {};
        }
        config.baseURL = baseURL;
        showFullScreenLoading();
        return config;
      } else {
        router.push("/");
      }
    }
  },
  (error) => {
    // do something with request error
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    tryHideFullScreenLoading();
    // if the custom code is not 20000, it is judged as an error.
    if (
      (res.code && res.code !== 200) ||
      (res.status &&
        res.status.code !== "000000" &&
        response.config.type !== "noCatch")
    ) {
      // const errorMessage = res.status.statusReason.replace(/[;；]/g, '$&<br>')
      const errorMessage = res.status.statusReason;
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: errorMessage || "Error",
        type: "error",
        duration: 5 * 1000
      });
      //res.message
      return Promise.reject(new Error(errorMessage || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    tryHideFullScreenLoading();
    const res = error.response;
    const resData = res.data;
    const error403 = "对不起，您当前无权限访问，请联系系统管理员:[100008]";

    if (error.response) {
      if (res.status == 403) {
        //发生403错误时，跳403页面 并弹窗提示
        ElMessageBox.alert(
          resData ? resData.status.statusReason : error403,
          "提示",
          {
            confirmButtonText: "确定",
            callback: () => {
              router.push("/homePage");
            }
          }
        );
      } else if (resData.status && resData.status.statusReason) {
        ElMessageBox.alert(resData.status.statusReason, "", {
          confirmButtonText: "确定"
        });
      } else {
        ElMessage({
          message: error,
          type: "error",
          duration: 5 * 1000
        });
      }
    } else {
      ElMessage({
        message: error.message,
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
