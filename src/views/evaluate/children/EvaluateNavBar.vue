<template>
  <div class="nav-bar">
    <div class="left" @click="$router.go(-1)">
      <div class="wrapper">
        <i class="iconfont icon-fanhui1"></i>
      </div>
    </div>
    <div class="center">
      {{ title }}
    </div>

    <div class="right" @click="submit" v-if="isDefault">提交</div>
    <div class="right" v-else></div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
  props: {
    title: {
      type: String,
      default() {
        return "评价晒单";
      },
    },
    isDefault: {
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
  position: relative;
  z-index: 10;
  display: flex;
  text-align: center;
  height: 44px;
  background: linear-gradient(70deg, red, #f08899);
  line-height: 44px;
  color: white;
  align-items: center;
  justify-content: space-around;
  .left,
  .right {
    flex: 3;
  }
  .center {
    flex: 8;
  }
}
</style>
