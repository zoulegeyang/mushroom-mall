<template>
  <van-popup
    position="bottom"
    v-model="show"
    class="popUp"
    closeable
    round
    v-if="product"
  >
    <!--  上面的v-if写上去是因为 父组件是通过条件来传递这个值的 不会一上来就给值 所以需要判断是否有值 -->
    <div class="top">
      <div class="imgae">
        <img :src="product.goods[0].image" />
      </div>
      <div class="right">
        <div>
          $<span>{{ product.goods[0].price }}</span>
        </div>
      </div>
    </div>

    <div class="desc">
      <span class="firstdesc">颜色</span>
      <div class="tags">
        <van-button
          :color="currentIndex == 0 ? 'red' : '#eee'"
          round
          size="small"
          :plain="currentIndex == 0"
          @click="currentIndex = 0"
          class="button"
          ><span :class="{ span: currentIndex != 0 }">红色</span></van-button
        >
        <van-button
          :color="currentIndex == 1 ? 'red' : '#eee'"
          round
          size="small"
          :plain="currentIndex == 1"
          @click="currentIndex = 1"
          class="button"
          ><span :class="{ span: currentIndex != 1 }">蓝色</span></van-button
        >
        <van-button
          :color="currentIndex == 2 ? 'red' : '#eee'"
          round
          size="small"
          :plain="currentIndex == 2"
          @click="currentIndex = 2"
          class="button"
          ><span :class="{ span: currentIndex != 2 }">黄色</span></van-button
        >
        <van-button
          :color="currentIndex == 3 ? 'red' : '#eee'"
          round
          size="small"
          :plain="currentIndex == 3"
          @click="currentIndex = 3"
          class="button"
          ><span :class="{ span: currentIndex != 3 }">绿色</span></van-button
        >
      </div>
    </div>
    <div class="desc">
      <span class="firstdesc">版本</span>
      <div class="tags">
        <van-button
          :color="secondcurrentIndex == 0 ? 'red' : '#eee'"
          round
          size="small"
          :plain="secondcurrentIndex == 0"
          @click="secondcurrentIndex = 0"
          class="button"
          ><span :class="{ span: secondcurrentIndex != 0 }"
            >普通款</span
          ></van-button
        >
        <van-button
          :color="secondcurrentIndex == 1 ? 'red' : '#eee'"
          round
          size="small"
          :plain="secondcurrentIndex == 1"
          @click="secondcurrentIndex = 1"
          class="button"
          ><span :class="{ span: secondcurrentIndex != 1 }"
            >便携款</span
          ></van-button
        >
      </div>
    </div>

    <div class="num desc">
      <span class="firstdesc">数量</span>
      <van-stepper v-model="num"></van-stepper>
    </div>
    <div class="bottom">
      <van-button color="red" round block @click="submit">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      currentIndex: -1,
      secondcurrentIndex: -1,
      num: 1,
    };
  },
  methods: {
    submit() {
      let goods = this.product;
      goods.goods[0].count = this.num;
      this.$router.push({ path: "/confirm", query: goods });
    },
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.popUp {
  height: 500px;
  background-color: #fff;
  .top {
    position: relative;
    top: 20px;
    height: 140px;
    // background-color: pink;
    display: flex;
    align-items: center;
    padding: 20px;
    .imgae {
      margin: 0 20px;
      width: 70px;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .right {
      align-self: flex-end;
      font-size: 12px;
      color: red;
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
.tags {
  margin-top: 10px;
}
.button {
  margin-left: 20px;
  .span {
    color: black;
  }
}
.desc {
  margin-top: 30px;
  .firstdesc {
    font-size: 14px;
    margin-left: 20px;
  }
}
.num {
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom {
  position: fixed;
  width: 100%;
  bottom: 10px;
}
</style>
