<template>
  <el-dialog
    v-model="defaultData.dialogVisible"
    title="显示/隐藏"
    @close="closeDialogVisible"
  >
    <el-transfer
      v-model="value" :data="defaultData.tableHeader" :titles="['显示', '隐藏']"
      @change="changeTransferData"
    />
  </el-dialog>
</template>

<script>
export default {
  name: "TableTransfer",
};
</script>
<script setup>
import { watch, reactive,ref } from "vue";
// eslint-disable-next-line no-undef
let props = defineProps({
  tableTransferConfiguration: {
    type: Object,
    required: true,
  },
});
// eslint-disable-next-line no-undef
let emit = defineEmits(["closeDialogVisible","setTableHeader"]);
let value = ref([])
let defaultData = reactive({
  dialogVisible: props.tableTransferConfiguration.isShowTableTransfer,
  tableHeader: props.tableTransferConfiguration.tableHeader,
});
/**
 * @description: 关闭关闭弹窗
 * @return {*}
 * @author: hqp
 */
let closeDialogVisible = () => {
  emit("closeDialogVisible", false);
};
/**
 * @description: 穿梭框设置穿梭后触发的回调函数 筛选出左边生效的数据 用于去重新设置表头
 * @param {Array} data 右边数据的key 组成的数组
 * @param {String} direction left/right
 * @return {*}
 * @author: hqp
 */
let changeTransferData = (data,direction)=>{
  let tableHeader = [...defaultData.tableHeader]
  tableHeader.forEach((items,indexes) => {
    data.forEach((item,index)=>{
      if(items.key===item){
        let newSet = new Set(tableHeader)
        newSet.delete(items)
        tableHeader = [...newSet]
      }
    })
  });
  emit("setTableHeader",tableHeader)
}
/**
 * @description: 设置监听 去重新设置defaultData中的值
 * @return {*}
 * @author: hqp
 */
watch(
  props.tableTransferConfiguration,
  (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);
    defaultData.dialogVisible = newValue.isShowTableTransfer;
    defaultData.tableHeader = newValue.tableTransferData.map((item,index)=>{
      item.key = index
      return item
    });
  },
  { deep: true }
);
</script>
<style>
</style>