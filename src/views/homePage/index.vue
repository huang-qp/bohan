<template>
  <el-container class="class-container">
    <!--    logo和用户信息-->
    <el-header class="class-user-information">
      <el-row justify="space-between">
        <!--        logo展示-->
        <el-col :span="12" class="class-logo-container">
          <el-row>
            <img class="class-logo" src="@/assets/logo.jpg" alt="">
            <h3 class="class-logo-title">
              博函后台管理系统
            </h3>
          </el-row>
        </el-col>
        <!--        用户信息-->
        <el-col :span="12" class="class-user-information-container">
          <el-row class="class-user-information-detail">
            <!--            头像-->
            <el-col class="class-user-avatar-container" :span="2" :offset="18">
              <el-avatar
                :size="50"
                fit="fill"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              />
            </el-col>
            <!--            用户名称-->
            <el-col class="class-user-name-container" :span="3">
              <el-dropdown
                trigger="click"
                @command="command"
                @visible-change="visibleChange"
              >
                <span class="el-dropdown-link">
                  管理员
                  <el-icon class="el-icon--right">
                    <arrow-up v-if="dropdownIcon" />
                    <arrow-down v-else />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>
                      Action 4
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      Action 5
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <!--    分割线-->
    <el-divider />
    <!--    一级菜单-->
    <el-header class="class-first-level-menu">
      <Menu :menuListConfig="headerMenuListConfig" :mode="'horizontal'" />
    </el-header>
    <!--    分割线-->
    <!--    <el-divider />-->
    <el-container style="height: 0">
      <!--      二级菜单-->
      <el-aside ref="refElAside">
        <div
          class="class-menu-collapses-expands"
          ref="refMenuIsCollapse"
          @click="clickMenuCollapsesExpands"
        >
          <el-icon v-if="saidMenuListConfig.isCollapse" style="font-size: 20px">
            <DArrowRight />
          </el-icon>
          <el-icon v-else style="font-size: 20px">
            <DArrowLeft />
          </el-icon>
        </div>
        <Menu
          :menuListConfig="saidMenuListConfig"
          @menuOpen="menuOpen"
          @menuClose="menuClose"
        />
      </el-aside>
      <el-divider direction="vertical" />
      <!--      展示区域-->
      <el-main>
        <el-scrollbar>
          <!--    分割线-->
          <el-divider />
          <el-scrollbar ref="refTags">
            <div class="class-navigation-tag-container">
              <el-tag
                v-for="item in navigationTagsList"
                :key="item.id"
                :type="item.type"
                class="class-navigation-tag"
                :closable="item.closable"
                @click="clickTag(item)"
                @close="closeTag(item)"
              >
                {{ item.menuName }}
              </el-tag>
            </div>
          </el-scrollbar>
          <!--    分割线-->
          <el-divider />
          <div class="class-content-container">
            <router-view />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import Menu from "@components/Menu/index.vue";
import { reactive, onMounted, computed, ref, nextTick } from "vue";
import { useStore } from "vuex";

const store = useStore();

// 下拉菜单的图标展示
let dropdownIcon = ref(false);

// 顶部导航菜单配置项
let headerMenuListConfig = reactive({
  menuBackgroundColor: "#409EFF",
  menuTextColor: "#fff",
  menuActiveTextColor: "#ffd04b",
  menuDefaultActive: "/bohan",
  mode: "horizontal",
  menuRouter: false,
  //使用计算属性拿值 否则不是响应式 即数据更新 视图不更新（参考：https://blog.csdn.net/song854601134/article/details/127284112）
  menuList: computed(() => store.state.homePage.headerMenuList),
});
// 侧边导航菜单配置项
let saidMenuListConfig = reactive({
  menuBackgroundColor: "",
  menuTextColor: "",
  menuActiveTextColor: "",
  menuDefaultActive: computed(() => store.state.homePage.saidMenuDefaultActive),
  mode: "vertical",
  menuRouter: true,
  menuList: computed(() => store.state.homePage.saidMenuList),
  isCollapse: false,
});
// 导航标签
let navigationTagsList = ref(
  computed(() => store.state.homePage.navigationTagsList)
);
let refTags = ref(null);

// 解决初始化 滚动条不显示问题
setTimeout(() => {
  refTags.value.update();
}, 1000);

/**
 * @description: 下拉菜单菜单项点击的回调
 * @param {type}
 * @author:hqp
 */
