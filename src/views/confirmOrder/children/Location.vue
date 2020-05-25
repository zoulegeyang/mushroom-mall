<template>
  <div>
    <van-action-sheet v-model="show" class="action">
      <div class="title" v-if="!addShow">选择地址</div>
      <div class="title" v-else>编辑地址</div>
      <div class="content">
        <div>
          <div v-show="!addShow" class="no-address">
            <span v-if="getAddress.length == 0"
              >还没有收货地址,添加一个吧~</span
            >
            <Address
              :addresses="getAddress"
              v-else
              @set-defautl="setDefault"
              @editAddress="editAddress"
              @postAddress="selectAddress"
            ></Address>
          </div>
          <van-form validate-first @submit="saveAddress">
            <div class="form" v-show="addShow">
              <van-field
                label="收件人"
                name="username"
                v-model="username"
                autofocus
                :rules="[
                  { required: true, message: '必填字段', trigger: 'onBlur' },
                ]"
              ></van-field>
              <van-field
                label="手机号码"
                name="phone"
                v-model="phone"
                :rules="[
                  { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对' },
                ]"
              ></van-field>
              <!-- 该项不可以用双向绑定 由于它的值是通过选择器来设置的 -->
              <van-field
                label="地区信息"
                readonly
                clickable
                name="address"
                :value="address"
                @click="showPicker"
              ></van-field>
              <van-field
                label="详细地址"
                name="detailAddress"
                v-model="detailAddress"
                :rules="[{ required: true, message: '必填字段' }]"
              ></van-field>
              <van-field
                label="邮政编码"
                name="postcode"
                v-model="postcode"
                :rules="[{ required: true, message: '必填字段' }]"
              ></van-field>
            </div>
            <div class="buttons">
              <van-button
                color="pink"
                block
                native-type="reset"
                size="normal"
                class="v-button"
                @click="cancel"
                v-if="!addShow"
                >取消</van-button
              >
              <van-button
                color="pink"
                block
                native-type="reset"
                size="normal"
                class="v-button"
                @click="addShow = false"
                v-else
                >返回</van-button
              >
              <van-button
                color="rgb(243, 46, 46)"
                class="v-button"
                size="normal"
                block
                native-type="submit"
                v-if="addShow"
                >保存</van-button
              >
              <van-button
                color="rgb(243, 46, 46)"
                class="v-button"
                size="normal"
                block
                @click="showForm"
                v-else
                >添加新地址</van-button
              >
            </div>
          </van-form>
          <form-picker @picker-value="pickValue" ref="picker"></form-picker>
        </div>
      </div>
    </van-action-sheet>
    <!-- </van-overlay> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormPicker from "./FormPicker";
import Address from "./Address";
import Bscroll from "@/components/common/bscroll/Bscroll";
export default {
  data() {
    return {
      show: false,
      addShow: false,
      username: "",
      phone: "",
      address: "",
      detailAddress: "",
      postcode: "",
      editiid: "", // 通过点击编辑得来的iid
    };
  },
  // mounted() {
  //   this.$refs.scroll.refresh();
  // },
  methods: {
    ...mapActions(["userKeeper", "changeDefaultAddress"]),
    pickValue(value) {
      this.address = value;
    },
    showPicker() {
      this.$refs.picker.showPicker = true;
    },
    saveAddress(value) {
      this.addShow = false; //也要将form表单隐藏 以便下次显示地址
      this.phone = "";
      this.username = "";
      this.address = "";
      this.detailAddress = "";
      this.postcode = "";
      let tmp1 = value.address.split("-");
      value.address = tmp1.join("") + value.detailAddress;
      /// 设置地址是否为默认地址 以及地址的id值
      value.checked = false;
      delete value.detailAddress;
      // 若不是通过点击iid进入的
      if (!this.editiid) {
        console.log("添加");
        value.iid = String(+new Date());
        this.$http
          .post("order/addAddress", value)
          .then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              // 将vuex里的信息重置
              this.$http.get("empty").then((res) => {
                this.userKeeper(res.data.userInfo);
                // console.log(res.data.userInfo);
                // 提示
                this.$toast.show("添加成功", 2000);
              });
            } else {
              this.$toast.show("添加失败", 2000);
              return;
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("编辑");
        value.iid = this.editiid; // 先得到iid
        this.editiid = ""; //再清空
        this.$http
          .post("order/editAddress", value)
          .then((res) => {
            if (res.data.code == 200) {
              this.$http.get("empty").then((res) => {
                this.userKeeper(res.data.userInfo);
                this.$toast.show("修改成功", 2000);
              });
            } else {
              this.$toast.show("修改失败", 2000);
              return;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    showForm() {
      this.addShow = true;
    },
    cancel() {
      this.show = !this.show;
      this.addShow = false;
    },
    setDefault(iid) {
      this.$http
        .post("order/setdefault", {
          iid: iid,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.changeDefaultAddress(iid);
          } else {
            console.log(res, "错误");
          }
        })

        .catch((err) => console.log(err));
    },
    editAddress(iid) {
      // console.log(iid);
      this.addShow = true;
      this.editiid = iid;
    },
    selectAddress(zz) {
      console.log(zz);
      this.$emit("select-sonaddress", zz);
      this.show = false;
    },
  },
  computed: {
    ...mapGetters(["getAddress"]),
  },
  components: {
    FormPicker,
    Address,
    // Bscroll,
  },
};
</script>

<style lang="scss" scoped>
.action {
  height: 450px;
  overflow: scroll;
  // position: relative;
  .title {
    position: sticky;
    height: 44px;
    line-height: 44px;
    top: 0px;
    text-align: center;
    background-color: #fff;
    overflow: hidden;
    width: 100%;
    z-index: 99;
  }
}
.content {
  position: relative;
  border-top: 1px solid #eee;
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  /* line-height: 400px; */
}
.buttons {
  display: flex;
  width: 100%;
  height: 49px;
  line-height: 49px;
  position: fixed;
  bottom: 0;
  z-index: 99;
  text-align: center;
  align-items: center;
}
.cancel {
  background-color: pink;
}
.form {
  width: 100%;
  position: absolute;
  /* top: 0px; */
  height: 100%;
  z-index: 88;
  background-color: #fff;
}
.button {
  width: 50%;
  display: flex;
}
.confirm {
  background-color: rgb(243, 46, 46);
  color: #fff;
}
.v-button {
  height: 100%;
  line-height: 100%;
}
.scorll {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: pink;
}
.no-address {
  height: 400px;
  line-height: 400px;
}
</style>
