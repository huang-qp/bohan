<template>
  <el-row justify="center">
    <!-- 表单内容 -->
    <FormComponent
      :formConfig="formConfiguration"
      @btnClick="btnClick"
      @onInputEvent="onInputEvent"
      @onInputFocus="onInputFocus"
      @closeDialogVisible="closeDialogVisible"
      @getDialogData="getDialogData"
      ref="formComponents"
    />
  </el-row>
</template>

<script>
import {
  watch,
  defineComponent,
  reactive, onMounted
} from "vue";
import FormComponent from "@components/FormComponent/index.vue";
import { listForm } from "./demoForm.json";
export default defineComponent({
  name: "demo",
  components:{
    FormComponent
  },
  setup(props, context){
    console.log(props);
    console.log(context);
    const formConfiguration = reactive(JSON.parse(JSON.stringify(listForm)))
    /**
     * @description: form表单组件中的按钮点击事件
     * @param {Object} data 表单绑定的数据
     * @param {String} btnCode 按钮的code码
     * @author: hqp
     */
    const btnClick = (data,btnCode)=>{
      console.log(data);
      console.log(btnCode);
    }
    /**
     * @description: 当form表单组件中的值，发生变化时触发 用于父子组件中的formData同步
     * @param {Object} data 表单绑定的数据
     * @author: hqp
     */
    const onInputEvent = (data)=> {
      formConfiguration.formData = data;
    }
    /**
     * @description: form表单组件输入框获取焦点时触发
     * @param {Object} data 渲染form表单组件（el-form-item）的配置项
     * @author: hqp
     */
    const onInputFocus = (data)=> {
      // 此处为处理放大镜的逻辑 else里面可放非放大镜的处理逻辑
      if (data.clickToPopUp) {
        formConfiguration.formList.forEach((item) => {
          if (item.code === data.code) {
            // this.$set(item, "isShow", true);
            item["isShow"] = true
          }
        });
      }
    }
    /**
     * @description: form表单中的弹窗组件关闭时触发 （一般用于放大镜）
     * @param {Object} data 渲染form表单组件（el-form-item）的配置项
     * @author: hqp
     */
    const closeDialogVisible = (data)=> {
      if (data.clickToPopUp) {
        formConfiguration.formList.forEach((item) => {
          if (item.code === data.code) {
            // this.$set(item, "isShow", false);
            item["isShow"] = false
          }
        });
      }
    }
    /**
     * @description: 获取form中的弹窗组件的值
     * @param {object} data form表单中的弹窗组件传过来的值 （magnifyingGlassData：弹窗中所用的数据；magnifyingGlassOptions：渲染form表单组件（el-form-item）的配置项）
     * @author: hqp
     */
    const getDialogData=(data)=> {
      let name = data.magnifyingGlassData.name;
      let magnifyingGlassOptions = data.magnifyingGlassOptions;
      // mold=6（el-form-item中是组件渲染）时的处理方式
      formConfiguration.formList.forEach((item) => {
        if (item.code === magnifyingGlassOptions.code) {
          // this.$set(item, item.code, name);
          // this.$set(this.formConfiguration.formData, item.code, name);
          // this.$set(item, "isShow", false);
          item[item.code] = name
          formConfiguration.formData[item.code] = name
          item["isShow"] = false
        }
      });
    };
    onMounted(()=>{
      setTimeout(()=>{
        formConfiguration.formData.o='12121212121'
      },500)
    });
    watch(formConfiguration.formData, (newVal, oldVal) => {
      console.log(newVal);
      console.log(oldVal);
    }, { deep: true });
    return {
      formConfiguration,
      btnClick,
      onInputEvent,
      onInputFocus,
      closeDialogVisible,
      getDialogData
    }
  }
});
</script>

<style lang="scss" scoped>
</style>