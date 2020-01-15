<template>
  <div class="friednly-link-wrapper">
    <div class="header"></div>
    <a-tabel
      bordered
      :rowKey="rowKey=>rowKey.id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]'"
      @change="handleTableChange"
    ></a-tabel>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
@Component({
  name: "FriendlyLink",
  components: {
    "a-table": Table
  }
})
export default class FriendlyLink extends Vue {
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
      key: "name",
      title: "链接名",
      dataIndex: "name"
    },
    {
      key: "url",
      title: "链接地址",
      dataIndex: "url"
    },
    {
      key: "isShelves",
      title: "上架",
      scopedSlots: {
        customRender: "isShelves"
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.FriendlyLinkInfo,
        index: number
      ) => {
        return formatDate(record.create_time);
      }
    },
    {
      key: "modify_time",
      title: "修改时间",
      customRender: (
        text: string,
        record: WebManagerModule.FriendlyLinkInfo,
        index: number
      ) => {
        return formatDate(record.modify_time);
      }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: {
        customRender: "action"
      }
    }
  ];
  private dataSource: Array<{ [key: string]: any }> = [];
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };

  /**
   * 表格change
   */
  private handleTableChange(pagination: any, filters: any, soter: any) {
    this.pagination.current = pagination.current;
    this.queryFriendlyList();
  }
  /**
   * 请求数据
   */
  private async queryFriendlyList() {}
}
</script>
<style lang="less" scoped>
</style>