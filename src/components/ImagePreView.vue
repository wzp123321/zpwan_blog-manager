<template>
  <div class="image-bigger-wrap" v-show="show">
    <div class="close-icon">
      <img src="../assets/imgs/closeimg.png" alt style="width:80px;height:80px" />
      <i class="iconfont icon-guanbi" @click="getImageBiggerClose"></i>
    </div>
    <img :src="imgUrl" alt />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "ImagePreView"
})
export default class ImagePreView extends Vue {
  // 是否显示
  @Prop({
    default: false
  })
  private show!: boolean;
  // 路径
  @Prop({
    default: ""
  })
  private imgUrl!: string;
  @Emit("img_close")
  getImageBiggerClose() {}
}
</script>
<style lang="less" scoped>
.image-bigger-wrap {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all ease-in-out 500ms;
}
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  .iconfont {
    position: absolute;
    top: 22px;
    left: 41px;
    font-size: 22px;
    color: #cccbcb;
    font-weight: bold;
  }
  .iconfont:hover {
    color: #fff;
  }
}
img {
  width: 70%;
  height: 80%;
  margin-left: 15%;
  margin-top: 5%;
  border-radius: 2px;
}
</style>