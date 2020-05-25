// for (let i of ['11','22']) {
//   console.log(i)
// }]
// let a = 5;
// const obj = {
//   zz: a > 5 ? 4 : 6,
// };
// console.log(obj);
// let array = [
//   { ii: 1, status: "zz" },
//   { ii: 3, status: "z2" },
// ];

// // map 会在原数组上改值 但是 返回的只是改过后的数组
// let newarr = array.map((item) => {
//   return (item.tt = "tt");
// });
// console.log(newarr, array);

// let a = [1, 2, 34, 5];
// console.log(a.reverse());
// let obj1 = [1, 5, 2, 9, 4];

// console.log(
//   obj1.sort(function (a, b) {
//     return a - b;
//   })
// );

// 测试排序 需要 return -1 he 1 不是(false 和true)
// let obj = [
//   {
//     name: "a",
//     value: "1245",
//   },
//   { name: "b", value: "1111" },
//   { name: "c", value: "9463" },
// ];

// obj.sort(function (a, b) {
//   if (a.value < b.value) {
//     return -1;
//   } else {
//     return 1;
//   }
// });

// console.log(obj);

// 测试&& 的赋值

// let a = "";
// let c = 2;
// let b = a && c;
// console.log(b);

// let obj = {
//   dd: c && a,
// };
// console.log(obj.dd);

// a = 1;

// if (a != 1 || 1) {
//   console.log("```");
// } else {
//   console.log("sssss");
// }
// console.log(2 || 1);
let b = "";
a = null || false;
// console.log(a);
// typeof a;
a = 1;
if (typeof a == "string") {
  console.log("1");
} else {
  console.log(typeof a);
}
