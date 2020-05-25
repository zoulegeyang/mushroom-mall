<template>
  <div class="tabbar">
    <div class="left">
      <div class="kefu icon">
        <i></i>
        <span>客服</span>
      </div>
      <div class="shop icon">
        <i></i>
        <span>店铺</span>
      </div>
      <div class="love icon">
        <i></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart text" @click="cartIn">
        <span>加入购物车</span>
      </div>
      <div class="buy text" @click="buy">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, des, shopInfo, getRecommend } from "network/detail";
export default {
  name: "detailTabbar",
  data() {
    return {
      desc: null,
    };
  },
  methods: {
    cartIn() {
      this.$emit("cartTo");
      // console.log(222)
    },
    buy() {
      let goods = [];
      // goods.push(this.$route.params.iid);

      getDetail(this.$route.params.iid).then((res) => {
        console.log(res);
        this.result = res.result;
        // console.log(this.result)
        this.topImages = res.result.itemInfo.topImages;
        // console.log(this.topImages)

        this.desc = new des(
          res.result.itemInfo,
          res.result.columns,
          res.result.shopInfo.services
        );
        console.log(this.desc);
        let good = {
          image: res.result.itemInfo.topImages[1],
          price: this.desc.price,
          count: 1,
          title: this.desc.title,
          iid: this.$route.params.iid,
        };
        goods.push(good);

        this.$emit("select-params", { goods, isDetail: true });
        console.log(goods);
        // this.$router.push({
        //   path: "/confirm",
        //   query: { goods, isDetail: true },
        // });
      });
    },
  },
};
</script>

<style scoped>
.tabbar {
  text-align: center;
  font-size: 12px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #fff;
  display: flex;
  z-index: 999;
}
.left {
  align-content: center;
  width: 50%;
  display: flex;
  justify-content: space-around;
}
.left div {
  flex: 1;
}
.right {
  width: 50%;
  display: flex;
  align-content: center;
}
.right div {
  width: 50%;
}
.icon {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
}
.text {
  /* 在flex布局里 text-align失效 反正如果用flex布局的话,布局的东西都用flex里面的稳些 */
  /* text-align: center; */
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
i {
  display: block;
  /* height: 10px; */
  width: 100%;
  background-color: yellow;
}
.cart {
  background-color: yellow;
}
.buy {
  background-color: pink;
}
</style>
