<template>
  <div>
    <van-cell
      title="我的订单"
      value="全部"
      is-link
      @click="$router.push('/order')"
    ></van-cell>
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        :border="false"
        @click="$router.push({ path: '/order', query: { active: 1 } })"
      >
        <van-icon
          name="paid"
          size="30"
          class="icon"
          :badge="
            getUserInfo.delgoods.length ? getUserInfo.delgoods.length : ''
          "
        />
        <span style="font-size: 12px;">待付款</span>
      </van-grid-item>
      <van-grid-item :border="false">
        <van-icon name="logistics" size="30" class="icon" :badge="''" />

        <span style="font-size: 12px;">待发货</span>
      </van-grid-item>

      <van-grid-item
        :border="false"
        @click="$router.push({ path: '/order', query: { active: 2 } })"
      >
        <van-icon
          name="gift-o"
          size="30"
          class="icon"
          :badge="
            getUserInfo.takgoods.length ? getUserInfo.takgoods.length : ''
          "
        />
        <span style="font-size: 12px;">待收货</span>
      </van-grid-item>
      <van-grid-item
        :border="false"
        @click="$router.push({ path: '/order', query: { active: 3 } })"
      >
        <van-icon
          name="chat-o"
          size="30"
          class="icon"
          :badge="
            getUserInfo.waitPaygoods.length
              ? getUserInfo.waitPaygoods.length
              : ''
          "
        />
        <span style="font-size: 12px;">评价</span>
      </van-grid-item>
      <van-grid-item :border="false">
        <van-icon
          name="refund-o"
          size="30"
          class="icon"
          :badge="getUserInfo.refund.length ? getUserInfo.refund.length : ''"
        />
        <span style="font-size: 12px;">退款售后</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
