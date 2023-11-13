/**
 * @description: 构建队列 异步函数顺序执行
 * @param {Array} arr 异步函数数组
 * @return {*}
 * @author: hqp
 */
export function queue(arr) {
    let sequence = Promise.resolve()
    arr.forEach(function (item) {
        sequence = sequence.then(item)
    })
    return sequence
}