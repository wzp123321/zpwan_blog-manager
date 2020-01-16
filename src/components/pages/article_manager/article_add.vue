<template>
  <div class="article-add" ref="article_add">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="标题" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入文章标题!' }] }]" />
      </a-form-item>
      <a-form-item label="封面" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <UploadHandler
          v-decorator="['imgUrl', { rules: [{ required: true, message: '请上传文章封面!' }] }]"
          :imgUrl="imgUrl"
          @change="handleUploadChange"
        ></UploadHandler>
      </a-form-item>
      <a-form-item label="标签" :label-col="{ span: 3 }" :wrapper-col="{ offset:1,span: 10 }">
        <a-select
          placeholder="请选择文章标签"
          mode="tags"
          v-decorator="['tags', { rules: [{ required: true, message: '请选择文章标签!' }] }]"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        >
          <a-select-option
            v-for="(item,index) in tags"
            :key="index"
            :value="item.code"
          >{{item.value}}</a-select-option>
        </a-select>
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
        <!-- https://github.com/StarSky1/blog/issues/13 -->

        <!--Todo 数据库修改成支持表情 -->
        <mavon-editor
          ref="markdownEditor"
          @change="handleMarkdownChange"
          @save="handleEditorSave"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          :ishljs="true"
          :toolbars="toolbars"
          v-model="content"
        />
        <p style="color:red">{{contentMsg}}</p>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset:14,span: 10 }" style="margin-top:20px">
        <a-button @click="$router.back()" style="width:160px;margin-right:20px">取消</a-button>
        <a-button type="primary" html-type="submit" style="width:160px">确认</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Form, Button, Input, Select } from "ant-design-vue";
