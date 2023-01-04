/**
 一、函数的防抖
 函数的防抖是在多少时间后再来执行函数，我们可以理解为这样的一种生活场景（坐升降电梯），
 在点击电梯的开门按钮后，电梯会开门，然后等待一段时间来关门。但是如果在等待的期间，
 有人再次点击开门按钮，那么电梯后继续等待关门时间，直到等待关门时间结束，没有人来
 点击开门按钮后，电梯才会开始工作。
 二、第一次立即执行
 对于有些场景来说，第一次我不需要等待，需要立即执行，例如：打开控制台获取窗口试图大小
 （这里我们需要一直改变窗口的大小，等停下来再次获取窗口视图大小）。
 三、函数防抖使用场景
 在点赞、输入框校验、取消点赞、创建订单等发送网络请求的时候，如果我们连续点击按钮，
 可能会发送多次请求。这个对于后台来说是不允许的。
 在鼠标每次 resize/scroll 触发统计事件。
 */

/**
 * @description: 防抖
 * @param {Function} func 执行函数
 * @param {Number} wait 定时器时间
 * @param {Boolean} immediate 第一次是否立即执行
 * @return:
 * @example：
 */
export function debounce(fun, wait, immediate = false) {
  let timer,
    flag = true
  return (...args) => {
    // 需要立即执行的情况
    if (immediate) {
      if (flag) {
        fun(...args)
        flag = false
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fun(...args)
          flag = true
        }, wait)
      }
    } else {
      // 非立即执行的情况
      clearTimeout(timer)
      timer = setTimeout(() => {
        fun(...args)
      }, wait)
    }
  }
}

/**
 一、函数节流
 与函数防抖的胞兄，函数节流的原理也是大同小异，函数节流是在一定时间内我只会执行一次。
 二、函数节流应用场景
 DOM 元素的拖拽功能实现（mousemove）
 搜索联想（keyup）
 计算鼠标移动的距离（mousemove）
 Canvas 模拟画板功能（mousemove）
 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止
 滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次
 */

/**
 * @description: 节流
 * @param {Function} func 执行函数
 * @param {Number} wait 定时器时间
 * @param {Boolean} immediate 第一次是否立即执行
 * @return:
 * @example：
 */
export function throttle(fun, wait, immediate = false) {
  let flag = true
  return (...args) => {
    if (flag) {
      flag = false
      immediate && fun(...args)
      setTimeout(() => {
        !immediate && fun(...args)
        flag = true
      }, wait)
    }
  }
}
// 参考地址：https://www.jianshu.com/p/66d43d53a82d
