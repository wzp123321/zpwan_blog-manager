<template>
  <div class="article-wrapper">
    <ArticleHeader></ArticleHeader>
    <a-table
      style="margin-top:10px"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      bordered
      @change="handleTableChange"
    >
      <template slot="isShelves" slot-scope="text,record">
        <a-switch :checked="record.isShelves ===1" @change="handleisShelvesChange"></a-switch>
      </template>
      <template slot="isRecommend" slot-scope="text,record">
        <a-switch :checked="record.isRecommend ===1" @change="handleIsRecommendChange"></a-switch>
      </template>
      <template slot="isTop" slot-scope="text,record">
        <a-switch :checked="record.isTop===1" @change="handleIsTopChange"></a-switch>
      </template>
      <template slot="action" slot-scope="text,record">
        <span class="action-span" @click="()=>{$router.push(`/app/article/detail/${record.id}`)}">查看</span>
        <a-divider type="vertical" />
        <span class="action-span" @click="()=>{$router.push(`/app/article/edit/${record.id}`)}">编辑</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Switch, Divider } from "ant-design-vue";
import ArticleHeader from "./article_list_header.vue";
import { formatDate } from "@/utils/index";
import axios from "axios";
@Component({
  name: "ArticleList",
  components: {
    "a-table": Table,
    "a-divider": Divider,
    "a-switch": Switch,
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
      key: "title",
      title: "标题",
      dataIndex: "title"
    },
    {
      key: "catalogName",
      title: "所属目录",
      dataIndex: "catalogName"
    },
    {
      key: "description",
      title: "描述",
      dataIndex: "description"
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
        return formatDate(record.createTime);
      }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: { customRender: "action" }
    }
  ];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 表格change事件
   */
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    soter: any
  ) {}
  /**
   * 推荐change事件
   */
  private handleIsRecommendChange(value: boolean) {
    console.log(value);
  }
  /**
   * 置顶change事件
   */
  private handleIsTopChange(value: boolean) {}
  /**
   * 上下架change事件
   */
  private handleisShelvesChange(value: boolean) {}
  created() {
    axios.get("/mock/test").then(res => {
      const list = res.data.data;
      this.dataSource = list;
      this.pagination.total = list.length;
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