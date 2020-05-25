<template>
  <div class="params">
    <div class="test">
      <div v-for="(tableOne, index) in filterTable" :key="index" class="item">
        <span v-for="item in tableOne" :key="item" class="iitem">{{
          item
        }}</span>
      </div>
      <div class="set-item" v-for="item in set" :key="item.key">
        <div>{{ item.key }}</div>
        <div>{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailParams",
  props: {
    table: {
      type: Array,
      default() {
        return [];
      },
    },
    set: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    filterTable() {
      let newtable = this.table && this.table.length > 0 && this.table[0]; // [ [1,,2,3 ], ['-,-,-]]
      let news =
        newtable &&
        newtable.filter((item) => {
          return !item.some((ii) => ii == "-"); //巧方法取反则得到没有-的元素集合
        });
      return news;
    },
  },
  // mounted() {
  //   console.log(this.table);
  // },
  // watch: {
  //   table(newValue, oldValue) {
  //     console.log(newValue);
  //     this.table = newValue;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.test {
  width: 300px;
  margin: 20px 0;
}
.item {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.iitem {
  display: inline-block;
  height: 40px;
  width: 50px;
  line-height: 40px;
  font-size: 14px;
}
.set-item {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  text-align: center;
  :first-child {
    position: relative;
    right: 3px;
    flex: 2;
  }
  :last-child {
    flex: 6;
    color: #f08899;
  }
}
.params {
  box-shadow: 0 3px 0 rgba($color: #eee, $alpha: 0.5);
}
</style>
