import { createRouter, createWebHashHistory } from "vue-router";
import { fetchMenuList } from "@/api/homePage";
import store from "@/store"

const routes = [
  { path: "/", name: "login" ,component: () => import("@/views/login/index.vue") },
  { path: "/demo", name: "demo", component: () => import("@/demo/index.vue") },
  { path: "/register", name: "register", component: () => import("@/views/register/index.vue") },
  {
    path: "/homePage", name: "homePage",redirect:'/index', component: () => import("@/views/homePage/index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

/**
 * @description: 路由 全局前置守卫
 * @param {Object} to: Route， 即将要进入的目标 路由对象；
 * @param {Object} from: Route，当前导航正要离开的路由；
 * @param {Function} next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
 *               next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
 *               next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 * @author:hqp
 * @return:
 * @example：
 */
let isGetdynamicRouting = false
router.beforeEach(async (to, form, next) => {
  // const store = useStore();
  if(to.path==='/'){
    next()
  }
  let token = sessionStorage.getItem('token')
  //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
  if (!token) {
    next({path:'/'})
  } else {
    // 获取过动态路由
    if(isGetdynamicRouting){
      next()
    }else{
      // 获取菜单路由信息
      const res = await fetchMenuList();
      // 将路由处理为树结构
      let routerTree = formatRouterTree(res)
      // 更新菜单信息
      store.commit("homePage/UPDATE_MENU_LIST",routerTree)
      // 路由添加component懒加载
      let componentRouter = generateRouter(routerTree.saidMenuList)
      // 将处理好的路由添加到homePage的子路由中
      routes.forEach(item=>{
        if(item.path==="/homePage"){
          item.children = componentRouter
        }
      })
      // 添加动态路由
      let allRoutes = [...routes]
      allRoutes.forEach((item) => {
        router.addRoute(item)
      })
      next({...to, replace: true})
      isGetdynamicRouting = true
    }
  }
})
function formatRouterTree(res){
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
  return obj
}
/**
* @description: 将路由格式化为树结构
* @param {Array} datas 要格式化的数据
* @author:hqp
* @return: 格式化后的数据
*/
// function formatRouterTree(datas) {
//   let res = []
//   datas.map(data => {
//     // 筛选出一级和二级路由
//     if (data.routerParentId === null&&data.menuLevel!==1) {
//       res.push(data)
//     } else {
//       recursiveProcessTree(data, res)
//     }
//   })
//   return res
// }
/**
* @description: 递归处理三级及三级以下路由为树结构
* @param {Object} data 三级及三级以下路
* @param {Array} res 子路由
* @author:hqp
*/
// function recursiveProcessTree(data, res) {
//   res.map(item => {
//     if (data.routerParentId === item.id) {
//       if (!item.children) item.children = []
//       item.children.push(data)
//     } else {
//       if (item.children)
//         recursiveProcessTree(data, item.children)
//     }
//   })
// }

/**
* @description: 递归添加路由 component
* @param {Array} userRouters 路由
* @author:hqp
* @return:处理后的路由
*/
function generateRouter(userRouters) {
  let newRouters;
  newRouters = userRouters.map(item => {
      let routes = {}
      routes.path = item.path,
      routes.name = item.name;
      if(item.path==="/homePage"){
        item.redirect = '/index'
      }
      if(item.path==="/index"){
        routes.component = () => import(`@/views/homePage/mainContent.vue`)
      }else if(item.realNode==="1"){
        routes.component = () => import(`@/views${item.path}/index.vue`)
      }
      if (item.children) {
        routes.children = generateRouter(item.children)
      }
    return routes
  });
  return newRouters
}

export default router;
