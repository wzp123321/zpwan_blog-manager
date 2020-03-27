<template>
  <div class="comment-wrapper">
    <div class="comment-header">
      <a-select
        :allowClear="true"
        style="width:120px"
        placeholder="请选择"
        @change="handleStatusChange"
        :getPopupContainer="triggerNode=>{
          return triggerNode.parentNode || document.body
        }"
      >
        <a-select-option
          v-for="(item,index) in articles"
          :key="index"
          :value="item.id"
        >{{item.title}}</a-select-option>
      </a-select>
    </div>
    <a-table
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
      @change="handleTableChange"
    >
      <template slot="is_delete" slot-scope="text,record">
        <span @click="handleCommentDelete(record.id)" style="color:#06a5ff;cursor:pointer">删除</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Select, Modal, message } from "ant-design-vue";
import { comment_types } from "@/assets/js/data";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
Vue.prototype.$message = message;
@Component({
  name: "CommentList",
  components: {
    "a-table": Table,
    "a-select": Select,
    "a-select-option": Select.Option,
    Modal
  }
})
export default class CommentList extends Vue {
  private loading: boolean = false;
  private columns: Array<ColumnsInfo> = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    },
    {
      key: "article_name",
      title: "所属文章",
      dataIndex: "article_name"
    },
    {
      key: "author",
      title: "评论人",
      customRender: (
        text: string,
        record: CommentModule.CommentInfo,
        index: number
      ) => {
        return record.author.name;
      }
    },
    {
      key: "content",
      title: "评论内容",
      dataIndex: "content"
    },
    {
      key: "is_root",
      title: "父级评论",
      customRender: (
        text: string,
        record: CommentModule.CommentInfo,
        index: number
      ) => {
        return record.is_root;
      }
    },
    {
      key: "ups",
      title: "点赞数",
      dataIndex: "ups"
    },
    {
      key: "downs",
      title: "点踩数",
      dataIndex: "downs"
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: CommentModule.CommentInfo,
        index: number
      ) => {
        return formatDate(record.create_time);
      }
    },
    {
      key: "is_delete",
      title: "操作",
      scopedSlots: { customRender: "is_delete" }
    }
  ];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  // 数据源
  private dataSource: Array<CommentModule.CommentInfo> = [];
  // 状态数组
  private statuses: Array<{ [key: string]: any }> = [];
  // 搜索参数
  private searchParams: { [key: string]: any } = {};
  // 文章数组
  private articles: Array<ArticleModule.ArticleInfo> = [];
  /**
   * 头部筛选
   */
  private handleStatusChange(article_id: string) {
    this.searchParams = Object.assign({}, { article_id });
    if (!article_id) {
      Vue.delete(this.searchParams, "article_id");
    }
    this.queryCommentList();
  }
  /**
   * 删除评论
   */
  private handleCommentDelete(id: string) {
    const that = this;
    Modal.confirm({
      title: "删除评论",
      content: "确认删除该评论嘛?",
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<boolean> = await HttpRequest.CommentModule.getCommentDelete(
          { id }
        );
        if (res && res.data) {
          that.$message.success("删除成功");
          that.queryCommentList();
        }
      }
    });
  }
  /**
   * 表格change事件
   */
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.queryCommentList();
  }
  /**
   * 递归请求文章
   */
  private getArticleList() {
    const page: number = 1;
    const queryAll = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<ArticleModule.ArticleInfo>
      >> = await HttpRequest.ArticleModule.getArticleList({ page });

      if (res && res.data) {
        const data = res.data.data;
        this.articles = [...this.articles, ...data];
        if (res.data.total > this.articles.length) {
          queryAll(page + 1);
        }
      }
    };
    queryAll(page);
  }
  /**
   * 请求数据
   */
  private async queryCommentList() {
    this.loading = true;
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });

    const res: ApiResponse<ListResponse<
      Array<CommentModule.CommentInfo>
    >> = await HttpRequest.CommentModule.getCommentList(this.searchParams);

    if (res && res.data) {
      const dataSource = res.data.data;
      const total = res.data.total;
      this.dataSource = this.operateComment(dataSource);
      this.pagination.total = total;
      this.loading = false;
      if (total >= 10 && dataSource.length === 0) {
        this.pagination.current -= 1;
        this.queryCommentList();
      }
    }
  }
  private operateComment(
    datas: CommentModule.CommentInfo[]
  ): CommentModule.CommentInfo[] {
    let newData: CommentModule.CommentInfo[] = [];
    datas.forEach(async item => {
      const res: ApiResponse<ArticleModule.ArticleInfo> = await HttpRequest.ArticleModule.getArticleInfoById(
        { id: item.article_id }
      );
      if (res && res.data) {
        let newItem = Object.assign(item, { article_name: res.data.title });
        newData.push(newItem);
      }
    });
    return newData;
  }
  mounted() {
    this.statuses = comment_types;
    this.queryCommentList();
    this.getArticleList();
  }
}
</script>
<style lang="less" scoped>
.comment-wrapper {
  position: relative;
  .comment-header {
    padding: 10px 0;
  }
}
</style>