// login.js
import Mock from "mockjs";
// /api/login
Mock.mock("/bohan/api/system/user/initUser", "post", option => {
  console.log(option);
  console.log(JSON.parse(option.body));
  return Mock.mock({
    "code": 200,
    "status": {
      "code": "000000"
    },
    "result": {}
  });
});

Mock.mock("/bohan/api/system/user/queryUserTable", "post", option => {
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
