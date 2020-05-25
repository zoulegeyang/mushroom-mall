<template>
  <div @click="test">
    {{ reverse }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4],
    };
  },
  computed: {
    reverse() {
      let arrs = [...this.arr]; // 数组也是要深拷贝忘了
      console.log(arrs);
      return arrs.reverse();
    },
  },
  methods: {
    test() {
      this.arr.push(5);
    },
  },
};
</script>

<style lang="scss" scoped></style>
