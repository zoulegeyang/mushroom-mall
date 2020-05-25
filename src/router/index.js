import Vue from "vue";
import VueRouter from "vue-router";

// const shopcart=()=>import shopcart from ""
// 注意这里导入时候和普通的es6写法的区别
const Shopcart = () => import("../views/shopcart/Shopcart");
const Category = () => import("../views/category/Category");
const Home = () => import("../views/home/Home");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");
const Login = () => import("../views/login/Login");
const Edit = () => import("../views/edit/Edit");
const ConfirmOrder = () => import("../views/confirmOrder/ConfirmOrder");
const PayOrder = () => import("../views/payOrder/PayOrder");
const Order = () => import("../views/order/Order");
const test = () => import("../views/test./test");
const Evaluate = () => import("../views/evaluate/Evaluate");
const Address = () => import("../views/address/Address");
const AddressEdit = () => import("../views/address/childeren/AddressEdit");
// 1.安装插件
Vue.use(VueRouter);

// 2.创建router
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/shopcart",
    component: Shopcart,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/edit",
    component: Edit,
  },
  {
    path: "/confirm",
    component: ConfirmOrder,
  },
  {
    path: "/payOrder",
    component: PayOrder,
  },
  {
    path: "/order",
    component: Order,
  },
  {
    path: "/test",
    component: test,
  },
  {
    path: "/evaluate",
    component: Evaluate,
  },
  {
    path: "/address",
    component: Address,
  },
  {
    path: "/editAddress",
    component: AddressEdit,
  },
];
const router = new VueRouter({
  routes,
  mode: "hash",
});
// 若想进入编辑页面需要先登录
let whiteItems = [
  "/home",
  "/category",
  "/detail/:iid",
  "/shopcart",
  "/profile",
  "/login",
]; // 无需登录的白名单
router.beforeEach((to, from, next) => {
  // 必须要有token 才放行

  // if (to.path != "/home" || "/category") {
  //   if (sessionStorage.getItem("token")) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // } else {
  //   next(); // 这个必须写 不然其它正常页面无法访问
  // }
  let iscross = whiteItems.some((item) => item == to.path);
  if (iscross) {
    next();
  } else {
    // 有token 才放行
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
