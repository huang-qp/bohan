<!-- eslint-disable no-undef -->
<!--
 * @Author: hqp
 * @Date: 2022/2/17
 * @Description: 分页表格
 * @FilePath: /bohan/src/components/TableComponent/index.vue
-->
<template>
  <el-row justify="space-between">
    <el-col :span="15">
      <el-scrollbar v-if="defaultData.tableConfig.tableButtonList">
        <div class="class-button-container">
          <el-button
            v-for="item in defaultData.tableConfig.tableButtonList"
            :key="item.code"
            :icon="item.icon"
            :color="item.color"
            :disabled="item.isDisabled"
            plain
            @click="clickOperationTableButton(item.code)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="5">
      <el-row>
        <el-col
          class="class-table-function-button-group"
          :span="12"
          :offset="defaultData.tableConfig.isShowUnitHandoff ? 0 : 12"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            content="显隐列"
            placement="top-end"
          >
            <el-button
              v-if="defaultData.tableConfig.queryTermsButton.isShowRevealingButton" :icon="ScaleToOriginal" circle
              @click="clickRevealing"
            />
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="刷新"
            placement="top"
          >
            <el-button
              v-if="defaultData.tableConfig.queryTermsButton.isShowRefreshButton" :icon="Refresh" circle
              @click="clickRefresh"
            />
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="defaultData.revealingSearch? '隐藏搜索':'显示搜索'"
            placement="top-start"
          >
          <el-button
            v-if="defaultData.tableConfig.queryTermsButton.isShowRevealingSearchButton" :icon="Search" circle
            @click="clickRevealingSearch"
          />
          </el-tooltip>
        </el-col>
        <el-col
          v-if="defaultData.tableConfig.isShowUnitHandoff"
          :span="12"
          :offset="defaultData.tableConfig.isShowQueryTermsButton ? 0 : 12"
        >
          <el-row>
            <el-col :span="8" :offset="4" class="class-unit-label">
              单位：
            </el-col>
            <el-col :span="12">
              <el-select
                v-model="defaultData.tableConfig.unit"
                @change="changeUnit"
              >
                <el-option
                  v-for="item in defaultData.tableConfig.unitHandoffOptions"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-table
    ref="table"
    element-loading-text="Loading"
    :data="defaultData.tableConfig.tableData"
    tooltip-effect="dark"
    style="width: 100%"
    table-layout:
    fixed
    border
    highlight-current-row
    cell-class-name="TableCell"
    :header-cell-style="{
      'text-align': 'center',
      background: '#e3e3e3',
      color: '#666',
    }"
    empty-text="无数据"
    :max-height="adaptTableHeight"
    :summary-method="getSummaries"
    :show-summary="defaultData.tableConfig.frontEndTotal"
    @select="selectTableData"
    @select-all="selectAllTableData"
    @current-change="handleCurrentChange1"
  >
    <el-table-column
      v-if="defaultData.tableConfig.showSelection"
      type="selection"
      width="55"
      align="center"
      :fixed="defaultData.tableConfig.fixedFirstColumn"
    />
    <el-table-column
      v-if="defaultData.tableConfig.showRadio"
      label=""
      width="55"
      :fixed="defaultData.tableConfig.fixedFirstColumn"
    >
      <template #default="scope">
        <el-radio
          v-model="radioInit"
          :label="scope.$index"
          style="padding-left: 10px; margin-right: -25px"
          @change="getRadioRow(scope.$index, scope.row)"
        >
          &nbsp;
        </el-radio>
      </template>
    </el-table-column>

    <el-table-column
      v-if="defaultData.tableConfig.showSerialNumber"
      type="index"
      width="80"
      align="center"
      label="序号"
      :index="customSerialNumber"
    />
    <el-table-column
      v-for="(item, index) in defaultData.tableConfig.tableHeader"
      :key="index"
      :width="item.width ? item.width : ''"
      :min-width="item.minWidth ? item.minWidth : '200'"
      :align="item.align ? item.align : 'center'"
      :label="item.label"
      :prop="item.prop"
      :show-overflow-tooltip="defaultData.showOverflowTooltip"
    >
      <template #default="scope">
        <span v-if="item.render" style="color: #606266">
          {{ item.render(scope.row) }}
        </span>
        <!--若穿了clickEvent则说明该列单元格的内容可点击-->
        <span
          v-else-if="item.clickEvent"
          style="color: #409eff; cursor: pointer"
          @click="item.clickEvent(scope.row)"
        >{{ scope.row[item.prop] }}</span>
        <!--@input 处理逻辑 如果传了item.onInput函数
        则让该行对应的输入框绑定的值 等于item.onInput函数 返回的值
        若没有传入item.onInput函数
        则让行对应的输入框 绑定的值等于他本身-->
        <el-input
          v-else-if="item.columnType === 'input'"
          v-model="scope.row[item.prop]"
          size="default"
          :disabled="scope.row.disabled"
          :maxlength="item.maxlength ? item.maxlength : ''"
          @input="
            (value) => {
              item.onInput
                ? (scope.row[item.prop] = item.onInput(value, scope.row))
                : (scope.row[item.prop] = scope.row[item.prop]);
            }
          "
          @blur="
            (event) => {
              item.onBlur
                ? (scope.row[item.prop] = item.onBlur(event))
                : (scope.row[item.prop] = scope.row[item.prop]);
            }
          "
          @focus="
            (event) => {
              item.onFocus
                ? (scope.row[item.prop] = item.onFocus(event))
                : (scope.row[item.prop] = scope.row[item.prop]);
            }
          "
        />
        <el-switch
          v-else-if="item.columnType === 'switch'"
          v-model="scope.row[item.prop]"
        />
        <span v-else style="color: #606266">{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="defaultData.tableConfig.tableOption.label"
      :width="
        defaultData.tableConfig.tableOption.width
          ? defaultData.tableConfig.tableOption.width
          : ''
      "
      :label="defaultData.tableConfig.tableOption.label"
      align="center"
      class-name="fixed-width"
      :[defaultData.attrName]="defaultData.tableConfig.tableOption.fixed"
    >
      <template #default="scope">
        <el-button
          v-for="(item, index) in defaultData.tableConfig.tableOption.options"
          :key="index"
          :type="item.type ? item.type : 'text'"
          :icon="item.icon ? item.icon : ''"
          size="small"
          @click="handleButton(item.methods, scope.row)"
          v-html="item.label"
        />
      </template>
    </el-table-column>
  </el-table>
  <div v-if="defaultData.tableConfig.showPager">
    <el-pagination
      v-if="defaultData.tableConfig.pager.total > 0"
      :current-page="defaultData.tableConfig.pager.currentPage"
      :page-size="defaultData.tableConfig.pager.pageSize"
      :page-sizes="defaultData.tableConfig.pager.pageSizes"
      :total="defaultData.tableConfig.pager.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- <el-transfer
    v-model="value"
    :data="defaultData.tableConfig.tableHeader"
  /> -->
  <TableTransfer
    :table-transfer-configuration="tableTransferConfiguration"
    @closeDialogVisible="closeDialogVisible"
    @setTableHeader="setTableHeader"
  />
</template>

<script>
export default {
  name: "TableComponent",
};
</script>

<script setup>
import { reactive, computed, watch, onMounted, ref } from "vue";
import { Refresh, ScaleToOriginal, Search } from "@element-plus/icons-vue";
import TableTransfer from "@/components/TableComponent/tableTransfer";
// eslint-disable-next-line no-undef
const emit = defineEmits(["getUnitValue","refreshTable","revealingSearch","clickOperationTableButton","getSelectTableData"]);
// 当前组建的默认参数
let defaultData = reactive({
  attrName: "fixed",
  showOverflowTooltip: true,
  // 查询条件显示隐藏
  revealingSearch:true,
  tableConfig: {
    tableHeight: "82%",
    // 表格数据
    tableData: [],
    // 表格上方按钮
    tableButtonList: [],
    // 是否展示单位切换
    isShowUnitHandoff: false,
    // 单位
    unit: "",
    // 单位下拉框选项
    unitHandoffOptions: [],
    // 表头
    // label信息
    tableHeader: [
      // {
      //   label: '单据编号',
      //   prop: 'docNo',
      //   width: 220,//单元格宽度
      //   minWidth:'',单元格最小宽度
      //   columnType:'input' ,// 列展示为输入框
      //   clickEvent:function() { //列可以点击
      //
      //   }
      // },
    ],
    // 操作列数据
    tableOption: {},
    // 是否展示表格左上方按钮
    isShowQueryTermsButton:true,
    queryTermsButton: {
      // 是否展示表格左上方显隐列按钮
      isShowRevealingButton:true,
      // 是否展示表格左上方刷新按钮
      isShowRefreshButton:true,
      // 是否展示表格左上方显示隐藏查询条件按钮
      isShowRevealingSearchButton:true
    },
    // 是否显示复选框
    showSelection: true,
    // 是否固定复选框列
    fixedFirstColumn: false,
    //是否显示单选
    showRadio: false,
    // 单选框默认选中
    radioInit: "",
    // 是否显示序号
    showSerialNumber: true,
    // 后端计算合计
    backendTotal: false,
    // 前端计算合计 （与showSummaryColumns和calculateTheTotal配套使用）
    frontEndTotal: false,
    // 显示合计的列
    showSummaryColumns: [],
    // 自定义计算合计
    calculateTheTotal: function () {},
    //是否展示分页
    showPager: true,
    // 分页信息
    pager: {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [5, 10, 15, 20],
    },
  },
});
let tableTransferConfiguration = reactive({
  tableTransferData: defaultData.tableConfig.tableHeader,
  isShowTableTransfer: false,
});
let selectData = ref([])
// 接收父组件传递过来的参数
// eslint-disable-next-line no-undef
let props = defineProps({
  tableConfig: {},
});
// 计算属性 动态计算表格高度
let adaptTableHeight = computed(() => {
  let tableHeight = defaultData.tableConfig.tableHeight;
  const pxIdx = tableHeight.indexOf("px");
  if (typeof tableHeight === "string" && tableHeight.indexOf("px") > -1) {
    tableHeight = tableHeight.slice(0, pxIdx);
    return tableHeight <= 300 ? 300 : tableHeight;
  } else if (tableHeight.indexOf("%") > -1) {
    return tableHeight;
  } else {
    return tableHeight;
  }
});
/**
 * @description: 传入的表格的值与组件中绑定的表格值同步
 * @author: hqp
 */
const synchronizeObjects = () => {
  // defaultData.tableConfig = { ...props.tableConfig };
  defaultData.tableConfig = Object.assign(
    {},
    defaultData.tableConfig,
    props.tableConfig
  );
  // props.formConfig.formList.forEach((item) => {
  //   // this.$set(item, item.code, defaultData.formData[item.code]);
  //   item[item.code] = defaultData.formData[item.code];
  // });
};
// 计算属性 单选表格单选绑定的值
let radioInit = computed(() => {
  return defaultData.tableConfig.radioInit;
});
/**
 * @description: 自定义序号列 （后端计算合计）
 * @param {String} index 序号
 * @return:
 * @example：
 */
let customSerialNumber = (index) => {
  // 后端计算合计 合计数据在返回数据的最后一条 改变最后一条序号列为合计
  let tableDataLength = defaultData.tableConfig.tableData.length;
  return defaultData.tableConfig.backendTotal && tableDataLength == index + 1
    ? "合计"
    : index + 1;
};
/**
 * @description: 自定义计算合计列 （前端计算合计）
 * @param {type}
 * @return:
 * @example：
 */
let getSummaries = (param) => {
  return defaultData.tableConfig.calculateTheTotal(param);

  // 举例 在父组件中自定义的的计算函数
  // calculateTheTotal(param) {
  //   const { columns, data } = param;
  //   const sums = [];
  //   //需要计算合计的列
  //   const calculateColumns = ['payAmt', 'paidAmt', 'noRepayAmt', 'within90d', 'between90dAnd180d',
  //     'between180dAnd1y', 'between1yAnd2y', 'between2yAnd3y', 'moreThan3y']
  //   columns.forEach((column, index) => {
  //     //定义合计行的第一列
  //     if (index === 0) {
  //       sums[index] = '合计';
  //       return;
  //     }
  //
  //     calculateColumns.forEach(items=>{
  //       if(column.property===items){
  //         const values = data.map(item => formatNumberBack(item[column.property]));
  //         if (!values.every(value => isNaN(value))) {
  //           sums[index] = values.reduce((prev, curr) => {
  //             const value = Number(curr);
  //             if (!isNaN(value)) {
  //               return prev + Number(curr);
  //             } else {
  //               return prev;
  //             }
  //           }, 0);
  //           sums[index] = formatNumber(sums[index]);
  //         } else {
  //           sums[index] = 'N/A';
  //         }
  //       }
  //     })
  //
  //
  //   });
  //
  //   return sums;
  // }
};
/**
* @description: 点击操作表格按钮（左上方按钮）
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let clickOperationTableButton = (data)=>{
  emit("clickOperationTableButton", data);
}
let changeUnit = () => {
  emit("getUnitValue", { unit:defaultData.tableConfig.unit, tableHeader:defaultData.tableConfig.tableHeader});
};
let handleCurrentChange1 = (val) => {
  console.log(val);
  // TODO 待确认此处是干嘛用的
  // this.currentRow = val;
};

/**
 * @description: 获取表格选中数据
 * @param {type}
 * @return:
 * @example：
 */
let selectTableData = (selection, row) => {
  selectData.value = selection
  isButtonDisabled()
  emit("getSelectTableData", selection);
};
/**
 * @description: 全选表格数据
 * @param {type}
 * @return:
 * @example：
 */
let selectAllTableData = (selection) => {
  selectData.value = selection
  isButtonDisabled()
  emit("getSelectTableData", selection);
};
/**
* @description: 修改删除按钮是否可用
* @param {type}
* @author:hqp
* @return:
* @example：
*/
let isButtonDisabled = (data) =>{
  if(selectData.value.length===0){
    defaultData.tableConfig.tableButtonList.forEach(item=>{
      if(item.code==='edit'||item.code==='delete'){
        item.isDisabled = true
      }
    })
  }else if(selectData.value.length>1){
    defaultData.tableConfig.tableButtonList.forEach(item=>{
      if(item.code==='delete'){
        item.isDisabled = false
      }
      if(item.code==='edit'){
        item.isDisabled = true
      }
    })
  } else{
    defaultData.tableConfig.tableButtonList.forEach(item=>{
      if(item.code==='edit'||item.code==='delete'){
        item.isDisabled = false
      }
    })
  }
}


/**
 * @description: 获取单选选中的行数据
 * @param {type}
 * @return:
 * @example：
 */
let getRadioRow = (index, row) => {
  // eslint-disable-next-line no-undef
  const emit = defineEmits(["getRadioRowData"]);
  row.indexs = index;
  emit("getRadioRowData", row);
};
/**
 * @description: 触发自定义按钮操作
 * @param {type}
 * @return:
 * @example：
 */
let handleButton = (method, row) => {
  // eslint-disable-next-line no-undef
  const emit = defineEmits(["handleButton"]);
  emit("handleButton", method, row);
};
/**
 * @description: size发生变化时，令currentPgae为1，并发送自定义事件
 * @param {type}
 * @return:
 * @example：
 */
let handleSizeChange = (val) => {
  // eslint-disable-next-line no-undef
  const emit = defineEmits(["handleSizeChange"]);
  emit("handleSizeChange", val);
};
/**
 * @description: currentPage发生变化时，发送自定义事件
 * @param {type}
 * @return:
 * @example：
 */
let handleCurrentChange = (val) => {
  // eslint-disable-next-line no-undef
  const emit = defineEmits(["pagination"]);
  emit("pagination", val);
};
/**
 * @description: 点击刷新按钮
 * @return {*}
 * @author: hqp
 */
let clickRefresh = ()=>{
  selectData.value = []
  emit("refreshTable",defaultData.tableConfig.tableHeader);
}
/**
 * @description: 点击 显/隐查询条件 按钮
 * @return {*}
 * @author: hqp
 */
 let clickRevealingSearch = ()=>{
  defaultData.revealingSearch = !defaultData.revealingSearch
  emit("revealingSearch",defaultData.revealingSearch);
 }
/**
 * @description: 显示/隐藏按钮点击事件
 * @return {*}
 * @author: hqp
 */
let clickRevealing = () => {
  tableTransferConfiguration.tableTransferData = tableTransferConfiguration
    .tableTransferData.length
    ? tableTransferConfiguration.tableTransferData
    : defaultData.tableConfig.tableHeader;
  tableTransferConfiguration.isShowTableTransfer = true;
};
/**
 * @description: 显示/隐藏弹窗关闭
 * @param {Boolean} data 关闭弹窗
 * @return {*}
 * @author: hqp
 */
let closeDialogVisible = (data) => {
  tableTransferConfiguration.isShowTableTransfer = data;
};
/**
 * @description: 显示隐藏弹窗 设置后 根据显示隐藏重新设置表格表头展示
 * @param {Array} data 表头数据
 * @return {*}
 * @author: hqp
 */
let setTableHeader = (data) => {
  defaultData.tableConfig.tableHeader = data;
};
onMounted(() => {
  //此处调用是为解决 页签关闭后再次进入该页签时 不触发watch 表格不渲染问题
  // 只在此处调用 watch中不调用的话 数据请求回来后 数据不渲染
  synchronizeObjects();
  isButtonDisabled([])
});
watch(
  () => props.tableConfig,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
    synchronizeObjects();
  },
  { deep: true }
);
watch(
  () => props.tableConfig.tableData,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
    selectData.value = []
    isButtonDisabled()
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.class-button-container {
  width: 100%;
  display: flex;
  padding-bottom: 10px;
}

.el-table .success-row {
  color: red !important;
}

//elementUI 切换table后 el_table 固定列下方多了一条线
:deep(.el-table .el-table__fixed) {
  height: 100% !important; //设置高优先，以覆盖内联样式
}

.el-pagination {
  margin-top: 10px;
  justify-content: end;
}

.class-unit-label {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.class-table-function-button-group{
  display: flex;
  flex-direction: row-reverse;
  .el-button{
    margin:0 5px 0 5px;
  }
}
</style>
