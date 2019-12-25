<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]" />
    </a-form-item>
    <a-form-item label="登录密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <a-input v-decorator="['password', { rules: [{ required: true, message: '请输入登录密码!' }] }]" />
    </a-form-item>
    <a-form-item label="QQ号码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <a-input v-decorator="['qq_number', { rules: [{ required: true, message: '请输入QQ号码!' }] }]" />
    </a-form-item>
    <a-form-item label="QQ二维码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <UploadHandler @change="handleUploadChange"></UploadHandler>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, Button, Input, Select } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
@Component({
  name: "AdminModule",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-button": Button,
    "a-input": Input,
    "a-select": Select,
    UploadHandler
  }
})
export default class AdminModule extends Vue {
  private form: any = this.$form.createForm(this);
  /**
   * 图片上传
   */
  private handleUploadChange(file: any) {
    console.log(file);
  }
  /**
   * 表单提交
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: UserInfo) => {
      console.log(values);
    });
  }
}
</script>
<style lang="less" scoped>
</style>