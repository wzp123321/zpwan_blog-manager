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
          v-for="(item,index) in statuses"
          :key="index"
          :value="item.key"
        >{{item.value}}</a-select-option>
      </a-select>
    </div>
    <a-table
      bordered
      :rowKey="rowKey=>rowKey.id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
      @change="handleTableChange"
    ></a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Select } from "ant-design-vue";
import { comment_types } from "@/assets/js/data";
@Component({
  name: "CommentList",
  components: {
    "a-table": Table,
    "a-select": Select,
    "a-select-option": Select.Option
  }
})
export default class CommentList extends Vue {
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
  /**
   * 头部筛选
   */
  private handleStatusChange(status: number) {
    this.searchParams = Object.assign({}, { status });
    if (!status) {
      Vue.delete(this.searchParams, "status");
    }
    this.queryCommentList();
  }
  /**
   * 表格change事件
   */
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.queryCommentList();
  }
  /**
   * 请求数据
   */
  private async queryCommentList() {
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });
  }

  mounted() {
    this.statuses = comment_types;
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