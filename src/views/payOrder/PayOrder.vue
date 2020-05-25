<template>
  <div>
    <van-nav-bar
      right-text="订单中心"
      title="蘑菇街收银台"
      left-arrow
      @click-left="cancelOrder"
      @click-right="goToOrder"
    ></van-nav-bar>
    <div class="total">
      $ <span>{{ totalPrice }}</span>
    </div>
    <div class="selectPayMethods">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in payMethods"
          :key="index"
          :title="item.name"
          @click="selectPay(index)"
        >
          <template #icon>
            <i
              class="iconfont"
              :class="item.icon"
              :style="{ color: item.color }"
            ></i>
          </template>
          <template #right-icon>
            <i
              class="iconfont icon-dagou"
              :style="{ color: currentIndex == index ? 'red' : '#666' }"
            ></i>
          </template>
        </van-cell>
      </van-cell-group>

      <div class="button-wrap">
        <van-button block color="red" round class="button" @click="pay"
          >支付</van-button
        >
      </div>
    </div>
    <van-overlay :show="show" z-index="100" @click="show = false">
      <van-password-input
        @click.stop
        class="pwdpositon"
        :value="payPassword"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- paystaus 是用来显示输入的 当输入完之后切换到成功或失败的图标展示 -->
      <div class="wrapper" @click.stop>
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </van-overlay>
    <van-overlay :show="payStaus" z-index="100" @touchend="payStaus = false">
      <div class="icon-wrapper">
        <div v-if="status == 'wait'">
          <van-loading size="80" color="#67d579" />
          <div class="text">正在支付</div>
        </div>
        <div v-else-if="status == 'success'">
          <i class="iconfont icon-chenggong" style="color: #67d579;"></i>
          <div class="text">付款成功</div>
        </div>
        <div v-else>
          <i class="iconfont icon-shibai" style="color: red;"></i>
          <div class="text">密码错误</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "payorder",
  data() {
    return {
      products: this.$route.query.goods,
      payMethods: [
        { icon: "icon-yue", name: "余额支付", color: "#5588f5" },
        { icon: "icon-zhifubao", name: "支付宝支付", color: "#49a8eb" },
        { icon: "icon-weixinzhifu", name: "微信支付", color: "#84c83e" },
        { icon: "icon-B", name: "银行卡支付", color: "#595eae" },
      ],
      currentIndex: -1,
      payPassword: "",
      show: false,
      showKeyboard: false,
      payStaus: false, // 默认展示输入的操作
      status: "wait", // 展示的付款以后的图标
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getDefaultAddress"]),
    totalPrice() {
      return (
        this.products.reduce &&
        this.products.reduce((pre, item) => {
          return (pre += item.price * item.count);
        }, 0)
      );
    },
  },
  mounted() {
    this.products = this.$route.query.goods;
  },
  methods: {
    // 取消订单
    cancelOrder() {
      // this.diaShow = true;
      this.$dialog
        .confirm({
          title: "确定要离开收银台?",
          message: "你的订单在23小时59分内未完成将被取消",
          confirmButtonText: "确认离开",
          confirmButtonColor: "red",
          cancelButtonText: "继续支付",
        })
        // 确认操作
        .then(() => {
          this.goToOrder();
        })
        //取消操作
        .catch(() => {
          console.log("取消");
        });
    },
    goToOrder() {
      this.$router.push("order");
    },
    selectPay(index) {
      this.currentIndex = index;
    },
    pay() {
      if (this.currentIndex == -1) {
        this.$toast.show("还没选择支付方式哦", 2000);
      } else if (this.currentIndex == 0) {
        // 若是余额支付则支持其他的目前不支持
        // 然后继续看是否余额充足
        if (this.getUserInfo.balance >= this.totalPrice) {
          this.show = true;
          this.showKeyboard = true;
        } else {
          this.$toast.show("余额不足哦", 2000);
        }
      } else {
        this.$toast.show("暂时还不支持这种支付方式哦", 2000);
      }
    },
    onInput(key) {
      this.payPassword = (this.payPassword + key).slice(0, 6);
      if (this.payPassword.length == 6) {
        this.show = false;
        let pwd = this.payPassword;
        this.payStaus = true;
        this.status = "wait";
        this.payPassword = "";
        // 需要将密码以及商品信息以及收货地址 以及订单编号一起发过去 以便放到待发货里
        // 由于可能支付好多不同卖家的产品 所以将地址赋给每个产品
        let productions = this.products;
        productions.forEach &&
          productions.forEach((item) => {
            (item.address = this.$route.query.address
              ? this.$route.query.address
              : this.getDefaultAddress), // 选择了地址 则用那个地址 没有则用默认地址
              (item.orderNumber = this.$route.query.orderNumber);
          });
        this.$http
          .post("/goods/pay", {
            pwd,
            isDetail: this.$route.query.isDetail,
            goods: productions,
            totalPrice: this.totalPrice,
          })
          .then(async (res) => {
            // 若成功后做三个事,重定向到付款成功的界面 后端需要将待付款的信息转移到待发货里 若是从购物车过来的 还需要将购物车的对应信息删除
            // 同时减去用户支付方法里面对应的余额
            // 首先判断余额是否充足
            if (res.data.code == 200) {
              try {
                await this.$http.get("empty");
                // 这里做一个动画效果 在两秒里都显示wait 即图标一直在转 两秒以后设置为success
                // 然后在设置一个3s的状态 让overlay 消失 即成功图标只显示1s
                let that = this; // 由于用到了setTimeout 要设置this
                setTimeout(function () {
                  that.status = "success";
                }, 1000);
                setTimeout(function () {
                  that.payStaus = false;
                  // 然后转到order页面
                  that.$router.push("order");
                }, 1800);
              } catch (err) {
                let that = this; // 由于用到了setTimeout 要设置this
                setTimeout(function () {
                  that.status = "success";
                }, 1000);
                setTimeout(function () {
                  that.payStaus = false;
                }, 1800);
                return;
              }
            } else {
              let that = this; // 由于用到了setTimeout 要设置this
              let timer = setTimeout(function () {
                that.status = "error";
              }, 1000);
              setTimeout(function () {
                that.payStaus = false;
              }, 1800);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    onDelete() {
      this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.total {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: red;
  height: 30px;
  line-height: 30px;
  span {
    font-size: 28px;
  }
}
i {
  font-size: 25px;
  margin-right: 10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0px;
}
.button-wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: #ffffff;
}
.pwdpositon {
  position: relative;
  width: 100%;
  top: 200px;
}
.icon-wrapper {
  position: absolute;
  height: 140px;
  width: 140px;
  background-color: #fff;
  transform: translate(-50%);
  left: 50%;
  top: 200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  .text {
    margin-top: 10px;
  }
  i {
    text-align: center;
    font-size: 80px;
    margin-left: 12px;
  }
  text-align: center;
  font-size: 16px;
}
</style>
