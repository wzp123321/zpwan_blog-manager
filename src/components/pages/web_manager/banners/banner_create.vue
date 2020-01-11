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
          :imgUrl="imgUrl"
          v-decorator="['imgUrl', { rules: [{ required: true, message: '请上传Banner封面!' }] }]"
          @change="handleUploadChange"
        ></UploadHandler>
      </a-form-item>
      <a-form-item label="上下架" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
        <a-switch v-decorator="['isShelves']" :checked="isShelves" @change="()=>{isShelves = !isShelves}"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 10}">
        <a-button type="primary" html-type="submit" style="width:120px" :loading="loading">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, Input, Button, Switch } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "BannerCreate",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-button": Button,
    "a-switch": Switch,
    UploadHandler
  }
})
export default class BannerCreate extends Vue {
  private form: any;
  private isShelves:boolean = false;
  // 上传加载
  private loading: boolean = false;
  // 上传图片url
  private imgUrl: string = "";
  /**
   * 上传操作回调
   */
  private handleUploadChange(imgUrl: string) {
    this.imgUrl = imgUrl;
    this.form.setFieldsValue({
      imgUrl
    });
  }
  /**
   * 提交表单
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: Error, values: BannerModule.BannerInfo) => {
      if (!err) {
        this.loading = true;
        if (this.$route.path.includes("edit")) {
          this.handleBannerUpdate(values);
        } else {
          this.handleBannerAdd(values);
        }
      }
    });
  }
  /**
   * banner新增
   */
  private async handleBannerAdd(values: BannerModule.BannerInfo) {
    values = Object.assign(values, {
      isShelves: values.isShelves ? 1 : 0
    });
    const res: ApiResponse<
      boolean
    > = await HttpRequest.BannerModule.getBannerAdd(values);

    if (res && res.data) {
      this.$message.success("新增成功");
      this.$router.push("/app/webmanager/banner/list");
      this.loading = false;
    } else {
      this.$message.error("新增失败");
    }
  }
  /**
   * banner编辑
   */
  private async handleBannerUpdate(values: BannerModule.BannerInfo) {
    const id = this.$route.params.id;
    const params = Object.assign(values, {
      id,
      isShelves: values.isShelves ? 1 : 0
    });
    const res: ApiResponse<
      boolean
    > = await HttpRequest.BannerModule.getBannerUpdate(params);

    if (res && res.data) {
      this.$message.success("编辑成功");
      this.$router.push("/app/webmanager/banner/list");
      this.loading = false;
    } else {
      this.$message.error("编辑失败");
    }
  }
  /**
   * 请求banner详情
   */
  private async getBannerInfoById() {
    const id = this.$route.params.id;
    const res: ApiResponse<
      BannerModule.BannerInfo
    > = await HttpRequest.BannerModule.getBannerInfoById({ id });
    if (res && res.data) {
      const { title, imgUrl, url, isShelves } = res.data;
      this.imgUrl = imgUrl;
      this.isShelves = isShelves === 1 ? true : false;
      this.form.setFieldsValue({
        title,
        imgUrl,
        url,
        isShelves: isShelves === 1 ? true : false
      });
    }
  }
  created() {
    this.form = this.$form.createForm(this);

    if (this.$route.path.includes("edit")) {
      this.getBannerInfoById();
    }
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