import { fetchMenuList,queryHomePageTable } from "@/api/homePage";
import router from "@/router";

const state = {
  // 头部一级菜单
  headerMenuList: [],
  // 侧边栏二级菜单
  saidMenuList: [],
  // 侧边栏默认激活菜单
  saidMenuDefaultActive: "/index",
  // 导航标签
  navigationTagsList: [
    {
      id: 1,
      menuName: "首页",
      path: "/index",
      icon: "House",
      children: []
    }
  ],
  // 表格数据
  homePageTableData:{
    pager:{}
  }
};
const getters = {
  RETURN_STATE(state){
    return state
  }
};
const mutations = {
  // 更新菜单列表信息
  UPDATE_MENU_LIST(state, data) {
    state.headerMenuList = data.headerMenuList;
    state.saidMenuList = data.saidMenuList;
  },
  // 添加导航标签
  ADD_NAVIGATION_TAGS(state, data) {
    let copyData = {...data}
    // 1.处理是否添加tag
    let isAllowedAdd = state.navigationTagsList.some(item => {
      // 循环navigationTagsList中的每一项与传进来的data做对比是有路由相等的 如果没有 则添加
      return item.path===copyData.path;
    });
    if (!isAllowedAdd) {
      state.navigationTagsList.push(copyData);
    }

    // 2.处理激活样式
    state.navigationTagsList = state.navigationTagsList.map(item=>{
      item.type='info'
      item.closable = true
      if(item.path===copyData.path){
        item.type=''
      }
      if(item.path==="/index"){
        item.closable = false
      }
      return item
    })
    // 路由切换
    router.push(copyData.path);
    // 3.与侧边栏导航联动 切换侧边导航激活状态
    state.saidMenuDefaultActive = copyData.path
  },
  
  // 删除导航标签
  DELETE_NAVIGATION_TAGS(state,data){
    let copyData = {...data}
    // 1.删除标签
    state.navigationTagsList.forEach((item,index)=>{
      if(item.path===copyData.path){
        state.navigationTagsList.splice(index, 1);
      }
    })

    // 2.处理激活样式
    let isAllTagsStatusInfo = state.navigationTagsList.every(item=>{
      return item.type === 'info'
    })
    if(isAllTagsStatusInfo){
      state.navigationTagsList[state.navigationTagsList.length-1]['type'] = ''
      router.push(state.navigationTagsList[state.navigationTagsList.length - 1]['path'])
      // 3.与侧边栏导航联动 切换侧边导航激活状态
      state.saidMenuDefaultActive = state.navigationTagsList[state.navigationTagsList.length - 1]['path']
    }
  },

  // 更新表格数据信息
  UPDATE_HOME_PAGE_TABLE_DATA(state,data){

    state.homePageTableData.tableData = data.tableData
    state.homePageTableData.pager.total = data.total
    state.homePageTableData.pager.currentPage = data.currentPage
  }
};

const actions = {
  // 获取菜单列表
  getMenuList({ commit }, data) {
    fetchMenuList(data).then((res) => {
      let obj = {}
      let headerMenuList = []
      let saidMenuList = []
      res.result.forEach((item)=>{
        // 筛选一级头部导航
        if(item.menuLevel===1){
          item.children = []
          headerMenuList.push(item)
        }else{
          //筛选侧边导航
          saidMenuList.push(item)
        }
      })
      // 使用非递归方式处理为树结构
      // 1、首先创建一个空数组 tree 用于存储树形结构，同时创建一个 Map 对象 map 用于存储每个节点的子节点信息；
      // 2、遍历数组中的每个节点，将其作为 map 中的一个数据项存储。此时每个节点的 children 属性被初始化为空数组；
      // 3、再次遍历 map 中的每个节点。对于每个节点，获取其父节点 ID 并从 map 中查找父节点。如果找到父节点，则将该节点添加为父节点的子节点；否则将该节点添加到根节点数组 tree 中；
      // 4、完成所有节点的处理后，返回 tree 数组作为结果。
      const tree = [];
      const map = new Map();
      saidMenuList.forEach(node => {
        map.set(node.id, { ...node, children: [] });
      });
      map.forEach((node, _, map) => {
        const parentId = node.menuParentId;
        const parent = map.get(parentId);

        if (parent) {
          parent.children.push(node);
        } else {
          tree.push(node);
        }
      });
      obj.headerMenuList = headerMenuList
      obj.saidMenuList = tree
      commit("UPDATE_MENU_LIST", obj);
    });
  },

  // 获取表格数据
  queryTableData({ commit }, data) {
    queryHomePageTable(data).then((res) => {
      commit("UPDATE_HOME_PAGE_TABLE_DATA", res.result);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
