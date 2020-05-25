<template>
  <div class="post">
    <div class="top">
      <div class="left"><i class="iconfont icon-wuliu"></i>物流服务评价</div>
      <div class="right">满意请给5星哦</div>
    </div>
    <div class="main">
      <div class="item">
        <div>商品符合度</div>
        <van-rate v-model="first" gutter="10" />
      </div>
      <div class="item">
        <div>店家服务态度</div>
        <van-rate v-model="second" gutter="10" />
      </div>
      <div class="item">
        <div>快递配送速度</div>
        <van-rate v-model="third" gutter="10" />
      </div>
      <div class="item">
        <div>快递员服务</div>
        <van-rate v-model="fourth" gutter="10" />
      </div>
      <div class="item">
        <div>快递包装</div>
        <van-rate v-model="five" gutter="10" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      five: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.post {
  background-color: #fff;
  // height: 400px;
}
.top {
  height: 40px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    // flex: 3;
    // font-size: 14px;
    // color: #eee;
    padding: 0 10px;
    i {
      margin-right: 5px;
    }
  }
  .right {
    font-size: 14px;
    color: #aaaaaa;
  }
}
.item {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  div {
    flex: 4;
    margin-left: 20px;
    padding: 0 0 0 20px;
  }
  :last-child {
    flex: 8;
  }
}
</style>