let command = (a, b, c) => {
  console.log(a);
  console.log(b);
  console.log(c);
};
/**
 * @description: 下拉菜单展开关闭的回调函数 用于控制下拉菜单右边的箭头展示
 * @param {Boolean} isShow 下拉菜单是否展开
 * @author:hqp
 */
let visibleChange = (isShow) => {
  dropdownIcon.value = isShow;
};
/**
 * @description: 导航标签点击事件
 * @param {type}
 * @author:hqp
 * @return:
 * @example：
 */
let clickTag = (data) => {
  // 调用新增导航标签方法 没有就新增 有就切换
  store.commit("homePage/ADD_NAVIGATION_TAGS", data);
};
/**
 * @description: 导航标签关闭事件
 * @param {type}
 * @author:hqp
 */
let closeTag = (data) => {
  store.commit("homePage/DELETE_NAVIGATION_TAGS", data);
};

let refElAside = ref();
let refMenuIsCollapse = ref();
/**
 * @description: 动态获取侧边栏宽度 菜单初始化以及打开时调用
 * @param {type}
 * @author:hqp
 * @return:
 * @example：
 */
let calculateWidthMenuOpen = () => {
  nextTick(() => {
    // 获取侧边栏的宽度
    let refElAsideWidth = refElAside.value.$el.clientWidth;
    // 给展开关闭dom 赋值样式宽度与侧边栏一致
    refMenuIsCollapse.value.style.width = `${refElAsideWidth}px`;
  });
};
/**
 * @description: 动态获取侧边栏宽度 菜单关闭时调用
 * @param {type}
 * @author:hqp
 */
let calculateWidthMenuClose = () => {
  // 菜单关闭后 在nextTick后 侧边栏宽度依旧会变化 计算是拿变化前的值计算的 因此计算不准确
  setTimeout(() => {
    // 获取侧边栏的宽度
    let refElAsideWidth = refElAside.value.$el.clientWidth;
    // 给展开关闭dom 赋值样式宽度与侧边栏一致
    refMenuIsCollapse.value.style.width = `${refElAsideWidth}px`;
  }, 350);
};
/**
 * @description: 菜单打开的回调函数
 * @param {type}
 * @author:hqp
 */
let menuOpen = () => {
  calculateWidthMenuOpen();
};
/**
 * @description: 菜单关闭的回调函数
 * @param {type}
 * @author:hqp
 */
let menuClose = () => {
  calculateWidthMenuClose();
};

let clickMenuCollapsesExpands = () => {
  saidMenuListConfig.isCollapse = !saidMenuListConfig.isCollapse;
  calculateWidthMenuClose();
};

onMounted(() => {
  calculateWidthMenuOpen();
});
</script>
<style lang="scss" scoped>
.class-container {
  height: 100%;

  .class-user-information {
    display: grid;
    position: relative;
    color: var(--el-text-color-primary);
    padding: 0;

    .class-logo-container {
      color: var(--el-text-color-primary);

      .class-logo {
        width: 80px;
        height: 100%;
        padding-left: 10px;
      }

      .class-logo-title {
        padding-left: 10px;
      }
    }

    .class-user-information-container {
      color: var(--el-text-color-primary);

      .class-user-information-detail {
        height: 100%;
        align-items: center;

        .class-user-avatar-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .class-user-name-container {
          display: flex;
          align-items: center;
          justify-content: center;

          .el-dropdown {
            cursor: pointer;
          }
        }
      }
    }
  }

  .el-divider.el-divider--horizontal {
    margin: 0;
  }

  .class-first-level-menu {
    padding: 0;
    position: relative;
    color: var(--el-text-color-primary);
  }

  .el-container {
    .el-divider {
      height: 100%;
      margin: 0;
    }
  }

  .el-aside {
    color: var(--el-text-color-primary);
    width: auto;

    .class-menu-collapses-expands {
      position: fixed;
      left: 0;
      bottom: 0;
      text-align: center;
      height: 30px;
      line-height: 40px;
      background: white;
      z-index: 10;
      box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.4);
    }
  }

  .el-main {
    padding: 0;
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-5);

    .el-scrollbar {
      .el-scrollbar {
        padding: 5px 20px;

        .class-navigation-tag-container {
          width: 100%;
          display: flex;

          .class-navigation-tag {
            margin: 0px 10px;
          }

          .class-navigation-tag:nth-child(0) {
            margin: 0px;
          }
        }
      }
      .class-content-container {
        padding: 10px;
      }
    }
  }
}
</style>