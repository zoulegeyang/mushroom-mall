<template>
  <div class="realLike">
    <div class="like">猜你喜欢</div>
    <goods-list :goods="goods" class="goods"></goods-list>
  </div>
</template>

<script>
import goodsList from "components/contents/goods/goodsList";
import { getMultidata, getGoods } from "network/home.js";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    goodsList,
  },
};
</script>

<style scoped lang="scss">
.like {
  background-color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 10px;
  .goods {
    background-color: #fff;
  }
}
.realLike {
  background-color: #fff;
}
</style>
