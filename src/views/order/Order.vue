<template>
  <div class="order">
    <order-nav-bar :title="'评价晒单'" :isShow="true"></order-nav-bar>
    <van-tabs v-model="active" class="tabs" @click="select">
      <van-tab title="全部" class="sticky"> </van-tab>
      <van-tab title="待付款" class="sticky"> </van-tab>
      <van-tab title="待收货" class="sticky"> </van-tab>
      <van-tab title="已完成" class="sticky"></van-tab>
    </van-tabs>
    <Tabs class="tab-content" :active="active" ref="middle"></Tabs>
  </div>
</template>

<script>
import Tabs from "./children/Tabs";
import OrderNavBar from "./children/OrderNavBar";
export default {
  name: "order",
  data() {
    return {
      active: 0,
    };
  },
  components: {
    OrderNavBar,
    Tabs,
  },
  methods: {
    select(ii) {
      this.active = ii;
    },
  },
  activated() {
    let active = this.$route.query.active;
    this.active = active;
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.order {
  position: relative;
  height: 100vh;
}
.tabs {
  position: relative;
  top: 43px;
}
.tab-content {
  position: absolute;
  top: 88px;
  bottom: 0px;
  left: 0;
  right: 0px;
}
</style>