import UploadHandler from "@/components/Uploader.vue";
import HttpRequest from "@/assets/api/modules/index";
import { handleFileUpload } from "@/assets/api/upload";
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/highlightjs/highlight.min.js";
import "mavon-editor/dist/katex/katex";

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
  // 编辑器html代码
  private html: string = "";
  // 内容提示语
  private contentMsg: string = "";
  // 上传图片对象
  private img_file: any = {};
  // 上传封面url
  private imgUrl: string = "";
  // 一级目录数组
  firstCatalogs = [];
  //二级目录数组
  secondCatalogs = [];
  // tags数组
  private tags: Array<DictionaryModule.TagInfo> = [];
  // 选择的一级目录id
  private pId: number = 0;
  private toolbars:{[key:string]:any}= {
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
      preview: true, // 预览
  }
  // ctrl+s事件
  private handleEditorSave(value: string, render: string) {
    console.log(value);
  }
  /**
   * 编辑器change事件
   */
  handleMarkdownChange(value: any, render: any) {
    // <!-- https://github.com/markdown-it/markdown-it-emoji -->
    // <!-- https://github.com/highlightjs/highlight.js -->
    // https://github.com/hinesboy/mavonEditor
    this.html = render;
  }
  /**
   * 添加图片事件
   */
  private async imgAdd(pos: any, file: any) {
    // 第一步.将图片上传到服务器.
    await handleFileUpload(file, (res: ApiResponse<FileInfo>) => {
      if (res && res.data) {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        const markdown: any = this.$refs.markdownEditor;
        markdown.$img2Url(pos, res.data.url);
      }
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
  private handleUploadChange(url: string) {
    this.imgUrl = url;
    this.form.setFieldsValue({ imgUrl: url });
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
  private async getArticleInfoById() {
    const id = this.$route.params.id;
    const res: ApiResponse<ArticleModule.ArticleInfo> = await HttpRequest.ArticleModule.getArticleInfoById(
      { id }
    );

    if (res && res.data) {
      this.handleFormDataInsert(res.data);
    }
  }
  /**
   * 编辑 ---回显数据
   */
  private handleFormDataInsert(values: ArticleModule.ArticleInfo) {
    const {
      title,
      imgUrl,
      description,
      content,
      tags,
      first_catalogId,
      second_catalogId
    } = values;
    this.pId = first_catalogId || 0;
    this.imgUrl = imgUrl || "";
    this.form.setFieldsValue({
      title,
      content,
      imgUrl,
      description,
      tags: tags ? tags.split(",") : [],
      first_catalogId,
      second_catalogId
    });
    this.content = content || "";
    this.querySelectData({ pId: first_catalogId }, "secondCatalogs");
  }

  /**
   * 编辑文章
   */
  private async handleArticlUpdate(values: any) {
    const id = this.$route.params.id;
    const {
      title,
      imgUrl,
      tags,
      description,
      first_catalogId,
      second_catalogId
    } = values;
    const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleUpdate(
      {
        id,
        title,
        description,
        imgUrl: imgUrl,
        tags: tags.join(","),
        first_catalogId,
        second_catalogId,
        content: this.html
      }
    );

    if (res && res.data) {
      this.$message.success("编辑成功");
      this.$router.push("/app/article/list");
    } else {
      this.$message.error("编辑失败");
    }
  }
  /**
   * 新增文章
   */
  private async handleArticleAdd(values: any) {
    const {
      title,
      imgUrl,
      tags,
      description,
      first_catalogId,
      second_catalogId
    } = values;
    const res: ApiResponse<boolean> = await HttpRequest.ArticleModule.getArticleAdd(
      {
        title,
        description,
        imgUrl: imgUrl,
        tags: tags.join(","),
        first_catalogId,
        second_catalogId,
        content: this.html
      }
    );

    if (res && res.data) {
      this.$message.success("新增成功");
      this.$router.push("/app/article/list");
    } else {
      this.$message.error("新增失败");
    }
  }
  /**
   * 表单提交
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(async (err: Error, values: any) => {
      if (this.content === "") {
        this.contentMsg = "请输入内容!";
        return;
      }
      if (!err) {
        if (this.$route.path.includes("edit")) {
          this.handleArticlUpdate(values);
        } else {
          this.handleArticleAdd(values);
        }
      }
    });
  }

  /**
   * 请求目录数据
   */
  private async querySelectData(
    params: { [key: string]: any },
    list: "firstCatalogs" | "secondCatalogs"
  ) {
    const res: any = await HttpRequest.DictionaryModule.getCatalogList(params);

    if (res && res.data) {
      this[list] = res.data.data;
    }
  }
  /**
   * 请求列表
   */
  private async getTagList() {
    let page = 1;
    const queryAll = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<DictionaryModule.TagInfo>
      >> = await HttpRequest.DictionaryModule.getTagList({ page });
      if (res && res.data) {
        const data = res.data.data;
        this.tags = [...this.tags, ...data];
        if (res.data.total > this.tags.length) {
          queryAll(page + 1);
        }
      }
    };
    queryAll(page);
  }
  // mounted() {
  //   this.$nextTick(() => {
  //     const articleadd: any = this.$refs.article_add;
  //     this.totalHeight =
  //       articleadd.offsetHeight - document.documentElement.clientHeight + 64;
  //     articleadd.parentNode.addEventListener(
  //       "scroll",
  //       () => {
  //         var scrollTop = articleadd.parentNode.scrollTop;
  //         this.currentHeight = scrollTop;
  //       },
  //       true
  //     );
  //   });
  // }
  async created() {
    this.form = this.$form.createForm(this);

    this.getTagList();
    this.querySelectData({ type: 1 }, "firstCatalogs");
    /**
     * 判断是否是编辑
     */
    if (this.$route.path.includes("edit")) {
      this.getArticleInfoById();
    }
  }

  @Watch("content")
  handleContentChange(newVal: string, oldVal: string) {
    if (newVal !== "") {
      this.contentMsg = "";
    }
  }
}
</script>
<style lang="less" scoped>
</style>