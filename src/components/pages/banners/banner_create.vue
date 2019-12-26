<template>
  <div class="create">
    <h1 class="title">Banner{{$route.path.includes('add') ? '新增':'编辑'}}</h1>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Banner标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
        <a-input
          placeholder="请输入Banner标题"
          v-decorator="['title', { rules: [{ required: true, message: '请输入Banner标题!' },{ max: 20, message: 'Banner标题不超过20个字符!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Banner链接" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
        <a-input
          placeholder="请输入Banner链接"
          v-decorator="['url', { rules: [{ required: true, message: '请输入Banner链接!' },{ max: 100, message: 'Banner链接不超过100个字符!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Banner封面" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
        <UploadHandler
          v-decorator="['imgUrl', { rules: [{ required: true, message: '请上传Banner封面!' }] }]"
          @change="handleUploadChange"
        ></UploadHandler>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 10 }">
        <a-button type="primary" html-type="submit" style="width:120px">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, Input, Button } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
@Component({
  name: "BannerCreate",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-button": Button,
    UploadHandler
  }
})
export default class BannerCreate extends Vue {
  private form: any;
  // 上传加载
  private loading: boolean = false;
  // 上传图片url
  private imageUrl: string = "";

  /**
   * 上传操作
   */
  private handleUploadChange(value: string) {}
  /**
   * 提交表单
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.veliDateFields((err: Error, values: BannerModule.BannerInfo) => {
      console.log(values);
    });
  }
  created() {
    this.form = this.$form.createForm(this);
  }
}
</script>
<style lang="less" scoped>
.create {
  .title {
    font-size: 20px;
    border-left: 3px solid #000;
    padding-left: 10px;
  }
}
</style>