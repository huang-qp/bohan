<template>
  <!--  将日期控件单独提出来 动态渲染日期组件弹出框内为空白-->
  <el-date-picker
    v-if="props.field.domType==='el-date-picker'"
    v-model="defaultData.formData[props.field.code]"
    :type="props.field.type"
    :placeholder="!props.field.disabled ? props.field.placeholder + props.field.name : ''"
    :disabled-date="(time)=>expireTimeOption(props.field,time)"
    :is-range="props.field.range"
    :format="props.field.format"
    :value-format="props.field.valueFormat"
    :start-placeholder="props.field.startPlaceholder || '开始时间'"
    :end-placeholder="props.field.endPlaceholder || '结束时间'"
    :range-separator="props.field.rangeSeparator"
    :clearable="props.field.clearable"
    @clear="(value) => changeValue(value, props.field)"
    @input="(value) => inputValue(value, props.field)"
    @focus="(event) => inputFocus(event, props.field)"
    @change="(value) => changeValue(value, props.field)"
    @blur="(value) => blurValue(value, props.field)"
  />
  <component
    :is="props.field.domType"
    v-else
    v-model="defaultData.formData[props.field.code]"
    :disabled="props.field.disabled?props.field.disabled:false"
    :type="props.field.type"
    :clearable="props.field.clearable"
    :placeholder="!props.field.disabled ? props.field.placeholder + props.field.name : ''"
    :show-word-limit="props.field.type === 'textarea'"
    :maxlength="props.field.maxLength"
    :editable="props.field.editable"
    :rows="props.field.rows"
    :show-password="props.field.type === 'password'"
    :prefix-icon="props.field.prefixIcon"
    :suffix-icon="props.field.whetherIconClickable ? '' : props.field.suffixIcon"
    :multiple="props.field.multiple"
    :collapse-tags="props.field.collapseTags"
    :filterable="props.field.filterable"
    :multiple-limit="props.field.multipleLimit || 0"
    :is-range="props.field.range"
    :format="props.field.format"
    :value-format="props.field.valueFormat"
    :start-placeholder="props.field.startPlaceholder || '开始时间'"
    :end-placeholder="props.field.endPlaceholder || '结束时间'"
    :range-separator="props.field.rangeSeparator"
    :disabled-date="(time)=>expireTimeOption(props.field,time)"
    @clear="(value) => changeValue(value, props.field)"
    @input="(value) => inputValue(value, props.field)"
    @focus="(event) => inputFocus(event, props.field)"
    @change="(value) => changeValue(value, props.field)"
    @blur="(value) => blurValue(value, props.field)"
  >
    <template #suffix>
      <!--vue2+elenmentui 直接使用尾部图标时 点击图标不会触发输入框的聚焦事件 未解决此问题 所以此处使用尾部图标插槽去解决
          vue3+elementuiplus则不存在该问题 即直接使用尾部图标 点击图标时 也会触发输入框的聚焦事件 vue3+elementuiplus可去掉此处-->
      <el-icon v-if="props.field.whetherIconClickable" @click="(event) => inputFocus(event, props.field)">
        <component :is="props.field.suffixIcon" />
      </el-icon>
      <template v-else-if="props.field.whetherUseCustomSuffixIcon">
        {{
          props.field.customIcon
        }}
      </template>
    </template>

    <template v-if="props.field.whetherUseCustomPrefixIcon" #prefix>
      {{
        props.field.customIcon
      }}
    </template>
    <el-option
      v-for="item in props.field.optionList"
      :key="item.codeValue"
      :label="item.codeDesc"
      :value="item.codeValue"
    />

    <!-- 多选内容 -->
    <el-checkbox
      v-for="(ems, ids) in props.field.multiOptionList"
      :key="ids"
      :label="ems.label"
      :name="props.field.code"
    />

    <!-- 单选内容 -->
    <el-radio
      v-for="(ems, ids) in props.field.singleOptionList"
      :key="ids"
      :label="ems.label"
    >
      {{ ems.name }}
    </el-radio>
    <span v-if="props.field.textDisplay">{{ props.field[props.field.code] }}</span>
  </component>
