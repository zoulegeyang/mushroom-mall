<template>
  <div class="address">
    <div v-for="(item, index) in addresses" :key="index" class="pannel">
      <div
        class="top"
        @touchend="postAddress(item.address)"
        @touchstart="postclass(index)"
        :class="{ topBgc: currentIndex == index }"
      >
        <div class="zz">
          <span>{{ item.username }}</span>
          <span>{{ item.phone }}</span>
        </div>
        <div>{{ item.address }}</div>
      </div>
      <div class="bottom">
        <div class="left" @click="setDefautl(item.iid)">
          <van-icon name="passed" class="icon" v-if="!item.checked" />
          <van-icon name="passed" class="icon" v-else color="red" />
          <span>设置为默认</span>
        </div>
        <div class="right">
          <van-icon
            name="edit"
            class="icon"
            color="red"
            @click="$emit('editAddress', item.iid)"
          />
          <span @click="$emit('editAddress', item.iid)">编辑</span>
          <van-icon
            name="delete"
            class="icon"
            color="red"
            @click="deleteAddress(item.iid)"
          />
          <span @click="deleteAddress(item.iid)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      currentIndex: -1,
    };
  },
  props: {
    addresses: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 设置为默认
    ...mapActions(["userKeeper"]),
    postAddress(address) {
      // console.log(address);
      this.$emit("postAddress", address);
      this.currentIndex = -1;
    },
    postclass(index) {
      this.currentIndex = index;
    },
    setDefautl(iid) {
      this.$emit("set-defautl", iid);
    },
    deleteAddress(iid) {
      this.$http
        .post("order/deleteAddress", {
          iid,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$http.get("empty").then((res) => {
              this.userKeeper(res.data.userInfo);
              console.log(res.data.userInfo);
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  // height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  span {
    margin-right: 10px;
  }
  .pannel {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
    position: relative;
    font-size: 12px;
    width: 90%;
    background-color: #fff;
    margin-top: 20px;
    height: 90px;
    border: 1px solid #eee;
    .top {
      text-align-last: left;
      height: calc(100% - 30px);
      div {
        height: 50%;
        box-sizing: border-box;
        padding: 0 10px;
        line-height: 29px;
      }
    }
  }
  .topBgc {
    background-color: #eee;
  }
  .bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #f1f2f6;
    padding: 0 10px;
  }
}
.icon {
  // margin-top: 4px;
  position: relative;
  top: 2px;
  font-size: 14px;
  margin-right: 3px;
}
</style>
