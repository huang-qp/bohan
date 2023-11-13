import regularExpression from "./regularExpression"
/**
* @description: 手机号校验
* @param {type}
* @author:hqp
* @return:
* @example：
*/
export function tellPhoneValidation(rule, value, callback){
  let reg = regularExpression.tellphoneReg[0]
  if(!reg.test(value)){
    callback(new Error(regularExpression.tellphoneReg[1]))
  }
}
