<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Upload, Icon, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;
@Component({
  name: "UploadHandler",
  components: {
    "a-upload": Upload,
    "a-icon": Icon
  }
})
export default class UploadHandler extends Vue {
  private loading: boolean = false;

  private imageUrl: string = "";

  private file: any = null;
  @Emit("change")
  async handleChange(info: any) {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
    }
    return this.file;
  }
  async beforeUpload(file: any) {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      this.$message.error("请上传PNG或JPG格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("图片大小不得超过2M!");
    }
    this.file = file;
    const res: any = await HttpRequest.UploaderModule.handleFileUploader({
      file: this.file
    });
    console.log(res);
    if (res && res.data) {
      console.log(res.data);
    }
    return false;
  }
}
</script>
<style lang="less" scoped>
</style>
