<template>
  <div class="profile">
    <div class="nav">蘑菇街商城</div>
    <bscroll class="scroll" ref="scroll">
      <user-info></user-info>
      <treasure :treasure="treasure"></treasure>
      <grid></grid>
      <profile-shop-cart></profile-shop-cart>
      <div class="wrap">
        <order></order>
        <utils></utils>
      </div>
    </bscroll>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserInfo from "./children/UserInfo";
import Treasure from "./children/Treasure";
import Grid from "./children/Grid";
import ProfileShopCart from "./children/ProfileShopCart";
import Order from "./children/Order";
import Utils from "./children/Utils";

import Bscroll from "components/common/bscroll/Bscroll";

export default {
  name: "Profile",
  data() {
    return {
      treasure: {
        balance: 122.1,
        discount: 1,
        credit: 100,
      },
    };
  },
  methods: {
    ...mapActions(["userKeeper"]),
  },
  mounted() {
    this.$http.get("empty").then((res) => {
      this.userKeeper(res.data.userInfo);
      sessionStorage.setItem("token", res.data.token);
    });
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  components: {
    UserInfo,
    Treasure,
    Grid,
    ProfileShopCart,
    Order,
    Utils,
    Bscroll,
  },
};
</script>

<style>
.profile {
  height: 100vh;
}
.nav {
  width: 100%;
  color: #fff;
  background-color: #f08899;
  height: 46px !important;
  line-height: 46px !important;
  text-align: center;
  font-weight: bold;
  position: fixed;
}
.wrap {
  background-color: #eee;
  padding: 5px;
}
.scroll {
  position: absolute;
  top: 42px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
