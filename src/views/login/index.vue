<template>
  <div class="class-login-box">
    <el-row justify="center" class="class-logo-title-parent">
      <img class="class-logo" src="@/assets/logo.jpg" alt="" />
      <h1 class="class-title">博函后台管理系统</h1>
    </el-row>
    <el-row justify="center">
      <div class="class-login-form-box">
        <el-row class="class-login-form-parent" justify="center">
          <!--        表单上方title-->
          <el-col class="class-login-form-title">
            <h2>账号登陆</h2>
          </el-col>
          <!--        登陆表单-->
          <el-col class="class-login-form">
            <!--          注：ref 和 model 名字不能一样 否则输入框无法输入-->
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="rules"
              size="large"
            >
              <!--            账号-->
              <el-form-item prop="accountNumber">
                <el-input
                  v-model="loginForm.accountNumber"
                  autocomplete="off"
                  :prefix-icon="iconList.User"
                  placeholder="请输入账号"
                />
              </el-form-item>
              <!--            密码-->
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  autocomplete="off"
                  :prefix-icon="iconList.Lock"
                  placeholder="请输入密码"
                />
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <!--            验证码-->
                  <el-form-item prop="verificationCode">
                    <el-input
                      v-model="loginForm.verificationCode"
                      autocomplete="off"
                      :prefix-icon="iconList.Magnet"
                      placeholder="请输入验证码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <!--            验证码-->
                  <VerificationCode
                    :refresh-img-code="loginForm.refreshImgCode"
                    @click="debounceChangeImageCode"
                    @getCode="backImageCode"
                  />
                </el-col>
              </el-row>

              <!--        注册 忘记密码-->
              <el-form-item>
                <el-row class="class-register-forget-password">
                  <!--                注册-->
                  <el-col class="class-register" :span="12">
                    <el-button type="primary" link @click="clickRegister">
                      注册
                    </el-button>
                  </el-col>
                  <!--                忘记密码-->
                  <el-col class="class-forget-password" :span="12">
                    <el-button type="primary" link> 忘记密码 </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <!--        登陆按钮-->
              <el-form-item>
                <el-button
                  class="class-button-login"
                  type="primary"
                  @click="debounceClickLogin"
                >
                  登陆
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--    系统介绍以及版权所有-->
    <el-row class="class-introduce-copyright">
      <el-col class="class-introduce">
        <span>博函后台管理系统</span>
      </el-col>
      <el-col class="class-copyright">
        <span>版权所有：xxx</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Lock, Magnet } from "@element-plus/icons-vue";
import VerificationCode from "@/components/VerificationCode/index.vue";
import md5 from "js-md5";
import { debounce } from "@/tool/debounceAndThrottle";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {
    VerificationCode,
  },
  setup() {
    //图标名称
    let iconList = {
      User,
      Lock,
      Magnet,
    };
    let router = useRouter();
    const store = useStore();
    // form表单绑定的值
    let loginForm = reactive({
      // 账号
      accountNumber: "",
      // 密码
      password: "",
      // 输入框输入的验证码
      verificationCode: "",
      // 图片生成的验证码
      imgCode: "",
      // 刷新验证码
      refreshImgCode: false,
    });
    /**
     * @description: 验证码 自定义验证规则
     * @param {*} rule
     * @param {*} value 输入框内容
     * @param {*} callback 回调函数
     * @author: hqp
     */
    let examineVerificationCode = (rule, value, callback) => {
      let encryptionValue = md5(value);
      if (!value) {
        callback(new Error("请输入验证码"));
      } else if (encryptionValue !== loginForm.imgCode) {
        callback(new Error("验证码不正确!"));
        loginForm.refreshImgCode = !loginForm.refreshImgCode;
      } else {
        callback();
      }
    };
    // form表单校验规则
    let rules = reactive({
      // 账号
      accountNumber: [
        { required: true, message: "请输入账号", trigger: ["blur", "change"] },
      ],
      // 密码
      password: [
        { required: true, message: "请输入密码", trigger: ["blur", "change"] },
      ],
      // 验证码
      verificationCode: [
        { validator: examineVerificationCode, required: true, trigger: "blur" },
      ],
    });
    /**
     * @description: 刷新验证码操作
     * @author:hqp
     */
    let changeImageCode = () => {
      loginForm.refreshImgCode = !loginForm.refreshImgCode;
    };
    /**
     * @description: 刷新验证码防抖
     * @author:hqp
     */
    let debounceChangeImageCode = debounce(changeImageCode, 200);
    /**
     * @description: 接收组件返回加密后的验证码值
     * @param {String} code
     * @author:hqp
     */
    let backImageCode = (code) => {
      loginForm.imgCode = code;
    };
    //获取表单
    let loginFormRef = ref(null);
    /**
     * @description: 登陆
     * @author:hqp
     */
    let clickLogin = () => {
      console.log("000");
      //通过ref的值触发验证
      loginFormRef.value.validate((valid) => {
        if (valid) {
          console.log(111);
          store.dispatch("login/signIn", loginForm);
          //触发成功验证表单，调用接口；
        } else {
          console.log("未通过");
        }
      });
    };
    /**
     * @description: 登陆按钮防抖
     * @author:hqp
     */
    let debounceClickLogin = debounce(clickLogin, 200);
    let clickRegister = () => {
      router.push("/register");
    };
    return {
      loginForm,
      rules,
      iconList,
      debounceChangeImageCode,
      backImageCode,
      debounceClickLogin,
      loginFormRef,
      clickRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
.class-login-box {
  display: flex;
  flex-direction: column;
}
.class-logo-title-parent {
  margin-top: 5%;
  padding-left: 5px;
  padding-bottom: 20px;
  //登陆表单外 上面的logo样式
  .class-logo {
    width: 75px;
    height: 60%;
    padding-top: 16px;
  }

  //登陆表单外 上面的title字体样式
  .class-title {
    padding-left: 10px;
    text-shadow: 1px 1px 1px rgb(0, 0, 0, 0.5);
  }
}

//登陆表单边框样式
.class-login-form-box {
  padding: 20px 40px 30px 40px;
  background: white;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.3);

  .class-login-form-parent {
    //登陆表单内 上方title样式
    .class-login-form-title {
      text-align: center;
    }

    .class-login-form {
      //登陆表单内 '注册' 和 '忘记密码' 样式
      .class-register-forget-password {
        flex: 1;

        .class-register {
          text-align: left;

          .el-button {
            font-weight: 400;
          }
        }

        .class-forget-password {
          text-align: right;

          .el-button {
            font-weight: 400;
          }
        }
      }

      //登陆表单内 登陆按钮样式
      .class-button-login {
        width: 100%;
      }

      .el-form {
        :deep(.el-form-item) {
          .el-input {
            //设置输入框中图标的大小
            .el-icon {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}

//最下方介绍和版权样式
.class-introduce-copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  .class-introduce,
  .class-copyright {
    font-size: 14px;
    text-align: center;
    color: rgb(158, 158, 158);
  }
}
</style>
