<template>
  <div class="comment">
    <van-cell is-link title="用户评价" value="更多"></van-cell>
    <div class="remarks">
      <div class="top">
        <div class="avatar">
          <img :src="firstRemark && firstRemark.user.avatar" />
        </div>
        <div class="uname">{{ firstRemark && firstRemark.user.uname }}</div>
      </div>
      <div class="content">{{ firstRemark && firstRemark.content }}</div>
      <div class="bottom">
        <div class="time">{{ time }}</div>
        <div class="style">{{ firstRemark && firstRemark.style }}</div>
      </div>
      <div class="images">
        <img
          :src="img"
          v-for="img in firstRemark && firstRemark.images"
          :key="img"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailComment",
  props: {
    remark: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    firstRemark() {
      return this.remark && this.remark.list[0];
    },
    time() {
      let timestamp = this.firstRemark && this.firstRemark.created;
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
  },
};
</script>

<style scoped lang="scss">
.comment {
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.top {
  padding-top: 10px;
  display: flex;
  align-items: center;
  font-weight: bold;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.bottom {
  margin-top: 10px;
  display: flex;
  color: #aaa;
  :first-child {
    margin: 0 10px;
  }
}
.content {
  margin-top: 10px;
  padding: 10px;
}
.images {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 27%;
    padding: 10px;
    height: 100px;
  }
}
</style>
