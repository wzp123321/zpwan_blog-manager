<template>
  <div class="article-add">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="标题" :label-col="{ span: 1 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入文章标题!' }] }]" />
      </a-form-item>
      <a-form-item label="封面" :label-col="{ span: 1 }" :wrapper-col="{ offset:1,span: 10 }">
        <UploadHandler
          v-decorator="['imgUrl', { rules: [{ required: true, message: '请上传文章封面!' }] }]"
          @change="handleUploadChange"
        ></UploadHandler>
      </a-form-item>
      <mavon-editor
        ref="markdownEditor"
        :toolbars="markdownOption"
        v-model="articleInfo"
        @save="handleEditorSave"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        :ishljs="true"
      />
    </a-form>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { Vue, Component } from "vue-property-decorator";
import { Form, Button, Input } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
@Component({
  name: "ArticleCreate",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-button": Button,
    UploadHandler
  }
})
export default class ArticleCreate extends Vue {
  // form
  private form: any;
  // 编辑器内容
  private articleInfo: string = "";
  // 上传图片对象
  private img_file: any = {};
  // markdown配置
  private markdownOption: markdownOption = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true // 预览
  };
  // ctrl+s事件
  private handleEditorSave(value: string, render: string) {
    console.log(value);
  }
  /**
   * 添加图片事件
   */
  private imgAdd(pos: any, file: any) {
    // 第一步.将图片上传到服务器.
    var formdata = new FormData();
    formdata.append("image", file);
    axios({
      url: "server url",
      method: "post",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    }).then(url => {
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      /**
       * $vm 指为mavonEditor实例，可以通过如下两种方式获取
       * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
       * 2. 通过$refs获取: html声明ref
       */
      // this.$refs.markdownEditor.$img2Url(pos, url);
    });
  }
  /**
   * 图片删除
   */
  private imgDel(pos: number) {
    delete this.img_file[pos];
  }
  /**
   * 上传图片回调
   */
  private handleUploadChange(value: string) {}
  /**
   * 表单提交
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.veliDateFields(
      (err: Error, values: ArticleModule.ArticleInfo) => {
        console.log(values);
      }
    );
  }

  created() {
    this.form = this.$form.createForm(this);
  }
}
</script>
<style lang="less" scoped>
</style>