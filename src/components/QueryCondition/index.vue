<!--
 * @Author: hqp
 * @Date: 2023-06-21 10:22:41
 * @Description: 查询条件组件
 * @FilePath: /bohan/src/components/QueryCondition/index.vue
-->
<template>
  <!-- 表单内容 -->
  <FormComponent
    :formConfig="props.queryItems"
    @btnClick="btnClick"
    @onInputEvent="onInputEvent"
    @onInputFocus="onInputFocus"
    @closeDialogVisible="closeDialogVisible"
    @getDialogData="getDialogData"
    ref="formComponents"
  />
  <MoreQueryCondition 
    :moreQueryConditionConfig="moreQueryConditionConfig"
    @onInputEvent="onInputEvent"
    @triggerFormButton="triggerFormButton"
  />
</template>

<script>
export default {
  name: "QueryCondition",
};
</script>
<script setup>
import { ref, onMounted, reactive ,watch} from "vue";
import router from "@/router";
import MoreQueryCondition from "@/components/QueryCondition/moreQueryCondition"
let formComponents = ref(null);
// eslint-disable-next-line no-undef
let emit = defineEmits(['btnClick'])
// eslint-disable-next-line no-undef
let props = defineProps({
  queryItems: {
    type: Object,
    required: true,
  },
});
// 更多条件配置项
let moreQueryConditionConfig = reactive({...props.queryItems})
/**
 * @description: form表单组件中的按钮点击事件
 * @param {Object} data 表单绑定的数据
 * @param {String} btnCode 按钮的code码
 * @author: hqp
 */
let btnClick = (data, btnCode) => {
  //重置
  if (btnCode === "empty") {
    console.log(props.queryItems);
    // let homePageFormCopy = reactive(JSON.parse(JSON.stringify(homePageForm)));
    // for (let props.queryItemsKey in props.queryItems) {
    //   props.queryItems[props.queryItemsKey] = homePageFormCopy[props.queryItemsKey]
    // }
    formComponents.value.formRef.resetFields();
  }
  if (btnCode === "submit") {
    emit("btnClick", props.queryItems.formData, btnCode);
    // context.$message.error("提交成功");
  }
  if(btnCode === "more"){
    moreQueryConditionConfig.isShowDrawer = true
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
  // eslint-disable-next-line vue/no-mutating-props
  props.queryItems.formData = data;
  moreQueryConditionConfig.formData = props.queryItems.formData
};
/**
 * @description: form表单组件输入框获取焦点时触发
 * @param {Object} data 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
let onInputFocus = (data) => {
  // 此处为处理放大镜的逻辑 else里面可放非放大镜的处理逻辑
  if (data.clickToPopUp) {
    props.queryItems.formList.forEach((item) => {
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
    props.queryItems.formList.forEach((item) => {
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
  props.queryItems.formList.forEach((item) => {
    if (item.code === magnifyingGlassOptions.code) {
      // this.$set(item, item.code, name);
      // this.$set(this.props.queryItems.formData, item.code, name);
      // this.$set(item, "isShow", false);
      item[item.code] = name;
      // eslint-disable-next-line vue/no-mutating-props
      props.queryItems.formData[item.code] = name;
      item["isShow"] = false;
    }
  });
};
/**
 * @description: 处理查询条件显示方式
 * @return {*}
 * @author: hqp
 */
let exceedMore = () => {
  if (props.queryItems.formList.length > 6) {
    // 常显项
    let alwaysOnItems = props.queryItems.formList.slice(0, 5);
    // 按钮项
    let buttonItems =
      props.queryItems.formList[props.queryItems.formList.length - 1];
    // 超出项
    let exceed = props.queryItems.formList.slice(
      5,
      props.queryItems.formList.length - 1
    );
    // 更多条件配置项
    moreQueryConditionConfig.isShowDrawer = false
    moreQueryConditionConfig.formList = exceed.map(item=>{
      item.width = 24
      return item
    })
    // 有超出项 添加更多条件按钮
    // eslint-disable-next-line vue/no-mutating-props
    props.queryItems.formList[
      props.queryItems.formList.length - 1
    ].btnList.push({
      icon: "",
      type: "",
      name: "更多条件",
      code: "more",
      plain: false,
      round: false,
    });
    // eslint-disable-next-line vue/no-mutating-props
    props.queryItems.formList = alwaysOnItems;
    // eslint-disable-next-line vue/no-mutating-props
    props.queryItems.formList[5] = buttonItems;
  }
};
/**
 * @description: 抽屉查询条件 点击查询后 再去trigger一下外面的查询按钮 用于必填校验
 * @param {Object} data 查询条件数据
 * @param {String} btnCode 按钮的code名称
 * @return {*}
 * @author: hqp
 */
let triggerFormButton = (data,btnCode)=>{
  if (btnCode === "submit") {
    emit("btnClick", props.queryItems.formData, btnCode);
    // context.$message.error("提交成功");
    formComponents.value.btnDown("submit")
  }
}
// let steFormData = (data)=>{
//   data.forEach(items=>{
//     props.queryItems.formList.forEach(item=>{
//       if(items.code===item.code){
//         item[item.code] = items[item.code]
//         props.queryItems.formData[item.code] = items[item.code]
//       }
//     })
//   })
// }
// watch(
//   props.queryItems,
//   (newVal, oldVal) => {
//     console.log(newVal);
//     console.log(oldVal);
//     moreQueryConditionConfig.formData = newVal.formData
//   },
//   { deep: true }
// );
onMounted(() => {
  exceedMore();
});
</script>
<style lang="scss">

</style>