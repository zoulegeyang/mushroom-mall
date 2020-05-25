<template>
  <div class="tag">{{ title }}</div>
</template>

<script>
export default {
  methods: {},
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: inline;
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 30%;
  background-color: #eee;
}
</style>
