<template>
  <el-scrollbar>
    <el-menu
      :default-active="menuListConfig.menuDefaultActive"
      :router="menuListConfig.menuRouter"
      :background-color="menuListConfig.menuBackgroundColor"
      :text-color="menuListConfig.menuTextColor"
      :active-text-color="menuListConfig.menuActiveTextColor"
      :mode="menuListConfig.mode"
      :collapse="menuListConfig.isCollapse"
      @open="menuOpen"
      @close="menuClose"
    >
      <MenuItem :menuList="menuListConfig.menuList"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>

// import MenuIcon from "./menuIcon.vue";
export default {
  name: "Menu"
};
</script>
<script setup>
import MenuItem from "@components/Menu/menuItem.vue";
import { defineProps } from "vue";

defineProps({
  menuListConfig: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
// eslint-disable-next-line no-undef
let emit = defineEmits(["menuOpen","menuClose"])
/**
* @description: 菜单打开的回调函数
* @param {type}
* @author:hqp
*/
let menuOpen = () => {
  emit("menuOpen");
};
/**
* @description: 菜单关闭的回调函数
* @param {type}
* @author:hqp
*/
let menuClose = () => {
  emit("menuClose");
};
</script>
<style lang="scss" scoped>
.el-menu{
  padding-bottom: 30px;
}
</style>
