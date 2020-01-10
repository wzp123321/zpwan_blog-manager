<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <Input v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]" />
    </a-form-item>
    <a-form-item label="登录密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <InputPwd
        placeholder="请输入登录密码"
        v-decorator="['password', { rules: [{ required: true, message: '请输入登录密码!' }] }]"
      />
    </a-form-item>
    <a-form-item label="QQ号码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <Input v-decorator="['qq_number', { rules: [{ required: true, message: '请输入QQ号码!' }] }]" />
    </a-form-item>
    <a-form-item label="QQ二维码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <UploadHandler @change="handleQQUploadChange"></UploadHandler>
    </a-form-item>
    <a-form-item label="微信号" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <Input v-decorator="['qweixin_number', { rules: [{ required: true, message: '请输入微信号!' }] }]" />
    </a-form-item>
    <a-form-item label="微信二维码" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <UploadHandler @change="handleWXUploadChange"></UploadHandler>
    </a-form-item>
    <a-form-item label="GitHub链接" :label-col="{ span: 3 }" :wrapper-col="{ span: 10 }">
      <Input
        v-decorator="['github_number', { rules: [{ required: true, message: '请输入GitHub链接!' }] }]"
      />
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
    Input,
    InputPwd: Input.Password,
    "a-select": Select,
    UploadHandler
  }
})
export default class AdminModule extends Vue {
  private form: any = this.$form.createForm(this);
  /**
   * QQ图片上传
   */
  private handleQQUploadChange(file: any) {
    console.log(file);
  }
  /**
   * WX图片上传
   */
  private handleWXUploadChange(file: any) {
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