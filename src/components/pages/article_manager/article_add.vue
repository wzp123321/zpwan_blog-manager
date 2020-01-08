<template>
  <div class="article-add">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="标题" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入文章标题!' }] }]" />
      </a-form-item>
      <a-form-item label="封面" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <UploadHandler
          v-decorator="['imgUrl', { rules: [{ required: true, message: '请上传文章封面!' }] }]"
          @change="handleUploadChange"
        ></UploadHandler>
      </a-form-item>
      <a-form-item label="一级目录" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-select
          placeholder="请选择"
          style="width: 320px"
          @change="handleFirstCatalogIdChange"
          v-decorator="['first_catalogId', { rules: [{ required: true, message: '请选择一级目录!' }] }]"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        >
          <a-select-option
            v-for="(item,index) in firstCatalogs"
            :key="index"
            :value="item.id"
          >{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="二级目录" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-select
          :disabled="pId === 0"
          placeholder="请选择"
          style="width: 320px"
          v-decorator="['second_catalogId', { rules: [{ required: true, message: '请选择二级目录!' }] }]"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        >
          <a-select-option
            v-for="(item,index) in secondCatalogs"
            :key="index"
            :value="item.id"
          >{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-textarea placeholder="请输入描述" v-decorator="['description']" :rows="4" />
      </a-form-item>
      <a-form-item label="内容" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 21 }">
        <mavon-editor
          ref="markdownEditor"
          :toolbars="markdownOption"
          @save="handleEditorSave"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          :ishljs="true"
          v-model="content"
        />
        <p style="color:red">{{contentMsg}}</p>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset:14,span: 10 }" style="margin-top:20px">
        <a-button @click="$router.back()" style="width:200px;margin-right:20px">取消</a-button>
        <a-button type="primary" html-type="submit" style="width:200px">新增</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Form, Button, Input, Select } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "ArticleCreate",
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-textarea": Input.TextArea,
    "a-button": Button,
    "a-select": Select,
    "a-select-option": Select.Option,
    UploadHandler
  }
})
export default class ArticleCreate extends Vue
  implements ArticleModule.CatalogArray {
  // form
  private form: any;
  // 编辑器内容
  private content: string = "";
  // 内容提示语
  private contentMsg: string = "";
  // 上传图片对象
  private img_file: any = {};
  // 一级目录数组
  firstCatalogs = [];
  //二级目录数组
  secondCatalogs = [];
  // 选择的一级目录id
  private pId: number = 0;
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
  private async imgAdd(pos: any, file: any) {
    // 第一步.将图片上传到服务器.
    const res: ApiResponse<
      FileInfo
    > = await HttpRequest.UploaderModule.handleFileUploader({
      file
    });
    if (res && res.data) {
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      const markdown: any = this.$refs.markdownEditor;
      markdown.$img2Url(pos, res.data.url);
      return res.data;
    }
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
  private handleUploadChange(file: FileInfo) {
    this.form.setFieldsValue({ imgUrl: file.url });
  }
  /**
   * 一级目录选择
   */
  private handleFirstCatalogIdChange(pId: number) {
    this.pId = pId;
    this.form.setFieldsValue({ second_catalogId: undefined });
    this.querySelectData({ pId }, "secondCatalogs");
  }
  /**
   * 根据id获取详情
   */
  private async getArticleInfoById() {}
  /**
   * 编辑 ---回显数据
   */
  private handleFormDataInsert(values: ArticleModule.ArticleInfo) {}

  /**
   * 编辑文章
   */
  private async handleArticlUpdate(values: ArticleModule.ArticleInfo) {}
  /**
   * 新增文章
   */
  private async handleArticleAdd(values: ArticleModule.ArticleInfo) {}
  /**
   * 表单提交
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: ArticleModule.ArticleInfo) => {
        if (this.content === "") {
          this.contentMsg = "请输入内容!";
          return;
        }
        if (!err) {
          console.log("Received values of form: ", values);
          // 回显要加 class:markdown-body
        }
      }
    );
  }

  /**
   * 请求目录数据
   */
  private async querySelectData(
    params: { [key: string]: any },
    list: "firstCatalogs" | "secondCatalogs"
  ) {
    const res: any = await HttpRequest.DictionaryModule.getCatalogList(
      params
    );

    if (res && res.data) {
      this[list] = res.data.data;
    }
  }

  async created() {
    this.form = this.$form.createForm(this);
    this.querySelectData({ type: 1 }, "firstCatalogs");
  }

  @Watch('content')
  handleContentChange(newVal:string,oldVal:string){
    if(newVal !== ''){
      this.contentMsg = ""
    }
  }
}
</script>
<style lang="less" scoped>
</style>