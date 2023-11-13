//判断两个对象是否相同（包含绝对相等和他们是否有相同的形状）
export function diffObjectEqual (a, b) {
  if (a === b) { //如果是绝对相等就直接返回true
    return true ;
  }
  //如果不是绝对相等就哦按的他们是否有相同的形状
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {//两个均是对象
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {//如果都是数组
        if(a.length === b.length){//如果长度相等
          return a.every(function (e, i) {//用every和递归来比对a数组和b数组的每个元素，并返回
            return diffObjectEqual(e, b[i])
          })
        }
        //长度都不等直接返回false
        return  false;
      } else if (a instanceof Date && b instanceof Date) {//如果是Date 则直接getTime 比较
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {//对象的比较
        //拿到两个对象的key
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        if(keysA.length === keysB.length){//如果keys相等
          return keysA.every(function (key) {//用every和递归来比对a对象和b对象的每个元素值，并返回
            return diffObjectEqual(a[key], b[key]);
          })
        }
        //长度都不等直接返回false
        return false;
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {//如果都不是对象则按String来处理
    return String(a) === String(b)
  } else {
    return false
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}


// 测试数据
// // 字符
// var str1="abc";
// var str2="abc";
// console.log(diffObjectEqual(str1,str2)) true
//
// //数字
// var num1=12222;
// var num2=12222;
// console.log(diffObjectEqual(num1,num2)) true
//
// //对象
// var obj1={0:'a',1:'b',2:'c'}
// var obj2={0:'a',1:'b',2:'c'}
// console.log(diffObjectEqual(obj1,obj2)) true
//
// //对象嵌套数组
// var obj1={0:'a',1:'b',2:[1,2,3]}
// var obj2={0:'a',1:'b',2:[1,2,3]}
// console.log(diffObjectEqual(obj1,obj2)) true
//
// //类数组
// var a={0:'a',1:'b',2:'c','length':3}
// var b={0:'a',1:'b',2:'c','length':3}
// console.log(diffObjectEqual(a,b)) true
//
// //数组
// var list=[1,2,3,4]
// var list1=[1,2,3,4]
// console.log(diffObjectEqual(list,list1)) true
//
// //数组嵌套
// list=[1,2,3,[6,7]]
// list1=[1,2,3,[6,7]]
// console.log(diffObjectEqual(list,list1)) true
//
// //数组嵌套对象
// list=[1,2,3,{a:'1',b:'7'}]
// list1=[1,2,3,{a:'1',b:'7'}]
// console.log(diffObjectEqual(list,list1)) true
//
// var d1 = new Date();
// var d2 = new Date();
// console.log(diffObjectEqual(d1,d2)) true
//
// var d3 = new Date();
// var d4 ;
// //使用延时来赋值d4
// setTimeout(function(){
//   d4 = new Date();
//   console.log(diffObjectEqual(d3,d4)) false
// },1);
// 除了最后一个时间的，我们用了setTimeout来验证以外，其他的都是通过

// 参考：https://blog.csdn.net/dkm123456/article/details/111591102