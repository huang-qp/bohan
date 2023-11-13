<template>
  <el-dialog
    :model-value="isShowAddOrEditDialog"
    :title="props.AddOrEditDialogData.dialogTitle"
    width="800"
    :before-close="handleClose"
  >
    <!-- 表单内容 -->
    <FormComponent
      :formConfig="formConfiguration"
      @onInputEvent="onInputEvent"
      @onInputFocus="onInputFocus"
      ref="formComponents"
    >
      <template #formComponentTitle>
        <h2>表单组件展示</h2>
      </template>
    </FormComponent>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sureAdd">
          确认
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AddOrEditDialog"
};
</script>
<script setup>
import {addOrEditDialogForm} from './addOrEditDialogForm.json'
import { reactive, ref, defineProps, watch, computed } from "vue";
import store from "@store";
//form 表单配置项
let formConfiguration = reactive(JSON.parse(JSON.stringify(addOrEditDialogForm)));
let formComponents = ref(null)
// 是否展示新增/修改弹窗
let isShowAddOrEditDialog = computed(()=>store.state.user.isShowAddOrEditDialog)
// props接收父组件传来的参数
let props = defineProps({
  AddOrEditDialogData:Object
})
// 监听父组件传来的数据
watch(()=>props.AddOrEditDialogData,(newValue,oldValue)=>{
  // 表单赋值
  formConfiguration.formData = newValue.editData
},{ deep: true })
// 监听 是否展示新增/修改弹窗
watch(isShowAddOrEditDialog,(newValue,oldValue)=>{
  if(!newValue){
    // 表单重置
    formComponents.value.formRef.resetFields()
  }
},{ deep: true })
// 引入校验规则
import {tellPhoneValidation} from '@/tool/formValidationRule'
// 表单添加自定义校验规则
formConfiguration.rules.mobilePhoneNumber.push({ validator: tellPhoneValidation, trigger: 'blur' })

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
* @description: 新增/修改弹窗关闭事件
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let handleClose = function(){
  store.dispatch('user/updateDialogStatus',false)
}
/**
* @description: 新增/修改弹窗点击确定事件
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let sureAdd = ()=>{
  if(props.AddOrEditDialogData.dialogTitle==='新增'){
    formComponents.value.formRef.validate((valid) => {
      if (valid) {
        store.dispatch("user/addUser",formConfiguration.formData)
      } else {
        return false;
      }
    });
  }else{
    formComponents.value.formRef.validate((valid) => {
      if (valid) {
        store.dispatch("user/editUser",formConfiguration.formData)
      } else {
        return false;
      }
    });
  }
}
</script>
<style scoped lang="scss">

</style>