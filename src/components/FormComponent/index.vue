<template>
  <!-- 表单搜索的组件 -->
  <el-row id="id-form-config" ref="formConfig" class="formConfig">
    <el-form
      ref="formRef"
      :model="props.formConfig.formData"
      :rules="props.formConfig.rules"
      :label-position="props.formConfig.styleData.position"
      :style="{ width: props.formConfig.styleData.width }"
      :size="props.formConfig.size || 'default'"
    >
      <!-- 表单内容 -->
      <el-row class="class-form-content" :gutter="20">
        <el-col
          v-for="(item, index) in props.formConfig.formList"
          :key="index"
          :span="item.width || 24"
          :offset="item.offsetWidth || 0"
        >
          <!-- 其他类型传3 -->
          <div v-if="item.mold === 3">
            <slot :name="item.name" :data="item" />
          </div>

          <el-form-item
            v-else
            :label-width="item.labelWidth || '120px'"
            :label="item.name"
            :prop="item.code"
            :class="
              item.mold === 4
                ? props.formConfig.styleData.btnType + ' btn'
                : item.lineHeight
                  ? 'lineHeight'
                  : ''
            "
          >
            <!-- 组件 种类1 -->
            <!--  绑定样式是为了修改时间/日期控件的宽度 style中的样式覆盖不了-->
            <FormItemComponent
              v-if="item.mold === 1"
              :field="item"
              :style="{ width: props.formConfig.styleData.inputSelectWidth }"
              @onInputEvent="onInputEvent"
              @onInputFocus="onInputFocus"
            />
            <!-- 上传 种类2-->
            <el-upload
              v-if="item.mold === 2"
              :action="item.uploadActions"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="
                (file, fileList) => handleRemove(file, fileList, item)
              "
              :before-remove="beforeRemove"
              :on-success="
                (response, file, fileList) =>
                  upLoadSuccess(response, file, fileList, item)
              "
              :data="defaultData.obj"
              :with-credentials="true"
              :multiple="item.multiple || true"
              :limit="item.limit || 10"
              name="multipartFile"
              :on-exceed="handleExceed"
              :file-list="defaultData.formData.fileList"
              :disabled="!item.isShowUploadButton"
            >
              <el-button
                v-if="item.isShowUploadButton"
                :size="item.buttonSize"
                type="primary"
                :disabled="item.disabled"
              >
                {{ item.uploadButtonName }}
              </el-button>
            </el-upload>
            <template v-if="item.mold === 4">
              <el-button
                v-for="(items, indexes) in item.btnList"
                :key="indexes"
                :type="items.type"
                :icon="items.icon"
                :plain="items.plain"
                @click="buttonDebounce(items.code)"
              >
                {{ items.name }}
              </el-button>
            </template>
          </el-form-item>
          <!-- 放大镜组件 -->
          <el-form-item>
            <component
              :is="item.magnifyingGlassName"
              :magnifyingGlassOptions="item"
              @closeDialogVisible="closeDialogVisible"
              @getDialogData="getDialogData"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 按钮 定位 -->
      <el-form-item class="btn" :class="props.formConfig.styleData.btnType">
        <el-button
          v-for="(item, index) in props.formConfig.btnList"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          :plain="item.plain"
          @click="buttonDebounce(item.code)"
        >
          {{ item.name }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: "FormComponent"
};
</script>


<script setup>
import FormItemComponent from "./formItemComponent.vue";
import { debounce } from "@/tool/debounceAndThrottle";
import { onMounted, watch, reactive, ref } from "vue";


// eslint-disable-next-line no-undef
let props = defineProps({
  formConfig: {
    type: Object,
    required: true
  }
});
// eslint-disable-next-line no-undef
let emit = defineEmits([
  "btnClick",
  "onInputEvent",
  "closeDialogVisible",
  "getDialogData",
  "onInputEvent"
]);

const defaultData = reactive({
  //表单绑定的值
  formData: {},
  obj: {}
});

//获取表单
const formRef = ref(props.formConfig.formName);

/**
 * @description: 传入的form表单的值于组件中绑定的表单值同步
 * @author: hqp
 */
const synchronizeObjects = () => {
  defaultData.formData = { ...props.formConfig.formData };
  props.formConfig.formList.forEach((item) => {
    // this.$set(item, item.code, defaultData.formData[item.code]);
    item[item.code] = defaultData.formData[item.code];
  });
};

/**
 * @description:按钮点击事件
 * @param {String} btnCode 按钮的code码
 * @author: hqp
 */
