<template>
  <div id="app">
    <keep-alive exclude="detail,payorder,confirm,addressEdit">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/contents/mainTabBar";

export default {
  name: "App",
  data() {
    return {
      columns: ["zz", "z2", "2ss"],
    };
  },
  components: {
    MainTabBar,
  },
};
</script>
<style lang="scss">
@import "assets/css/base.css";
#app {
  font-size: 16px; //这个是作为没有设置字体大小时候的字体,不然由于适配会导致没设置字体的元素用了字体 会将适配字体大小用到 导致字体很大
}
img {
  margin-top: 0 !important;
}
</style>
