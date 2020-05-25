<template>
  <div class="main-content">
    <div class="content">
      <div tags class="tags">
        <!-- <tag title="是否舒适" class="tag" @click="post(title)"></tag>
      <tag title="尺码大小" class="tag" @click="post(title)"></tag>
      <tag title="材质" class="tag" @click="post(title)"></tag>
      <tag title="版型" class="tag" @click="post(title)"></tag> -->
        <tag
          v-for="i in tagsTitle"
          class="tag"
          :title="i"
          :key="i"
          @click.native="post(i)"
        ></tag>
      </div>
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
      />
      <icon-placeholder class="place" v-show="!message"></icon-placeholder>
      <van-uploader class="upload" :after-read="afterRead">
        <div class="wrap">
          <div class="imgs">
            <i class="iconfont icon-zhaoxiang"></i>
            <div>添加图片/视频</div>
          </div>
        </div>
      </van-uploader>
    </div>
    <div class="image">
      <div v-for="(i, index) in fileList" :key="index" @click="preview(i)">
        <i class="iconfont icon-guanbi" @click.stop="deleteImage(index)"></i>
        <img :src="i" />
      </div>
    </div>
  </div>
</template>

<script>
import IconPlaceholder from "./IconPlaceholder";
import Tag from "./Tag";
export default {
  data() {
    return {
      message: "",
      tagsTitle: ["是否舒适", "尺码大小", "材质", "版型"],
      fileList: [],
    };
  },
  methods: {
    deleteImage(index) {
      this.fileList.splice(index, 1);
    },
    post(i) {
      this.message = i + ":";
    },
    preview(i) {
      this.$ImagePreview([i]);
    },
    afterRead(file) {
      console.log(file);
      let formdata = new FormData();
      formdata.append("image", file.file);

      this.$http
        .post("imgUpload", formdata)
        .then((res) => {
          // console.log(res);
          this.fileList.push("http://localhost:5000" + res.data.webpath);
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    Tag,
    IconPlaceholder,
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  position: relative;
  // height: 350px;
  background-color: #fff;
}
.tags {
  // margin-top: 10px;
  padding-top: 20px;
  height: 40px;
  margin-bottom: 15px;
  .tag {
    margin-left: 10px;
  }
}
.place {
  margin-left: 17px;
  position: absolute;
  top: 69px;
  font-size: 14px;
  color: #aaa;
  pointer-events: none; // 穿透事件属性 可以让让鼠标点不到这个元素 可让同级的被覆盖住的元素获取点击事件
}
.upload {
  width: 100%;
  // position: absolute;
  bottom: 30px;
  :last-child {
    width: 100%;
    :last-child {
      width: 100%;
    }
  }
  ::after {
    display: block;
    content: "";
    clear: both;
  }
}
.imgs {
  text-align: center;
  i {
    font-size: 50px;
    margin-bottom: 20px;
  }
  div {
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
  }
}
.wrap {
  position: relative;
  transform: translate(-50%);
  left: 50%;
  width: 350px;
  height: 100px;
  background-color: #fff;
  box-shadow: 0 0 1px 1px rgba(200, 200, 200, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  display: flex;
}
.image {
  // height: 100px;
  // overflow: hidden;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-evenly;
  div {
    float: left;
    position: relative;
    width: 30%;
    height: 100px;
    margin-left: 10px;
  }
  i {
    width: 14px;
    top: -5px;
    font-size: 14px;
    position: absolute;
    right: -5px;
    // color: red;
  }
  img {
    // flex: 4;
    width: 100%;
    height: 80%;
  }
  &:after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>
