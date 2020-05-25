<template>
  <div class="bottom">
    <van-button
      type="danger"
      round
      block
      class="button"
      @click="$router.push('/editAddress')"
    >
      <strong class="strong">+</strong> 新建收货地址
    </van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bottom {
  padding: 5px 50px;
  height: 52px;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  width: 100%;
  display: flex;
  align-items: center;
  .button {
    margin: 0 !important;
  }
}
.strong {
  font-size: 20px;
}
</style>
