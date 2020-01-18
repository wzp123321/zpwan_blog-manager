<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="链接名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入链接名!' }] }]" />
    </a-form-item>
    <a-form-item label="ico" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <UploadHandler
        v-decorator="['ico', { valuePropName: 'url' }, { rules: [{ required: true, message: '请上传链接ico!' }] }]"
        :imgUrl="imgUrl"
        @change="handleImgChange"
      ></UploadHandler>
    </a-form-item>
    <a-form-item label="链接地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input v-decorator="['url', { rules: [{ required: true, message: '请输入链接地址!' }] }]" />
    </a-form-item>
    <a-form-item label="上架" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-switch v-decorator="['isShelves', { valuePropName: 'checked' }]" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" style="wdith:120px">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, Input, Button, Switch } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "FriendlyLinkEditAdd",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-button": Button,
    "a-switch": Switch,
    UploadHandler
  }
})
export default class FriendlyLinkEditAdd extends Vue {
  private form!: any;
  // 图片地址
  private imgUrl: string = "";
  /**
   * 图片上传
   */
  private handleImgChange(url: string) {
    this.imgUrl = url;
  }
  /**
   * 提交表单
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.FriendlyLinkInfo) => {
        if (!err) {
          if (this.$route.path.includes("edit")) {
            this.handleFriendlyLinkEdit(values);
          } else {
            this.handleFriendlyLinkAdd(values);
          }
        }
      }
    );
  }
  /**
   * 新增
   */
  private async handleFriendlyLinkAdd(
    values: WebManagerModule.FriendlyLinkInfo
  ) {
    const { name, ico, url, isShelves } = values;
    const res: ApiResponse<boolean> = await HttpRequest.FriendlyLinkModule.getFriendlyLinkAdd(
      {
        name,
        ico,
        url,
        isShelves: isShelves ? 1 : 0
      }
    );
    if (res && res.data) {
      this.$message.success("新增成功");
      this.$router.push("/app/webManager/friendlink/list");
    }
  }
  /**
   * 编辑
   */
  private async handleFriendlyLinkEdit(
    values: WebManagerModule.FriendlyLinkInfo
  ) {
    const { name, ico, url, isShelves } = values;
    const id = this.$route.params.id;
    const res: ApiResponse<boolean> = await HttpRequest.FriendlyLinkModule.getFriendlyLinkUpdate(
      {
        id,
        name,
        ico,
        url,
        isShelves: isShelves ? 1 : 0
      }
    );
    if (res && res.data) {
      this.$message.success("编辑成功");
      this.$router.push("/app/webManager/friendlink/list");
    }
  }
  /**
   * 请求数据 回显数据
   */
  private async getFriendlyLinkInfo() {
    const id = this.$route.params.id;
    const res: ApiResponse<WebManagerModule.FriendlyLinkInfo> = await HttpRequest.FriendlyLinkModule.getFriendlyLinkInfoById(
      { id }
    );
    const { name, ico, url, isShelves } = res.data;
    this.form.setFieldsValue({
      name,
      ico,
      url,
      isShelves: isShelves === 1 ? true : false
    });
    this.imgUrl = ico || "";
  }
  created() {
    this.form = this.$form.createForm(this);
    if (this.$route.path.includes("edit")) {
      this.getFriendlyLinkInfo();
    }
  }
}
</script>
<style lang="less" scoped>
</style>