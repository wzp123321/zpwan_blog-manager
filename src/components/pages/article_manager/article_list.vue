<template>
  <div class="article-wrapper">
    <ArticleHeader></ArticleHeader>
    <a-table
      style="margin-top:10px"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) === '[]' ? false :pagination"
      :loading="loading"
      bordered
      @change="handleTableChange"
    >
      <template slot="isShelves" slot-scope="text,record">
        <a-switch
          :checked="record.isShelves ===1"
          @change="(value)=>{
          handleSwitchChange('isShelves',value)
          }"
        ></a-switch>
      </template>
      <template slot="isRecommend" slot-scope="text,record">
        <a-switch
          :checked="record.isRecommend ===1"
          @change="(value)=>{
          handleSwitchChange('isRecommend',value)
          }"
        ></a-switch>
      </template>
      <template slot="isTop" slot-scope="text,record">
        <a-switch
          :checked="record.isTop===1"
          @change="(value)=>{
          handleSwitchChange('isTop',value)
          }"
        ></a-switch>
      </template>
      <template slot="action" slot-scope="text,record">
        <span class="action-span" @click="()=>{$router.push(`/app/article/detail/${record.id}`)}">查看</span>
        <a-divider type="vertical" />
        <span class="action-span" @click="()=>{$router.push(`/app/article/edit/${record.id}`)}">编辑</span>
        <a-divider type="vertical" />
        <span class="action-span" @click="handleArticleDel(record.id)">删除</span>
      </template>
    </a-table>
  </div>
</template>
// visitVount ---visit_count
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Switch, Divider } from "ant-design-vue";
import ArticleHeader from "./article_list_header.vue";
import { formatDate } from "@/utils/index";
import HttpRequest from "@/assets/api/modules/index";
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
      customRender:(text:string,record:ArticleModule.ArticleInfo,index:number)=>{
        return record.first_catalogName+'---'+record.second_catalogName
      }
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
        return formatDate(record.create_time);
      }
    },
    {
      key: "action",
      title: "操作",
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
    this.searchParams = Object.assign(this.searchParams, params);
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
  private handleSwitchChange(type: string, value: boolean) {
    const method: string = "";
    console.log(value);
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
    const res: ApiResponse<
      ListResponse<Array<ArticleModule.ArticleInfo>>
    > = await HttpRequest.ArticleModule.getArticleList(this.searchParams);
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