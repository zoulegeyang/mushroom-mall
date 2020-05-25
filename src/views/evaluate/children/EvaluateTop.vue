<template>
  <div class="top">
    <div class="left">
      <img :src="img" />
    </div>
    <div class="center">
      <div class="title">商品评价</div>
      <div class="warp">
        <van-rate v-model="value" /> <span class="des">一般</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
  props: {
    img: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  height: 120px;
  align-items: center;
  background: #ffff;
  .left {
    height: 100%;
    padding: 10px;
    flex: 5;
    text-align: center;
    img {
      width: 70%;
      height: 100%;
    }
  }
  .center {
    flex: 10;
  }
}
.title {
  margin-bottom: 10px;
  font-size: 14px;
}
.des {
  font-size: 13px;
  margin-left: 10px;
}
.warp {
  display: flex;
  align-items: center;
}
</style>
