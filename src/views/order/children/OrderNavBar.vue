<template>
  <div class="nav-bar">
    <div class="left">
      <div class="warpper" @click="$router.push('/profile')">
        <i class="iconfont icon-fanhui1"></i>
      </div>
    </div>
    <div class="center">
      {{ title }}
    </div>
    <div class="right" v-if="isShow">
      <i class="iconfont icon-sousuo right"></i>
      <i class="iconfont icon-xiaoxi right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    isShow: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 999;
  display: flex;
  text-align: center;
  height: 44px;
  background: linear-gradient(70deg, red, #f08899);
  line-height: 44px;
  color: white;
  .left,
  .right,
  .center {
    display: flex;
    flex: 3;
    i {
      font-size: 18px;
    }
  }
  .right {
    justify-content: space-evenly;
  }
  .center {
    justify-content: center;
  }
  .left {
    i {
      margin-left: 10px;
    }
  }
}
.warpper {
  width: 50px;
}
</style>
