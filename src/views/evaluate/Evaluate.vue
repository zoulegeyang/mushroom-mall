<template>
  <div class="evaluate">
    <evaluate-nav-bar @submit="submit"></evaluate-nav-bar>
    <Bscroll ref="scroll" class="scroll">
      <evaluate-top
        :img="item && item.image"
        class="margin-bottom"
        ref="top"
      ></evaluate-top>
      <eva-main class="margin-bottom" ref="main"></eva-main>
      <post-evaluate ref="post"></post-evaluate>
    </Bscroll>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import PostEvaluate from "./children/PostEvaluate";
import EvaMain from "./children/EvaMain";
import EvaluateTop from "./children/EvaluateTop";
import Bscroll from "@/components/common/bscroll/Bscroll";
import EvaluateNavBar from "./children/EvaluateNavBar";
export default {
  data() {
    return {
      item: null, // 这种传递的数据不能一开始就赋值 可能拿不到;
    };
  },
  methods: {
    ...mapActions(["userKeeper"]),
    submit() {
      let goodValue = this.$refs.top.value;
      let remark = this.$refs.main.message;
      let images = this.$refs.main.fileList;
      let orderNumber = this.item.orderNumber;
      let iid = this.item.iid;
      let accord = this.$refs.post.first;
      let service = this.$refs.post.second;
      let speed = this.$refs.post.third;
      let postman = this.$refs.post.fourth;
      let wrap = this.$refs.post.five;

      let evaluate = {
        goodValue,
        orderNumber,
        iid,
        remark,
        images,
        accord,
        service,
        speed,
        postman,
        wrap,
      };
      this.$http
        .post("/evaluate", evaluate)
        .then((res) => {
          // 若成功 则返回提示下评价成功 需要返回到订单页面 还需要更新
          if (res.data.code == 200) {
            this.$http.get("empty").then((result) => {
              if (result.data.code == 200) {
                this.userKeeper(result.data.userInfo);
                this.$toast.show("评价成功", 2000);
                this.$router.go(-1);
              }
            });
          }
        })
        .catch((err) => console.log(err));
      // console.log(this.item);
    },
  },
  components: {
    EvaluateNavBar,
    Bscroll,
    EvaluateTop,
    EvaMain,
    PostEvaluate,
  },
  created() {},
  mounted() {
    this.item = this.$route.query.item;
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
};
</script>

<style lang="scss" scoped>
.evaluate {
  position: relative;
  height: 100vh;

  z-index: 999;
}
.scroll {
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  background-color: #eee;
}
.margin-bottom {
  margin-bottom: 10px;
}
</style>
