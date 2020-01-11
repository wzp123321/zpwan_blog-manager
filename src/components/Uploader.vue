<template>
  <a-upload
    accept=".jpg, .png"
    :multiple="false"
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
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Upload, Icon, message } from "ant-design-vue";
import { handleFileUpload } from "@/assets/api/upload";
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
  private imgUrl!: string;

  @Emit("change")
  async handleChange(info: { file: File; fileList: Array<File> }) {
    let url: string = "";
    await handleFileUpload(info.file, (res: ApiResponse<FileInfo>) => {
      this.loading = false;
      url = res.data.url;
    });
    return url;
  }
  beforeUpload() {
    return false;
  }
}
</script>