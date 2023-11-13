// login.js
import Mock from "mockjs";
// /api/login
Mock.mock("/bohan/api/login", "post", option => {
  console.log(option);
  console.log(JSON.parse(option.body));
  return Mock.mock({
    "code": 200,
    "status": {
      "code": "000000"
    },
    "result": {
      "token|12": "@string"
    }
  });
});

