import BigNumber from "bignumber.js";

/**
 * @description: 金额格式化 金额输入框限制可输入
 * @param {String||Number} num 要转换的金额
 * @param {Number} len 小数位数
 * @param {Boolean} ne 是否允许输入负数
 * @return:
 * @example：
 */
export function checkMoneyInput(num, len = 2, ne = false) {
  if (typeof num === "number") {
    num = num.toString();
  }
  //得到第一个字符是否为负号
  let t = num.charAt(0);
  let allValue = num.replace(/[^\d^.]+/g, "").replace(/,/g, "");
  const dotPos = allValue.indexOf(".");
  const dotValue =
    dotPos > -1 ? "." + allValue.split(".")[1].slice(0, len) : "";
  let judgeValue = allValue.split(".")[0];
  if (judgeValue.length > 16) {
    judgeValue = judgeValue.slice(0, 16);
  }
  if (t == "-" && ne) {
    return "-" + judgeValue + dotValue;
  } else {
    return judgeValue + dotValue;
  }
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */

export function formatMoney(number, decimals = 2, decPoint = ".") {
  if (typeof number === "number" && number === 0) {
    number = "0";
  }
  if (typeof number === "number") {
    number += "";
  }
  if (number && !isNaN(number)) {
    const a = new BigNumber(number);
    let i;
    if (number.includes("+")) {
      i = "+";
    } else {
      i = "";
    }
    return (
      i +
      a
        .toFixed(decimals)
        .replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
          return $1 + ",";
        })
        .replace(/\.$/, "")
    );
  }
  return number;
}

//金额去除千分位
export function formatMoneyBack(amt) {
  if (amt) {
    if (amt == "0.00") {
      return "0";
    } else {
      if (typeof amt === "number") {
        amt += "";
      }
      var money = amt.split(",");
      return money.join("");
    }
  }
}