const btnDown = (btnCode) => {
  // 如果按钮是提交或保存类的需要校验表单
  if (btnCode === "submit" || btnCode === "save") {
    formRef.value.validate((valid) => {
      if (valid) {
        emit("btnClick", defaultData.formData, btnCode);
      } else {
        return false;
      }
    });
  } else {
    // 不用校验表单的按钮
    emit("btnClick", defaultData.formData, btnCode);
  }
};
// 按钮防抖
const buttonDebounce = debounce(btnDown, 500, true);
/**
 * @description: 当form表单组件中的值，发生变化时触发 用于父子组件中的formData同步
 * @param {Object} data 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
const onInputEvent = (data) => {
  defaultData.formData[data.code] = data[data.code];
  emit("onInputEvent", defaultData.formData);
};

/**
 * @description: form表单组件输入框获取焦点时触发
 * @param {Object} data 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
const onInputFocus = (data) => {
  if (data.clickToPopUp) {
    props.formConfig.formList.forEach((item) => {
      if (item.code === data.code) {
        // this.$set(item, "isShow", true);
        item["isShow"] = true;
      }
    });
    formInputBlur("id-form-config");
  }
};
/**
 * @description: form表单中的弹窗组件关闭时触发 （一般用于放大镜）
 * @param {*} data 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
const closeDialogVisible = (data) => {
  emit("closeDialogVisible", data);
};

/**
 * @description: 获取form中的弹窗组件的值
 * @param {object} data form表单中的弹窗组件传过来的值 （magnifyingGlassData：弹窗中所用的数据；magnifyingGlassOptions：渲染form表单组件（el-form-item）的配置项）
 * @return {*}
 * @author: hqp
 */
const getDialogData = (data) => {
  emit("getDialogData", data);
};

/**
 * @description: 点击form中的选择器，让光标失焦 兼容IE问题
 * @param {*} parentID 最外层父元素的ID
 * @param {*} inputCls 要失焦的输入框的class
 * @author: hqp
 */
const formInputBlur = (parentID, inputCls = "el-input__inner") => {
  const parentEL = document.getElementById(parentID);
  const elements = parentEL.getElementsByClassName(inputCls);
  const inputArr = Array.prototype.slice.call(elements);
  for (let i = 0; i < inputArr.length; i++) {
    let item = inputArr[i];
    item.blur();
  }
};

/**
 * @description: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
 * @param {Object} file 文件信息
 */
const beforeUpload = (file) => {
  // defaultData.obj.id = "WU_FILE_" + this.count;
  defaultData.obj.name = file.name;
  defaultData.obj.type = file.type;
  defaultData.obj.lastModifiedDate = file.lastModifiedDate;
  defaultData.obj.size = file.size;
  console.log(file);
};

/**
 * @description: 文件列表移除文件时的钩子
 * @param {Object} file 文件信息
 * @param {Array} fileList 文件列表
 */
const handleRemove = (file, fileList, filed) => {
  filed.fileList = fileList;
  defaultData.formData[filed.code] = fileList;
  emit("onInputEvent", defaultData.formData);
  console.log(file, fileList);
};

/**
 * @description: 点击文件列表中已上传的文件时的钩子
 * @param {Object} file 文件信息
 */
const handlePreview = (file) => {
  // downFile(file.attachmentId)
  console.log(file);
};

/**
 * @description: 文件超出个数限制时的钩子
 * @param {Object} file 文件信息
 * @param {Array} fileList 文件列表
 */
const handleExceed = (files, fileList) => {
  this.ElMessage.error(
    `最多可上传${fileList.length}个附件，当前已上传${fileList.length}个`
    // `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
  );
};

/**
 * @description: 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
 * @param {Object} file 文件信息
 * @param {Array} fileList 文件列表
 */
const beforeRemove = (file, fileList) => {
  console.log(fileList);
  return this.ElMessageBox.confirm(`确定移除 ${file.name}？`);
};

/**
 * @description:文件上传成功时的钩子
 * @param {Object} res 后端返回的上传附件接口成功与否信息
 * @param {Object} file 文件信息
 * @param {Array} fileList 文件列表
 */
const upLoadSuccess = (res, file, fileList, filed) => {
  console.log(res);
  console.log(file);
  console.log(fileList);
  console.log(filed);
  if (res.status.statusCode === "000000") {
    filed.fileList = fileList;
    defaultData.formData[filed.code] = fileList;
    emit("onInputEvent", defaultData.formData);
  } else {
    this.ElMessage.error(res.status.statusReason);
  }
};

// eslint-disable-next-line no-undef
defineExpose({
  formRef,
  btnDown
});
onMounted(() => {
  synchronizeObjects();
});
watch(
  () => props.formConfig,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
    synchronizeObjects();
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.formConfig {
  height: 100%;
  width: 100%;

  :deep(.el-form) {
    height: 100%;

    .class-form-content {
      display: flex;
      flex-wrap: wrap;

      .lineHeight {
        .el-form-item__label {
          line-height: 16px;
          padding: 0 8px 0 0;
        }
      }
    }

    .btn {
      width: 100%;
      bottom: 0;
    }

    .btn.center.bottom {
      .el-form-item__content {
        justify-content: center;
      }
    }

    .btn.left.bottom {
      .el-form-item__content {
        justify-content: left;
      }
    }

    .btn.right.bottom {
      .el-form-item__content {
        justify-content: right;
      }
    }
  }
}
</style>
