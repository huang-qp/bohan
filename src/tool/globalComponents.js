// form 表单公共组件
import FormComponent from "@/components/FormComponent";
// table 表格公共组件
import TableComponent from "@/components/TableComponent";
// 查询条件公共组件
import QueryCondition from "@/components/QueryCondition"
// 放大镜
import dialogForm from "@/demo/components/Dialog";
// 当我们需要进行多个组件的注册时候, 假如说都写到main.js里面的话,
// 这样就会造成main.js文件的臃肿与杂乱
export default {
  install(Vue) {
    Vue.component("FormComponent", FormComponent);
    Vue.component("TableComponent", TableComponent);
    Vue.component("QueryCondition", QueryCondition);
    Vue.component("dialogForm", dialogForm);
  },
};
