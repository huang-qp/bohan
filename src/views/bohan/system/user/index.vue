<template>
  <div class="class-user-container">
    <QueryCondition
      :queryItems="queryConditionConfiguration"
      @btnClick="btnClick"
      v-if="isShowQueryCondition"
    />
    <TableComponent
      :tableConfig="tableConfiguration"
      @getUnitValue="getUnitValue"
      @refreshTable="refreshTable"
      @revealingSearch="revealingSearch"
      @clickOperationTableButton="clickOperationTableButton"
      @getSelectTableData="getSelectTableData"
    />
    <AddOrEditDialog
      :AddOrEditDialogData="AddOrEditDialogData"
    />

  </div>
</template>

<script>
export default {
  name: "User",
};
</script>
<script setup>
import { reactive, onMounted,watch,computed,ref } from "vue";
import {userTable,queryConditionForm} from "./userForm.json";
import store from "@store";
import {queue} from "@/tool/buildQueue.js"
import AddOrEditDialog from "@views/bohan/system/user/components/addOrEditDialog/index.vue";
let tableConfiguration = reactive(JSON.parse(JSON.stringify(userTable))); //table 表格配置项
let queryConditionConfiguration = reactive(
  JSON.parse(JSON.stringify(queryConditionForm))
); //查询条件form配置项
let formComponents = ref(null);
// 是否展示查询条件
let isShowQueryCondition = ref(true)
// 选中的表格数据
let selectTableData = reactive([])
let AddOrEditDialogData = reactive({})
// 查询条件赋值单位
queryConditionConfiguration.formData.unit = tableConfiguration.unit
// 监听单位切换重新赋值
watch(()=>tableConfiguration.unit,(newValue,oldValue)=>{
  queryConditionConfiguration.formData.unit = newValue
})
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
  // 查询
  if (btnCode === "submit") {
    store.dispatch("user/queryTableData",data);
  }
};
/**
 * @description: 表格上方单位切换时获取单位值
 * @param {data} 单位值
 * @author:hqp
 */
 let getUnitValue = (data) => {
  tableConfiguration.unit = data.unit
  // 此处赋值是因为先查询 后走监听单位变化的watch
  queryConditionConfiguration.formData.unit = data.unit
  store.dispatch("user/queryTableData",queryConditionConfiguration.formData);
  tableConfiguration.tableHeader = data.tableHeader
};
/**
 * @description: 表格上方刷新按钮
 * @param {Array} data 要展示的表头数据
 * @return {*}
 * @author: hqp
 */
let refreshTable = (data)=>{
  store.dispatch("user/queryTableData",queryConditionConfiguration.formData);
  tableConfiguration.tableHeader = data
}
/**
 * @description: 表格上方显示/隐藏查询条件
 * @param {Boolean} data 是否展示查询条件
 * @return {*}
 * @author: hqp
 */
let revealingSearch = (data)=>{
  isShowQueryCondition.value = data
}
/**
* @description: 点击操作表格按钮（左上方按钮）
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let clickOperationTableButton = (data)=>{
  switch (data){
    case 'add':
      clickAddOperationTableButton()
      break;
    case "edit":
      clickEditOperationTableButton()
      break;
    case "delete":
      clickDeleteOperationTableButton()
      break;
  }
}
/**
* @description: 点击新增按钮
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let clickAddOperationTableButton = () =>{
  store.dispatch('user/updateDialogStatus',true)
  AddOrEditDialogData.dialogTitle = '新增'
  AddOrEditDialogData.editData = {}
}
/**
 * @description: 点击修改按钮
 * @param {type}
 * @author:hqp
 * @return:
 * @example：
 */
let clickEditOperationTableButton = () =>{
  store.dispatch('user/updateDialogStatus',true)
  AddOrEditDialogData.dialogTitle = '修改'
  AddOrEditDialogData.editData = JSON.parse(JSON.stringify(selectTableData[0]))
}
/**
 * @description: 点击删除按钮
 * @param {type}
 * @author:hqp
 * @return:
 * @example：
 */
let clickDeleteOperationTableButton = () =>{
  let obj = {
    deleteDataList:selectTableData
  }
  store.dispatch('user/deleteUser',obj)
}
/**
* @description: 获取表格选中数据
* @param {Array} 表格选中数据
* @author:hqp
* @return:
* @example：
*/
let getSelectTableData = (data) =>{
  selectTableData = data
}
onMounted(() => {
  queue([store.dispatch("user/init"),store.dispatch("user/queryTableData",queryConditionConfiguration.formData)])
});
let userTableData = computed(() => store.state.user.userTableData);
watch(
  userTableData,
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
<style lang="scss" scoped>

</style>