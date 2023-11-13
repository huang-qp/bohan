<!--
 * @Author: hqp
 * @Date: 2023-06-21 15:50:36
 * @Description: 更多查询条件 弹窗抽屉组件
 * @FilePath: /bohan/src/components/QueryCondition/moreQueryCondition.vue
-->
<template>
  <el-drawer
    v-model="defaultData.moreQueryConditionConfig.isShowDrawer"
    :direction="direction"
  >
    <template #header>
      <span>查询条件</span>
    </template>
    <template #default>
      <!-- 表单内容 -->
      <FormComponent
        :formConfig="defaultData.moreQueryConditionConfig"
        @btnClick="btnClick"
        @onInputEvent="onInputEvent"
        @onInputFocus="onInputFocus"
        @closeDialogVisible="closeDialogVisible"
        @getDialogData="getDialogData"
        ref="formComponents"
      />
    </template>
    <template #footer>
      <div class="class-footer-button-parent">
        <el-button type="primary" @click="clickQueryButton">
          查询
        </el-button>
        <el-button @click="clickRestButton"> 重置 </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
export default {
  name: "MoreQueryCondition",
};
</script>
<script setup>
import { ref,reactive } from "vue";
let direction = ref("rtl");
let formComponents = ref(null)
// eslint-disable-next-line no-undef
let emit = defineEmits(['onInputEvent','triggerFormButton'])
// eslint-disable-next-line no-undef
let props = defineProps({
  moreQueryConditionConfig: {
    type: Object,
    required: true,
  },
});
// eslint-disable-next-line no-undef
let defaultData = reactive({
  moreQueryConditionConfig: props.moreQueryConditionConfig
});

console.log(props);
/**
 * @description: form表单组件中的按钮点击事件
 * @param {Object} data 表单绑定的数据
 * @param {String} btnCode 按钮的code码
 * @author: hqp
 */
 let btnClick = (data, btnCode) => {
  //重置
  if (btnCode === "empty") {
    formComponents.value.formRef.resetFields();
  }
  if (btnCode === "submit") {
    emit("triggerFormButton", defaultData.moreQueryConditionConfig.formData, btnCode);
  }
};

/**
 * @description: 当form表单组件中的值，发生变化时触发 用于父子组件中的formData同步
 * @param {Object} data 表单绑定的数据
 * @author: hqp
 */
let onInputEvent = (data) => {
  // eslint-disable-next-line vue/no-mutating-props
  defaultData.moreQueryConditionConfig.formData = data;
  emit('onInputEvent',defaultData.moreQueryConditionConfig.formData)
};
/**
 * @description: form表单组件输入框获取焦点时触发
 * @param {Object} data 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
let onInputFocus = (data) => {
  // 此处为处理放大镜的逻辑 else里面可放非放大镜的处理逻辑
  if (data.clickToPopUp) {
    defaultData.moreQueryConditionConfig.formList.forEach((item) => {
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
    defaultData.moreQueryConditionConfig.formList.forEach((item) => {
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
  defaultData.moreQueryConditionConfig.formList.forEach((item) => {
    if (item.code === magnifyingGlassOptions.code) {
      // this.$set(item, item.code, name);
      // this.$set(this.props.moreQueryConditionConfig.formData, item.code, name);
      // this.$set(item, "isShow", false);
      item[item.code] = name;
      // eslint-disable-next-line vue/no-mutating-props
      defaultData.moreQueryConditionConfig.formData[item.code] = name;
      item["isShow"] = false;
    }
  });
};
/**
 * @description: 查询按钮点击事件
 * @return {*}
 * @author: hqp
 */
let clickQueryButton = ()=>{
  // 调用formComponents内置的按钮点击方法
  formComponents.value.btnDown("submit")
}
/**
 * @description: 重置按钮点击事件
 * @return {*}
 * @author: hqp
 */
let clickRestButton = ()=>{
  // 调用formComponents内置的按钮点击方法
  formComponents.value.btnDown("empty")
}
// watch(
//   props.moreQueryConditionConfig,
//   (newVal, oldVal) => {
//     console.log(newVal);
//     console.log(oldVal);
//     debugger;
//   },
//   { deep: true }
// );
</script>
<style lang="scss" scoped>
.class-footer-button-parent {
  display: flex;
  justify-content: center;
}
</style>