<template>
  <div class="treasure">
    <div>
      <div>
        <div class="first">
          <span v-if="getUserInfo.phone != '10000000000'">{{
            getUserInfo.balance | price
          }}</span>
          <span v-else>0</span>
          元
        </div>
        <div class="second">我的余额</div>
      </div>
    </div>
    <div>
      <div>
        <div class="first">
          <span>{{
            getUserInfo && getUserInfo.discount && getUserInfo.discount.length
          }}</span
          >个
        </div>
        <div class="second">我的优惠券</div>
      </div>
    </div>
    <div>
      <div>
        <div class="first">
          <span>{{ getUserInfo.score }}</span
          >分
        </div>
        <div class="second">我的积分</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  // props: {
  //   treasure: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   }
  // }
};
</script>

<style scoped>
.treasure {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 10px rgba(200, 200, 200, 0.3);
}
.treasure > div {
  flex: 1;
  height: 83px;
  display: flex;
  justify-content: center;
  border-right: 1px solid #eee;
}
span {
  color: #ff5f3e;
  font-size: 24px;
  font-weight: 700;
}
.treasure :last-child {
  border-right: none;
}
.first {
  margin-top: 10px;
}
.second {
  margin-top: 10px;
}
</style>
