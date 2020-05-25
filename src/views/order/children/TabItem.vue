<template>
  <div class="tabitem">
    <div class="top">
      <!-- <div class="title">{{ product.title }}</div> -->
      <div><slot name="status"></slot></div>
    </div>
    <div class="item">
      <div class="img"><img :src="product.image" /></div>
      <div class="middle van-multi-ellipsis--l2">
        {{ product.title }}
      </div>
      <div class="right">
        $ <span>{{ product.price }}</span>
        <div>
          x <span>{{ product.count }}</span>
        </div>
      </div>
    </div>
    <div class="operation">
      <slot name="operation"></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log("22222");
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.tabitem {
  margin-top: 10px;
  background: #fff;
}
.top {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  color: red;
  font-size: 14px;
}
.item {
  height: 120px;
  display: flex;
  align-items: center;
  .img {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    img {
      width: 80%;
    }
  }
  .middle {
    // padding: 10px;
    flex: 8;
    font-size: 16px;
  }
  .right {
    // color: red;
    flex: 3;
    // display: flex;
    text-align: center;
    // justify-content: center;
    font-size: 12px;
    span {
      font-size: 16px;
    }
    div {
      margin-top: 5px;
    }
  }
}
.operation {
  // margin-top: 10px;
  padding: 10px;
}
</style>
