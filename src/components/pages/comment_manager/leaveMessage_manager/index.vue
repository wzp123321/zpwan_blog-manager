<template>
  <div class="leave-message-wrapper">
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
@Component({
  name: "LeaveMessageManage",
  components: {
    "a-table": Table
  }
})
export default class LeaveMessageManage extends Vue {
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
  //数据源
  private dataSource: Array<CommentModule.LeaveMessageInfo> = [];
  /**
   * 表格change
   */
  private handleTableChange(pagination: any, filter: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.queryLeaveMessageList();
  }
  /**
   * 请求数据
   */
  private async queryLeaveMessageList() {}
}
</script>
<style lang="less" scoped>
</style>