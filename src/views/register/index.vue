<template>
  <el-row justify="center" class="class-register-form">
    <!-- 表单内容 -->
    <FormComponent
      :formConfig="formConfiguration"
      @btnClick="btnClick"
      @onInputEvent="onInputEvent"
      @onInputFocus="onInputFocus"
      @closeDialogVisible="closeDialogVisible"
      @getDialogData="getDialogData"
      ref="formComponents"
    >
      <template #registerTitle>
        <h2 class="class-register-title">注 册</h2>
      </template>
    </FormComponent>
  </el-row>
</template>

<script>
import { watch, defineComponent, reactive, onMounted } from "vue";
import FormComponent from "@components/FormComponent/index.vue";
import { listForm } from "./registerfForm.json";
import { useRouter } from "vue-router";
import { useStore } from "vuex"

export default defineComponent({
  name: "register",
  components: {
    FormComponent,
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
    let formConfiguration = reactive(JSON.parse(JSON.stringify(listForm)));
    let router = useRouter();
    let store = useStore()
    /**
     * @description: form表单组件中的按钮点击事件
     * @param {Object} data 表单绑定的数据
     * @param {String} btnCode 按钮的code码
     * @author: hqp
     */
    let btnClick = (data, btnCode) => {
      //重置
      if (btnCode === "empty") {
        formConfiguration = reactive(JSON.parse(JSON.stringify(listForm)));
      }
      // 返回
      if (btnCode === "back") {
        router.push("/");
      }
      if (btnCode === "submit") {
        store.dispatch("register/registered",data)
      }
      console.log(data);
      console.log(btnCode);
    };
    /**
     * @description: 当form表单组件中的值，发生变化时触发 用于父子组件中的formData同步
     * @param {Object} data 表单绑定的数据
     * @author: hqp
     */
    let onInputEvent = (data) => {
      formConfiguration.formData = data;
    };
    /**
     * @description: form表单组件输入框获取焦点时触发
     * @param {Object} data 渲染form表单组件（el-form-item）的配置项
     * @author: hqp
     */
    let onInputFocus = (data) => {
      // 此处为处理放大镜的逻辑 else里面可放非放大镜的处理逻辑
      if (data.clickToPopUp) {
        formConfiguration.formList.forEach((item) => {
          if (item.code === data.code) {
            // this.$set(item, "isShow", true);
            item["isShow"] = true;
          }
        });
      }
    };
    /**
     * @description: form表单中的弹窗组件关闭时触发 （一般用于放大镜）
     * @param {Object} data 渲染form表单组件（el-form-item）的配置项
     * @author: hqp
     */
    let closeDialogVisible = (data) => {
      if (data.clickToPopUp) {
        formConfiguration.formList.forEach((item) => {
          if (item.code === data.code) {
            // this.$set(item, "isShow", false);
            item["isShow"] = false;
          }
        });
      }
    };
    /**
     * @description: 获取form中的弹窗组件的值
     * @param {object} data form表单中的弹窗组件传过来的值 （magnifyingGlassData：弹窗中所用的数据；magnifyingGlassOptions：渲染form表单组件（el-form-item）的配置项）
     * @author: hqp
     */
    let getDialogData = (data) => {
      let name = data.magnifyingGlassData.name;
      let magnifyingGlassOptions = data.magnifyingGlassOptions;
      // mold=6（el-form-item中是组件渲染）时的处理方式
      formConfiguration.formList.forEach((item) => {
        if (item.code === magnifyingGlassOptions.code) {
          // this.$set(item, item.code, name);
          // this.$set(this.formConfiguration.formData, item.code, name);
          // this.$set(item, "isShow", false);
          item[item.code] = name;
          formConfiguration.formData[item.code] = name;
          item["isShow"] = false;
        }
      });
    };
    onMounted(() => {
      
    });
    watch(
      formConfiguration.formData,
      (newVal, oldVal) => {
        console.log(newVal);
        console.log(oldVal);
      },
      { deep: true }
    );
    return {
      formConfiguration,
      btnClick,
      onInputEvent,
      onInputFocus,
      closeDialogVisible,
      getDialogData,
    };
  },
});
</script>

<style lang="scss" scoped>
.class-register-form {
  width: 35%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 20px;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.3);

  .class-register-title {
    text-align: center;
  }
}
</style>