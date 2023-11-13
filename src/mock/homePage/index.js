// login.js
import Mock from "mockjs";
// /api/login
Mock.mock("/bohan/api/fetchMenuList", "post", option => {
  console.log(option);
  console.log(JSON.parse(option.body));
  return Mock.mock({
    "code": 200,
    "status": {
      "code": "000000"
    },
    "result": {
      "headerMenuList": [
        {
          id: 1,
          name: "博函",
          path: "/bohan",
          icon: "",
          children: []
        }
      ],
      "saidMenuList": [
        {
          id: 1,
          menuName: "首页",
          path: "/homePage",
          icon: "House",
          children: []
        }, {
          id: 2,
          menuName: "系统管理",
          path: "/bohan/system",
          icon: "Setting",
          children: [
            {
              id: 3,
              menuName: "用户管理",
              path: "/bohan/system/user",
              icon: "User",
              children: []
            },
            {
              id: 4,
              menuName: "角色管理",
              path: "/bohan/system/role",
              icon: "Avatar",
              children: []
            },
            {
              id: 5,
              menuName: "菜单管理",
              path: "/bohan/system/menu",
              icon: "Operation",
              children: []
            },
            {
              id: 6,
              menuName: "部门管理",
              path: "/bohan/system/dept",
              icon: "ScaleToOriginal",
              children: []
            },
            {
              id: 7,
              menuName: "岗位管理",
              path: "/bohan/system/post",
              icon: "Notebook",
              children: []
            },
            {
              id: 8,
              menuName: "字典管理",
              path: "/bohan/system/dict",
              icon: "Memo",
              children: []
            }
          ]
        }
      ]
    }
  });
});
Mock.mock("/bohan/api/homePage/queryHomePageTable", "post", option => {
  console.log(option);
  console.log(JSON.parse(option.body));
  return Mock.mock({
    "code": 200,
    "status": {
      "code": "000000"
    },
    "result": {
      "total":5,
      "currentPage":1,
      "tableData": [
        {
          // ID
          "id": 1,
          // 用户名称
          "userName": "@cname",
          // 用户昵称
          "userNickname": "@cname",
          // 手机号
          "mobilePhoneNumber": /1\d{10}/,
          // 邮箱
          "email": /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
          // 是否启用 编码
          "whetherItIsEnabledCode|0-1": 0, //(0:否 1：是)
          // 是否启用 名称
          "whetherItIsEnabledName": function() {
            if (this.whetherItIsEnabledCode === 0) {
              return "否";
            } else {
              return "是";
            }
          }, //(0:否 1：是)
          // 是否开启
          "whetherOpen|1": true,
          // 创建时间
          "creationTime": "@date('yyyy-MM-dd') @time('HH:mm:ss')"
        },{
          // ID
          "id": 2,
          // 用户名称
          "userName": "@cname",
          // 用户昵称
          "userNickname": "@cname",
          // 手机号
          "mobilePhoneNumber": /1\d{10}/,
          // 邮箱
          "email": /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
          // 是否启用 编码
          "whetherItIsEnabledCode|0-1": 0, //(0:否 1：是)
          // 是否启用 名称
          "whetherItIsEnabledName": function() {
            if (this.whetherItIsEnabledCode === 0) {
              return "否";
            } else {
              return "是";
            }
          }, //(0:否 1：是)
          // 是否开启
          "whetherOpen|1": true,
          // 创建时间
          "creationTime": "@date('yyyy-MM-dd') @time('HH:mm:ss')"
        },{
          // ID
          "id": 3,
          // 用户名称
          "userName": "@cname",
          // 用户昵称
          "userNickname": "@cname",
          // 手机号
          "mobilePhoneNumber": /1\d{10}/,
          // 邮箱
          "email": /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
          // 是否启用 编码
          "whetherItIsEnabledCode|0-1": 0, //(0:否 1：是)
          // 是否启用 名称
          "whetherItIsEnabledName": function() {
            if (this.whetherItIsEnabledCode === 0) {
              return "否";
            } else {
              return "是";
            }
          }, //(0:否 1：是)
          // 是否开启
          "whetherOpen|1": true,
          // 创建时间
          "creationTime": "@date('yyyy-MM-dd') @time('HH:mm:ss')"
        },{
          // ID
          "id": 4,
          // 用户名称
          "userName": "@cname",
          // 用户昵称
          "userNickname": "@cname",
          // 手机号
          "mobilePhoneNumber": /1\d{10}/,
          // 邮箱
          "email": /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
          // 是否启用 编码
          "whetherItIsEnabledCode|0-1": 0, //(0:否 1：是)
          // 是否启用 名称
          "whetherItIsEnabledName": function() {
            if (this.whetherItIsEnabledCode === 0) {
              return "否";
            } else {
              return "是";
            }
          }, //(0:否 1：是)
          // 是否开启
          "whetherOpen|1": true,
          // 创建时间
          "creationTime": "@date('yyyy-MM-dd') @time('HH:mm:ss')"
        },{
          // ID
          "id": 5,
          // 用户名称
          "userName": "@cname",
          // 用户昵称
          "userNickname": "@cname",
          // 手机号
          "mobilePhoneNumber": /1\d{10}/,
          // 邮箱
          "email": /[a-z]{2,6}@(126|163|qq)\.(com|cn|net)/,
          // 是否启用 编码
          "whetherItIsEnabledCode|0-1": 0, //(0:否 1：是)
          // 是否启用 名称
          "whetherItIsEnabledName": function() {
            if (this.whetherItIsEnabledCode === 0) {
              return "否";
            } else {
              return "是";
            }
          }, //(0:否 1：是)
          // 是否开启
          "whetherOpen|1": true,
          // 创建时间
          "creationTime": "@date('yyyy-MM-dd') @time('HH:mm:ss')"
        }
      ]
    }
  });
});


// 模板
// Mock.mock("/bohan/api/fetchTableData", "post", option=>{
//   console.log(option);
//   console.log(JSON.parse(option.body));
//   return Mock.mock({
//     "code": 200,
//     "status": {
//       "code": "000000"
//     },
//     "result": {
//
//     }
//   });
// })

