<template>
  <div class="contents">
    <Bscroll
      class="wrapper"
      ref="scroll"
      @touchstart="scroll"
      v-if="productions.length > 0"
    >
      <tab-item
        v-for="(item, index) in productions"
        :product="item"
        :key="index"
      >
        <template #status>
          <span v-if="item.status == 'del'">等待付款</span>
          <span v-else-if="item.status == 'tak'">等待收货</span>
          <i class="iconfont icon-shanchu" v-else></i>
        </template>
        <template #operation>
          <div class="opration" v-if="item.status == 'del'">
            <van-button round plain size="small" class="button"
              >修改订单</van-button
            >
            <van-button
              round
              plain
              size="small"
              class="button"
              color="red"
              @click="pay(item)"
              >去支付</van-button
            >
          </div>
          <div class="opration" v-else-if="item.status == 'tak'">
            <van-button round plain size="small" class="button"
              >联系客服</van-button
            >
            <van-button
              round
              plain
              size="small"
              color="red"
              class="button"
              @click="confirmTak(item)"
              >确认收货</van-button
            >
          </div>
          <div class="opration" v-else>
            <van-button
              round
              plain
              size="small"
              class="button"
              @click="pay(item)"
              >再次购买</van-button
            >
            <van-button
              round
              plain
              size="small"
              color="red"
              class="button"
              @click="evaluate(item)"
              >去评价</van-button
            >
          </div>
        </template>
      </tab-item>
    </Bscroll>
    <van-empty image="error" description="暂没有订单" v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Bscroll from "@/components/common/bscroll/Bscroll";
import TabItem from "./TabItem";
export default {
  name: "tabContent",
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  components: {
    TabItem,
    Bscroll,
  },
  props: {
    productions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions(["userKeeper"]),
    scroll() {
      console.log("````");
      this.$refs.scroll.refresh();
    },
    pay(item) {
      let goods = [item];
      console.log(goods);
      this.$router.push({
        path: "/payOrder",
        query: {
          goods: goods,
          isDetail: item.isDetail,
          address: item.address,
          orderNumber: item.orderNumber,
        },
      });
    },
    evaluate(item) {
      this.$router.push({ path: "/evaluate", query: { item: item } });
    },
    confirmTak(item) {
      console.log("````");
      this.$dialog
        .alert({
          title: "确认收货吗",
          showCancelButton: true,
        })
        .then(() => {
          item.status = "wait"; // 更新状态
          this.$http.post("/goods/confirmtak", item).then((res) => {
            if (res.data.code == 200) {
              this.$http.get("empty").then((result) => {
                this.userKeeper(result.data.userInfo);
              });
            }
          });
        })
        .catch(() => {
          return;
        });
    },
  },
  activated() {},
  mounted() {
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
};
</script>

<style lang="scss" scoped>
.contents {
  // height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 88;
  // z-index: -1;
  // width: 100vw;
  // overflow: scroll;
}
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  z-index: 33;
  background-color: #eee;
}
.opration {
  display: flex;
  justify-content: flex-end;
  .button {
    margin-right: 10px;
  }
}
</style>
