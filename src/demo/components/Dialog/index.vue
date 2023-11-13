<template>
  <el-dialog title="收货地址" v-model="defaultData.dialogVisible" @close="closeDialogVisible">
    <el-form :model="defaultData.form">
      <el-form-item label="活动名称" :label-width="defaultData.formLabelWidth">
        <el-input v-model="defaultData.form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="defaultData.formLabelWidth">
        <el-select v-model="defaultData.form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer class="dialog-footer">
      <el-button @click="closeDialogVisible">取 消</el-button>
      <el-button type="primary" @click="getDialogData">
        确 定
      </el-button
      >
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "dialogForm"
};
</script>

<script setup>
import { reactive, watch } from "vue";

// eslint-disable-next-line no-undef
let props = defineProps({
  magnifyingGlassOptions: {
    type: Object,
    default: () => ({})
  }
});
let defaultData = reactive({
  form: {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: ""
  },
  formLabelWidth: "120px",
  dialogVisible: props.magnifyingGlassOptions.isShow
});
// eslint-disable-next-line no-undef
let emit = defineEmits(["closeDialogVisible", "getDialogData"]);
let closeDialogVisible = () => {
  emit("closeDialogVisible", props.magnifyingGlassOptions);
};
let getDialogData = () => {
  emit("getDialogData", {
    magnifyingGlassData: defaultData.form,
    magnifyingGlassOptions: props.magnifyingGlassOptions
  });
};

watch(props.magnifyingGlassOptions, (newValue, oldValue) => {
  console.log(newValue);
  console.log(oldValue);
  defaultData.dialogVisible = newValue.isShow;
}, { deep: true });
</script>
<style lang="scss" scoped>
</style>