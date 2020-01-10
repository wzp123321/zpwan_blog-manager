<template>
  <a-upload
    name="avatar"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imgUrl !==''" :src="imgUrl" alt="avatar" style="width:100px;height:100px" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
import { Vue, Component, Emit,Prop } from "vue-property-decorator";
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

  @Prop({ default: "" })
  private imgUrl!: string ;

  private file: any = null;
  @Emit("change")
  async handleChange(info: any) {
    const res: ApiResponse<
      FileInfo
    > = await HttpRequest.UploaderModule.handleFileUploader({
      file: this.file
    });
    if (res && res.data) {
      this.loading = false;
      return res.data.url;
    }
  }
  async beforeUpload(file: any) {
    this.file = {};
    this.loading = true;
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      this.$message.error("请上传PNG或JPG格式!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("图片大小不得超过2M!");
    }
    this.file = file;
    return false;
  }
}
</script>