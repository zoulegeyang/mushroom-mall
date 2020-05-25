<template>
  <div>
    <tab-content
      :productions="allGoods"
      v-show="(RealActive == 0 || RealActive == '0')"
      ref="bscroll"
    ></tab-content>
    <tab-content
      :productions="del"
      v-show="(RealActive == 1 || RealActive == '1')"
      ref="bscroll"
    ></tab-content>
    <tab-content
      :productions="tak"
      v-show="(RealActive == 2 || RealActive == '2')"
      ref="bscroll"
    ></tab-content>
    <tab-content
      :productions="wait"
      v-show="(RealActive == 3 || RealActive == '3')"
      ref="bscroll"
    ></tab-content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TabContent from "./TabContent";
export default {
  data() {
    return {
      delgood: [],
      takgood: [],
    };
  },
  mounted() {
    // console.log(this.tak, this.getUserInfo);
    // console.log(this.delGoods.reverse());
  },
  props: {
    active: {
      default() {
        return 0;
      },
    },
  },
  activated() {
    this.$http
      .get("empty")
      .then((res) => {
        this.userKeeper(res.data.userInfo);
      })
      .catch((err) => console.log(err));
  },
  computed: {
    ...mapGetters(["getUserInfo", "delGoods", "takGoods", "waitGoods"]),
    RealActive() {
      return this.active;
    },
    allGoods() {
      // let newDelgoods = this.delGoods;
      // this.delGoods.map &&
      //   this.delGoods.map((item) => {
      //     item.status = "del";
      //   });
      // // let newTakgoods = this.takGoods;

      // this.takGoods.map &&
      //   this.takGoods.map((item) => {
      //     item.status = "tak";
      //   });
      let delGoods = [...this.delGoods];
      let takGoods = [...this.takGoods];
      let tmp =
        delGoods.concat && delGoods.reverse().concat(takGoods.reverse());
      // console.log(tmp);
      let zz = tmp.sort(function (a, b) {
        if (a.orderNumber < b.orderNumber) {
          return 1;
        } else {
          return -1;
        }
      });

      // console.log(zz, tmp);
      zz.forEach((element) => {
        console.log(element.orderNumber);
      });
      return zz;
    },
    del() {
      let delgoods = [...this.delGoods];
      // delgoods.map((item) => {
      //   return (item.status = "del");
      // });
      // return this.delgoods;
      // this.delgood = this.delGoods;
      return delgoods.reverse && delgoods.reverse();
    },
    tak() {
      // let takGoods = this.takGoods;
      // takGoods.map((item) => {
      //   return (item.status = "tak");
      // });
      // return takGoods;
      let takGoods = [...this.takGoods];
      return takGoods.reverse && takGoods.reverse();
    },
    wait() {
      let waitGoods = [...this.waitGoods];
      return waitGoods.reverse && waitGoods.reverse();
    },
  },
  components: {
    TabContent,
  },
  methods: {
    // test() {
    //   console.log(this.tak, this.del, this.allGoods);
    // },
    ...mapActions(["userKeeper"]),
    select(ii, ee) {
      // console.log(ii, ee);
      console.log("````");
    },
  },
};
</script>

<style lang="scss" scoped>
// .sticky {
//   position: relative;
//   z-index: 999;
// }
</style>
