import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "./assets/css/base.css";
// 注册插件式组件
import toast from "components/common/toast";
import SlideVerify from "vue-monoplasty-slide-verify";
import {
  NavBar,
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Image,
  Tab,
  Tabs,
  Icon,
  Sticky,
  List,
  Uploader,
  Button,
  CellGroup,
  Overlay,
  Cell,
  Swipe,
  SwipeItem,
  Field,
  NumberKeyboard,
  ActionSheet,
  Form,
  Stepper,
  Dialog,
  Picker,
  Popup,
  DatetimePicker,
  Area,
  PasswordInput,
  Loading,
  Rate,
  ImagePreview,
  Tag,
  Switch,
  Empty,
  Lazyload,
} from "vant";
import "vant/lib/index.css";
Vue.use(NavBar)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Grid)
  .use(Overlay)
  .use(SlideVerify)
  .use(Form)
  .use(GridItem)
  .use(Image)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Sticky)
  .use(List)
  .use(Field)
  .use(Uploader)
  .use(Button)
  .use(CellGroup)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(NumberKeyboard)
  .use(ActionSheet)
  .use(Stepper)
  .use(Dialog)
  .use(Picker)
  .use(Popup)
  .use(DatetimePicker)
  .use(Area)
  .use(PasswordInput)
  .use(Loading)
  .use(Rate)
  .use(ImagePreview)
  .use(Tag)
  .use(Switch)
  .use(Empty)
  .use(Lazyload);
// .use(Toast)
Vue.prototype.$ImagePreview = ImagePreview;
Vue.config.productionTip = false;
// 事件总线 用来管理不同组件之间的事件通信
Vue.prototype.$bus = new Vue();
// 还需要安装
Vue.use(toast);

import business from "./network/business";

Vue.prototype.$http = business;

Vue.filter("price", function (value) {
  if (!value) return "";
  value = Number(value);

  // value = value.toString();
  // return value.charAt(0).toUpperCase() + value.slice(1);
  return value.toFixed(2);
});
new Vue({
  router,
  store,
  toast,
  render: (h) => h(App),
}).$mount("#app");