</template>
<script>
export default {
  name: "FormItemComponents"

};
</script>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { checkMoneyInput, formatMoney, formatMoneyBack } from "@/tool/formatMoney";
// eslint-disable-next-line no-undef
let props = defineProps({
  field: {
    type: Object,
    required: true
  }
});
// eslint-disable-next-line no-undef
let emit = defineEmits(["onInputEvent", "onInputFocus"]);
let defaultData = reactive({
  formData: {},
  inputStatus: true
});

/**
 * @description: 传入的form表单的值于组件中绑定的表单值同步
 * @author: hqp
 */
const synchronizeObjects = () => {
  defaultData.formData = { ...props.field };
  if (defaultData.formData.amountVerification && defaultData.inputStatus) {
    defaultData.formData[defaultData.formData.code] = formatMoney(
      defaultData.formData[defaultData.formData.code]
    );
  }
};

/**
 * @description: form的值改变的时候触发
 * @param {type} value 输入框的值
 * @param {type} item 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
const changeValue = (value, item) => {
  if (item.amountVerification) {
    defaultData.formData[item.code] = value ? value : "";
  }
  // form表单值改变后，将改变后的数据传给父组件
  emit("onInputEvent", defaultData.formData);
};

/**
 * @description:
 * @param {type} value 输入框的值
 * @param {type} item 渲染form表单组件（el-form-item）的配置项
 * @author:hqp
 */
const blurValue = (value, item) => {
  if (item.amountVerification) {
    defaultData.formData[item.code] = formatMoney(defaultData.formData[item.code]);
  }
  // form表单值改变后，将改变后的数据传给父组件
  emit("onInputEvent", defaultData.formData);
};

/**
 * @description:
 * @param {type} value 输入框的值
 * @param {type} item 渲染form表单组件（el-form-item）的配置项
 * @author:hqp
 */
const inputValue = (value, item) => {
  defaultData.inputStatus = false;
  if (item.amountVerification) {
    defaultData.formData[item.code] = checkMoneyInput(
      value,
      item.decimalDigits,
      item.negativeNumber
    );
  }
  // form表单值改变后，将改变后的数据传给父组件
  emit("onInputEvent", defaultData.formData);
};

/**
 * @description: form表单项获取焦点事件
 * @param {Object} event 事件源对象
 * @param {Object} item 渲染form表单组件（el-form-item）的配置项
 * @author: hqp
 */
const inputFocus = (event, item) => {
  if (item.clickToPopUp) {
    emit("onInputFocus", item);
  } else if (item.amountVerification) {
    defaultData.formData[item.code] = formatMoneyBack(item[item.code]);
    emit("onInputFocus", defaultData.formData);
  } else {
    emit("onInputFocus", defaultData.formData);
  }
};

/**
 * @description:日期控件的禁用
 * @param {Object} data 渲染form表单组件（el-form-item）的配置项
 * @author:hqp
 */
const expireTimeOption = (data, time) => {
  if (data.minDate) {
    if (data.maxDate) {
      return (
        time.getTime() <
        new Date(data.minDate).getTime() - 24 * 60 * 60 * 1000 ||
        time.getTime() > new Date(data.maxDate).getTime()
      );
    } else {
      return (
        time.getTime() <
        new Date(data.minDate).getTime() - 24 * 60 * 60 * 1000
      );
    }
  } else if (data.maxDate) {
    return time.getTime() > new Date(data.maxDate).getTime();
  }
};
onMounted(() => {
  synchronizeObjects();
});


watch(() => props.field, (newVal, oldVal) => {
  console.log(newVal);
  console.log(oldVal);
  synchronizeObjects();
}, { deep: true });
</script>
<style lang="scss" scoped>

</style>
