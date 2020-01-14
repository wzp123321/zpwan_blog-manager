<template>
  <div class="article-wrapper">
    <ArticleHeader @change="handleHeaderSelect"></ArticleHeader>
    <a-table
      style="margin-top:10px"
      :scroll="{ x: 1100 }"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) === '[]' ? false :pagination"
      :loading="loading"
      bordered
      @change="handleTableChange"
    >
      <template slot="tags" slot-scope="text,record">
        <Tag v-for="(item,index) in record.tags.split(',')" :key="index" color="green">{{item}}</Tag>
      </template>
      <template slot="isShelves" slot-scope="text,record">
        <a-switch
          :checked="record.isShelves ===1"
          @change="(value)=>{
          handleSwitchChange('isShelves',value,record.id)
          }"
        ></a-switch>
      </template>
      <template slot="isRecommend" slot-scope="text,record">
        <a-switch
          :checked="record.isRecommend === 1"
          @change="(value)=>{
          handleSwitchChange('isRecommend',value,record.id)
          }"
        ></a-switch>
      </template>
      <template slot="isTop" slot-scope="text,record">
        <a-switch
          :checked="record.isTop===1"
          @change="(value)=>{
          handleSwitchChange('isTop',value,record.id)
          }"
        ></a-switch>
      </template>
      <template slot="action" slot-scope="text,record">
        <span class="action-span" @click="()=>{$router.push(`/app/article/detail/${record.id}`)}">查看</span>
        <a-divider type="vertical" />
        <span class="action-span" @click="()=>{$router.push(`/app/article/edit/${record.id}`)}">编辑</span>
        <a-divider type="vertical" />
        <span
          class="action-span"
          @click="()=>{
          handleSwitchChange('isDelete',false,record.id)
          }"
        >删除</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Switch, Divider, Modal, message, Tag } from "ant-design-vue";
import ArticleHeader from "./article_list_header.vue";
import { formatDate } from "@/assets/js/index";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;

@Component({
  name: "ArticleList",
  components: {
    "a-table": Table,
    "a-divider": Divider,
    "a-switch": Switch,
    Tag,
    Modal,
    ArticleHeader
  }
})
export default class ArticleList extends Vue {
  // 加载
  private loading: boolean = false;
  // 数据源
  private dataSource: Array<ArticleModule.ArticleInfo> = [];
  // 列数据
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
      key: "id",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title"
    },
    {
      key: "catalogName",
      title: "所属目录",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
        index: number
      ) => {
        return record.first_catalogName + "/" + record.second_catalogName;
      }
    },
    {
      key: "description",
      title: "描述",
      dataIndex: "description"
    },
    {
      key: "tags",
      title: "标签",
      scopedSlots: { customRender: "tags" }
    },
    {
      key: "isShelves",
      title: "上架",
      scopedSlots: { customRender: "isShelves" }
    },
    {
      key: "isRecommend",
      title: "推荐",
      scopedSlots: { customRender: "isRecommend" }
    },
    {
      key: "isTop",
      title: "置顶",
      scopedSlots: { customRender: "isTop" }
    },
    {
      key: "createTime",
      title: "创建时间",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
        index: number
      ) => {
        return formatDate(record.create_time || 0);
      }
    },
    {
      key: "modify_time",
      title: "修改时间",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
        index: number
      ) => {
        return formatDate(record.modify_time || 0);
      }
    },
    {
      key: "action",
      title: "操作",
      fixed: "right",
      scopedSlots: { customRender: "action" }
    }
  ];
  // 搜索数据
  private searchParams: { [key: string]: any } = {};
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 头部筛选
   */
  private handleHeaderSelect(params: ArticleModule.SearchParams) {
    this.searchParams = Object.assign({}, params);
    this.pagination.current = 1;
    this.queryArticleList();
  }
  /**
   * 表格change事件
   */
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    soter: any
  ) {}
  /**
   * 删除文章
   */
  private handleArticleDel(id: string) {}
  /**
   * 推荐change事件
   */
  private handleSwitchChange(
    type: "isRecommend" | "isShelves" | "isTop" | "isDelete",
    value: boolean,
    id: string
  ) {
    let method: string = "";
    let title: string = "";
    let content: string = "";
    let params: { [key: string]: any } = {};
    const that = this;
    switch (type) {
      case "isRecommend":
        method = "getArticleRecommend";
        title = "文章推荐";
        content = "确认推荐文章吗?";
        params = {
          id,
          recommend: value ? 0 : 1
        };
        break;
      case "isShelves":
        method = "getArticleShelves";
        title = "文章上下架";
        content = "确认上下架文章吗?";
        params = {
          id,
          shelves: value ? 0 : 1
        };
        break;
      case "isTop":
        method = "getArticleTop";
        title = "文章置顶";
        content = "确认置顶文章吗?";
        params = {
          id,
          top: value ? 0 : 1
        };
        break;
      case "isDelete":
        method = "getArticleDelete";
        title = "文章删除";
        content = "确认删除文章吗?";
        params = {
          id
        };
        break;
    }
    Modal.confirm({
      title,
      content,
      maskClosable: true,
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const articleReq: tplotOptions = HttpRequest.ArticleModule;
        const res: ApiResponse<boolean> = await articleReq[method](params);
        if (res && res.data) {
          that.$message.success("操作成功");
          that.queryArticleList();
        } else {
          that.$message.error("操作失败");
        }
      }
    });
  }
  /**
   * 请求数据
   */
  private async queryArticleList() {
    this.loading = true;
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleList(this.searchParams);
    if (res && res.data) {
      const total = res.data.total;
      this.pagination.total = total;
      const dataSource = res.data.data;
      this.dataSource = dataSource;
      this.loading = false;
      if (dataSource.length === 0 && total >= 10) {
        this.pagination.current -= 1;
        this.queryArticleList();
      }
    }
  }
  created() {
    this.$nextTick(() => {
      this.queryArticleList();
    });
  }
}
</script>
<style lang="less" scoped>
.action-span {
  color: #06a5ff;
  cursor: pointer;
}
</style>