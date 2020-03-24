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
    <img v-if="imgUrl !==''" :src="imgUrl" alt="avatar" style="width:112px;height:112px" />
    <div v-else>
      <a-icon v-if="!loading" type="plus" />
      <a-progress v-else type="circle" :percent="percent" />
    </div>
  </a-upload>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Upload, Icon, message, Progress } from "ant-design-vue";
import { handleFileUpload } from "@/assets/api/upload";
Vue.prototype.$message = message;
@Component({
  name: "UploadHandler",
  components: {
    "a-upload": Upload,
    "a-icon": Icon,
    "a-progress": Progress
  }
})
export default class UploadHandler extends Vue {
  private loading: boolean = false;

  // 进度
  private percent: number = 0;

  @Prop({ default: "" })
  private imgUrl!: string;

  @Emit("change")
  async handleChange(info: { file: File; fileList: Array<File> }) {
    this.loading = true;
    let url: string = "";
    await handleFileUpload(info.file, (res: ApiResponse<FileInfo>) => {
      this.percent = 100;
      if (res && res.data) {
        url = res.data.url;
      }
    });
    return url;
  }
  beforeUpload() {
    this.percent = 0;
    this.loading = false;
    return false;
  }
}
</script>
<style lang="less">
.ant-upload.ant-upload-select-picture-card {
  width: 112px !important;
  height: 112px !important;
}
</style>