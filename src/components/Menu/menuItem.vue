<template>
  <template v-for="(item, index) in menuList">
    <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况情况一：有子集的情况：-->
    <el-sub-menu
      v-if="item.children.length > 0"
      :key="index"
      :index="item.path"
    >
      <template #title>
        <MenuIcon :icon="item.icon" />
        <span>{{ item.menuName }}</span>
      </template>
      <MenuItem :menuList="item.children" />
    </el-sub-menu>
    <!-- 情况二：没子集的情况： -->
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <MenuIcon :icon="item.icon" />
      <template
        #title
      >
        <span>{{ item.menuName }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script>
export default {
  name: "MenuItem",
};
</script>
<script setup>
//注册图标组件
import MenuIcon from "./menuIcon.vue";
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
defineProps({
  menuList: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
let clickMenu = (data) => {
  store.commit("homePage/ADD_NAVIGATION_TAGS", data);
};
</script>
<style lang="scss" scoped>
</style>