<template>
  <div>
    <!-- 地区选择器 -->
    <van-popup :value="showPicker" position="bottom">
      <div class="sheet">
        <van-area
          :area-list="areaList"
          class="sheet"
          :confirm-button-text="'确认'"
          :cancel-button-text="'取消'"
          @confirm="selectAddress"
          @cancel="showPicker = false"
        >
        </van-area>
      </div>
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/assets/data/area";
export default {
  data() {
    return {
      showPicker: false,
      areaList: areaList,
    };
  },
  methods: {
    selectAddress(value) {
      let newarr = [];
      for (let i of value) {
        newarr.push(i.name);
      }
      this.showPicker = false;
      let news = newarr.join("-");
      this.$emit("picker-value", news);
    },
  },
};
</script>

<style lang="scss" scoped>
// .pop {
//   position: relative;
//   height: 300px !important;
//   .toolbar {
//     position: absolute;
//     height: 49px;
//     top: 0;
//     display: flex;
//   }
// }
.sheet {
  position: relative;
}
.toolbar {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 50px;
}
</style>
