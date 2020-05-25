<template>
  <van-swipe
    :autoplay="3000"
    indicator-color="white"
    class="detail-swip"
    :duration="300"
  >
    <van-swipe-item
      v-for="(item, index) in images"
      :key="index"
      class="swip-item"
      ><img :src="item"
    /></van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "detailSwiper",
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-swip {
  height: 260px;
  width: 100%;
}
.swip-item {
  height: 100%;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
