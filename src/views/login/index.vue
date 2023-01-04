<template>
  <el-row justify="center">
    <img class="class-logo" src="@/assets/logo.jpg" alt="">
    <h1 class="class-title">
      博函后台管理系统
    </h1>
  </el-row>
  <el-row justify="center">
    <el-col class="class-login-form-box" :span="7">
      <el-row class="class-login-form-parent" justify="center">
        <!--        表单上方title-->
        <el-col class="class-login-form-title">
          <h2>账号登陆</h2>
        </el-col>
        <!--        登陆表单-->
        <el-col class="class-login-form">
          <el-form
            ref="loginForm" :model="loginForm" :rules="rules"
            size="large"
          >
            <!--            账号-->
            <el-form-item prop="accountNumber">
              <el-input
                v-model="loginForm.accountNumber" autocomplete="off" :prefix-icon="iconList.User"
                placeholder="请输入账号"
              />
            </el-form-item>
            <!--            密码-->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password" type="password" autocomplete="off"
                :prefix-icon="iconList.Lock"
                placeholder="请输入密码"
              />
            </el-form-item>
            <!--            验证码-->
            <el-form-item prop="verificationCode">
              <el-input
                v-model="loginForm.verificationCode" autocomplete="off" :prefix-icon="iconList.Magnet"
                placeholder="请输入验证码"
              />
            </el-form-item>
            <!--        注册 忘记密码-->
            <el-form-item>
              <el-row class="class-register-forget-password">
                <!--                注册-->
                <el-col class="class-register" :span="12">
                  <el-button type="primary" link>
                    注册
                  </el-button>
                </el-col>
                <!--                忘记密码-->
                <el-col class="class-forget-password" :span="12">
                  <el-button type="primary" link>
                    忘记密码
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <!--        登陆按钮-->
            <el-form-item>
              <el-button class="class-button-login" type="primary">
                登陆
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="class-login-form" />
  </el-row>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Lock, Magnet } from "@element-plus/icons-vue";

export default {
  name: "Login",
  setup() {
    const iconList = {
      User,
      Lock,
      Magnet
    };
    const loginForm = reactive({
      // 账号
      accountNumber: "",
      // 密码
      password: "",
      // 验证码
      verificationCode: ""
    });
    const rules = reactive({
      // 账号
      accountNumber: [
        { required: true, message: "请输入账号", trigger: "blur" }
      ],
      // 密码
      password: [
        { required: true, message: "请输入密码", trigger: "blur" }
      ]
      // // 验证码
      // verificationCode: [
      //   { validator: this.examineVerificationCode, required: true, trigger: "blur" }
      // ]
    });
    return {
      loginForm,
      rules,
      iconList
    };
  }
};
</script>

<style lang="scss" scoped>
.class-logo {
  width: 75px;
  height: 60%;
  padding-top: 16px;
}
.class-title{
  text-shadow: 1px 1px 1px rgb(0,0,0,0.5);
}
.class-login-form-box {
  padding: 0 20px;
  box-shadow: 0 0 10px rgb(0,0,0,0.5);
  .class-login-form-parent {
    .class-login-form {
      .class-register-forget-password {
        flex: 1;

        .class-register {
          text-align: left;
        }

        .class-forget-password {
          text-align: right;
        }
      }

      .class-button-login {
        width: 100%;
      }
    }


  }
}
</style>