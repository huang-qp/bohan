<template>
  <div>
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
      <template #formComponentTitle>
        <h2>表单组件展示</h2>
      </template>
    </FormComponent>
    <!--        分割线-->
    <el-divider />
    <h2>表格组件展示</h2>
    <!--    <TableComponent-->
    <!--      :tableConfig="tableConfiguration"-->
    <!--      @pagination="pagination"-->
    <!--      @handleSizeChange="handleSizeChange"-->
    <!--      @getSelectTableData="getSelectTableData"-->
    <!--      @handleButton="handleButton"-->
    <!--    >-->
    <TableComponent
      :tableConfig="tableConfiguration"
      @getUnitValue="getUnitValue"
      @refreshTable="refreshTable"
    />
    <el-divider />
    <h2>查询条件组件展示</h2>
    <QueryCondition
      :queryItems="queryConditionConfiguration"
      @btnClick="btnClick"
    />
  </div>
</template>

<script>
export default {
  name: "MainContent",
};
</script>
<script setup>
import {
  homePageForm,
  homePageTable,
  queryConditionForm,
} from "./homePageForm.json";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "@store";

let formComponents = ref(null);

let formConfiguration = reactive(JSON.parse(JSON.stringify(homePageForm))); //form 表单配置项
let tableConfiguration = reactive(JSON.parse(JSON.stringify(homePageTable))); //table 表格配置项
let queryConditionConfiguration = reactive(
  JSON.parse(JSON.stringify(queryConditionForm))
); //查询条件form配置项
let router = useRouter();

/**
 * @description: 列点击事件回调函数
 * @param {Object} data 行数据
 * @author:hqp
 */
let mobilePhoneNumberClicked = (data) => {
  console.log(data);
};
// 给对应列添加点击事件
tableConfiguration.tableHeader.forEach((item) => {
  if (item.prop === "mobilePhoneNumber") {
    item.clickEvent = mobilePhoneNumberClicked;
  }
});

/**
 * @description: form表单组件中的按钮点击事件
 * @param {Object} data 表单绑定的数据
 * @param {String} btnCode 按钮的code码
 * @author: hqp
 */
let btnClick = (data, btnCode) => {
  //重置
  if (btnCode === "empty") {
    console.log(formConfiguration);
    // let homePageFormCopy = reactive(JSON.parse(JSON.stringify(homePageForm)));
    // for (let formConfigurationKey in formConfiguration) {
    //   formConfiguration[formConfigurationKey] = homePageFormCopy[formConfigurationKey]
    // }
    formComponents.value.formRef.resetFields();
  }
  // 返回
  if (btnCode === "back") {
    router.push("/");
  }
  if (btnCode === "submit") {
    alert("提交成功");
    // context.$message.error("提交成功");
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
/**
 * @description: 表格上方单位切换时获取单位值
 * @param {data} 单位值
 * @author:hqp
 */
let getUnitValue = (data) => {
  alert(data);
  console.log(data);
};
/**
 * @description: 表格上方刷新按钮
 * @param {Array} data 要展示的表头数据
 * @return {*}
 * @author: hqp
 */
let refreshTable = (data)=>{
  store.dispatch("homePage/queryTableData");
  tableConfiguration.tableHeader = data
}
onMounted(() => {
  store.dispatch("homePage/queryTableData");
  setTimeout(() => {
    formConfiguration.formData.g = "12121212121.00";
  }, 500);
});

watch(
  formConfiguration.formData,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
  },
  { deep: true }
);

let homePageTableData = computed(() => store.state.homePage.homePageTableData);
watch(
  homePageTableData,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
    tableConfiguration.tableData = newVal.tableData;
    // tableConfiguration.pager = Object.assign({}, tableConfiguration.pager, newVal.pager);
    tableConfiguration.pager.total = newVal.pager.total;
    tableConfiguration.pager.currentPage = newVal.pager.currentPage;
  },
  { deep: true }
);
</script>
<style scoped>
</style>