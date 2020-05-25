<template>
  <div>
    <evaluate-nav-bar
      title="编辑收货地址"
      :isDefault="false"
    ></evaluate-nav-bar>
    <van-form @submit="saveAddress">
      <van-field
        label="收货人"
        v-model="username"
        name="username"
        :rules="[
          {
            pattern: /^[a-zA-Z\u0391-\uFFE5][a-zA-Z0-9\u0391-\uFFE5]{1,10}$/,
            message: '用户名大于2位小于11位',
          },
        ]"
      ></van-field>
      <van-field
        label="手机号码"
        v-model="phone"
        name="phone"
        :rules="[
          { pattern: /^1[3|4|5|8][0-9]{9}$/, message: '手机号不符合规范' },
        ]"
      ></van-field>
      <van-field
        label="所在地区"
        v-model="address"
        name="address"
        @focus="$refs.picker.showPicker = true"
      ></van-field>
      <van-field
        label="详细地址"
        v-model="detailAddress"
        name="detailAddress"
        :rules="[{ required: true, message: '地址未输入' }]"
      ></van-field>
      <van-field
        label="邮政编码"
        v-model="postcode"
        name="postcode"
        :rules="[{ pattern: /^[1-9]\d{5}$/, message: '邮政编码不符合规范' }]"
      ></van-field>
      <van-cell title="设置默认地址" label="每次下单默认使用该地址">
        <van-switch v-model="checked" size="24px"></van-switch>
      </van-cell>
      <div class="bottom">
        <van-button block round type="danger">保存</van-button>
      </div>
    </van-form>
    <van-cell></van-cell>
    <form-picker ref="picker" @picker-value="pickerValue"></form-picker>
  </div>
</template>

<script>
import FormPicker from "@/views/confirmOrder/children/FormPicker";
import { mapActions } from "vuex";
import EvaluateNavBar from "../../evaluate/children/EvaluateNavBar";
export default {
  name: "addressEdit",
  data() {
    return {
      phone: this.$route.query.phone || "",
      username: this.$route.query.username || "",
      address: "",
      detailAddress: "",
      postcode: this.$route.query.postcode || "",
      checked: this.$route.query.checked || false,
      editiid: this.$route.query.iid || "",
    };
  },
  components: {
    EvaluateNavBar,
    FormPicker,
  },
  methods: {
    ...mapActions(["userKeeper"]),
    pickerValue(value) {
      this.address = value;
    },
    saveAddress(value) {
      console.log(value);
      this.phone = "";
      this.username = "";
      this.address = "";
      this.detailAddress = "";
      this.postcode = "";
      let tmp1 = value.address.split("-");
      value.address = tmp1.join("") + value.detailAddress;
      // / 设置地址是否为默认地址
      value.checked = this.checked;
      // 若设置为默认地址 还需要将其改为默认地址
      delete value.detailAddress;
      // // 若不没有iid
      if (!this.editiid) {
        value.iid = String(+new Date());
        this.$http
          .post("order/addAddress", value)
          .then(async (res) => {
            // 若添加为地址后若地址为默认地址还要更新默认地址
            if (res.data.code == 200) {
              if (this.checked) {
                try {
                  await this.$http.post("order/setdefault", {
                    iid: value.iid,
                  });
                } catch (err) {
                  console.log(err);
                }
              }

              // 将vuex里的信息重置
              this.$http.get("empty").then((res) => {
                this.userKeeper(res.data.userInfo);

                this.$toast.show("添加成功", 2000);
                this.$router.go(-1);
              });
            } else {
              this.$toast.show("添加失败", 2000);
              return;
            }
          })
          .catch((err) => console.log(err));
      } else {
        value.iid = this.editiid; // 先得到iid
        this.editiid = ""; //再清空
        this.$http
          .post("order/editAddress", value)
          .then(async (res) => {
            if (res.data.code == 200) {
              if (this.checked) {
                try {
                  await this.$http.post("order/setdefault", {
                    iid: value.iid,
                  });
                } catch (err) {
                  console.log(err);
                }
              }
              this.$http.get("empty").then((res) => {
                this.userKeeper(res.data.userInfo);
                this.$toast.show("修改成功", 2000);
                this.$router.go(-1);
              });
            } else {
              this.$toast.show("修改失败", 2000);
              return;
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: #fff;
  width: 100%;
  padding: 8px 30px;
  :last-child {
    margin: 0;
  }
}
</style>
