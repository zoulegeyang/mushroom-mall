<template>
  <div>
    <div v-for="(item, index) in addresses" :key="index" class="content">
      <div class="center-wrap">
        <div class="top">
          <div>{{ item.username }}</div>
          <div class="right">
            <span>{{ item.phone }}</span>
            <van-tag type="danger" v-if="item.checked">默认</van-tag>
          </div>
        </div>
        <div class="bottom">
          <div>{{ item.address }}</div>
          <div class="bottom-is">
            <i
              class="iconfont icon-shanchu"
              @click="deleteAddress(item.iid)"
            ></i>
            <i class="iconfont icon-bianji" @click="editAddress(item)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    addresses: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions(["userKeeper"]),
    // 删除地址
    deleteAddress(id) {
      this.$http.post("/order/deleteAddress", { iid: id }).then((res) => {
        if (res.data.code == 200) {
          this.$http.get("empty").then((result) => {
            this.userKeeper(result.data.userInfo);
          });
        }
      });
    },
    editAddress(item) {
      console.log(item);
      this.$router.push({ path: "/editAddress", query: item });
    },
  },
  computed: {
    ...mapGetters(["getDefaultAddress"]),
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #eee;
}
.center-wrap {
  padding: 20px 10px;
  width: 100%;
  color: black;
}
.top {
  width: 100%;
  font-weight: 1300;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}

.bottom {
  font-size: 13px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  i {
    font-size: 13px;
  }
}
.right {
  display: flex;
  align-items: center;
  span {
    margin-right: 8px;
  }
}
.bottom-is {
  i {
    margin-right: 8px;
    font-size: 15px;
  }
}
</style>
