<template>
  <!-- 确认订单页面 -->
  <div class="confirm-order">
    <van-nav-bar @click-left="$router.go(-1)" title="确认订单" left-arrow />
    <bscroll class="scroll" ref="scroll">
      <van-cell
        v-if="selectAddress"
        :title="selectAddress"
        icon="location-o"
        is-link
        class="location"
        @click="showOperation"
      />
      <van-cell
        v-else
        :title="getDefaultAddress ? getDefaultAddress : '请填写收货地址'"
        icon="location-o"
        is-link
        class="location"
        @click="showOperation"
      />
      <list-item
        v-for="(item, index) in products"
        :product="item"
        :key="index"
        class="list"
      />
      <!-- <div class="remark">
        <label for="beizhu" class="label">订单备注</label>
        <input type="text" id="beizhu" placeholder="有什么想对商家说的" />
      </div> -->
    </bscroll>
    <confirm-bar
      :count="count"
      :totalPrice="totalPrice"
      @submit-order="submitOrder"
    ></confirm-bar>
    <location ref="location" @select-sonaddress="getAddresses"></location>
  </div>
</template>

<script>
import Location from "./children/Location";
import Bscroll from "@/components/common/bscroll/Bscroll";
import ConfirmBar from "./children/ConfirmBar";
import listItem from "../shopcart/child/listItem";
import { mapGetters } from "vuex";
export default {
  name: "confirm",
  data() {
    return {
      products: [],
      count: 0,
      totalPrice: 0.0,
      selectAddress: "", //选择的地址
    };
  },
  computed: {
    ...mapGetters(["list", "getAddress", "getDefaultAddress", "getUserInfo"]),
  },
  components: {
    listItem,
    ConfirmBar,
    Bscroll,
    Location,
  },
  mounted() {
    // console.log(this.count, this.totalPrice);
    if (this.products != this.$route.query.goods) {
      console.log(this.$route.query.goods);
      this.$refs.scroll.refresh();
      this.products = this.$route.query.goods;

      this.products.forEach((item) => {
        this.count += item.count;
        let price = item.count * Number(item.price);
        this.totalPrice += price;
        // console.log(this.totalPrice);
      });
    }
  },
  activated() {
    // 为了区别是支付设置页面返回和点击商品进行跳转的时候来设置 就算点击的商品和上次一样也没事
  },
  methods: {
    showOperation() {
      this.$refs.location.show = true;
    },
    getAddresses(address) {
      this.selectAddress = address;
    },
    // 开始买东西了 需要判断是从购物车过来的还是从详情过来的 若从购物车过来的一会若购买成功还需要将购物车的这些商品清楚
    // 只要点了就将商品添加到待付款里.
    submitOrder() {
      // 若没有支付密码则跳转到设置支付密码那里
      if (!this.getUserInfo.paypwd) {
        this.$toast.show("还未设置支付密码", 2000);
        return;
      }
      // 若没有地址需要让提示填地址 以及没有默认地址就提示
      if (this.selectAddress == "" && !this.getDefaultAddress) {
        this.$toast.show("还没有地址哦", 2000);
        return;
      }

      let goods = null;
      if (!this.$route.query.isDetail) {
        goods = this.$route.query.goods;
      } else {
        goods = this.$route.query.goods;
      }

      //生成订单号 订单号是由时间戳和手机号组成保证唯一性
      let tmp = +new Date();
      let orderNumber = this.getUserInfo.phone + "" + tmp;

      goods.map((item) => {
        item.orderNumber = orderNumber;
        item.address = this.selectAddress || this.getDefaultAddress;
        item.isDetail = this.$route.query.isDetail ? true : false;
        item.status = "del";
      });
      // 添加待付款信息
      this.$http
        .post("/goods/delgoods", goods)
        .then((res) => {
          if (res.data.code == 200) {
            this.$http.get("/empty").catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
      this.$router.push({
        path: "/payOrder",
        query: {
          goods: goods,
          isDetail: this.$route.query.isDetail ? true : false,
          address: this.selectAddress || this.getDefaultAddress,
          orderNumber,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-order {
  background-color: #eee;
  height: 100vh;
}
.location {
  margin-bottom: 10px;
}
.list {
  background-color: #fff;
}
.scroll {
  position: absolute;
  right: 0;
  left: 0;
  top: 46px;
  bottom: 49px;
  overflow: hidden;
}
.remark {
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #fff;
  font-size: 14px;
  .label {
    margin: 0px 30px;
  }
  input {
    border: none;
    background-color: #f5f6fa;
    height: 27px;
    width: 240px;
  }
}
</style>
