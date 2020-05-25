<template>
  <div>
    <evaluate-nav-bar title="地址管理" :isDefault="false"></evaluate-nav-bar>
    <address-content :addresses="getAddress"></address-content>
    <bottom></bottom>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressContent from "./childeren/AddressContent";
import Bottom from "./childeren/Bottom";
import EvaluateNavBar from "../evaluate/children/EvaluateNavBar";
export default {
  components: {
    EvaluateNavBar,
    AddressContent,
    Bottom,
  },
  computed: {
    ...mapGetters(["getAddress"]),
  },
  mounted() {
    console.log(this.getAddress);
  },
};
</script>

<style lang="scss" scoped></style>
