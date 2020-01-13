<template>
  <div class="util">
    <h1>这里是工具页 可以进行视频 图片上传 然后获取下载地址</h1>
    <a-upload-dragger
      name="file"
      :multiple="true"
      :fileList="fileList"
      @change="handleChange"
      :beforeUpload="beforeUpload"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">点击或者拖动文件进行上传</p>
      <p class="ant-upload-hint">支持单文件也支持多文件上传</p>
    </a-upload-dragger>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Upload, Icon } from "ant-design-vue";
@Component({
  name: "UtilModule",
  components: {
    "a-upload-dragger": Upload.Dragger,
    "a-icon": Icon
  }
})
export default class UtilModule extends Vue {
  // 文件数组
  private fileList: Array<object> = [];
  /**
   * beforeUpload
   */
  private beforeUpload(fileList: Array<any>) {
    this.fileList = fileList;
    return false;
  }
  /**
   * change事件
   */
  private handleChange(info: any) {}

}
</script>
<style lang="less" scoped>
.util {
  h1 {
    text-align: center;
  }
}
</style>