<template>
  <a-table
    bordered
    :loading="loading"
    :rowKey="rowKey=>rowKey.user_id"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
    @change="handleTableChange"
  >
    <template slot="avatar_url" slot-scope="text,record">
      <img :src="record.avatar_url" alt style="width:60px;height:60px;border-radius:4px;"/>
    </template>
  </a-table>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "TouristManage",
  components: {
    "a-table": Table
  }
})
export default class TouristManage extends Vue {
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
      key: "user_id",
      title: "游客ID",
      dataIndex: "user_id"
    },
    {
      key: "name",
      title: "游客名",
      dataIndex: "name"
    },
    {
      key: "avatar_url",
      title: "头像",
      scopedSlots: { customRender: "avatar_url" }
    },
    {
      key: "location",
      title: "地址",
      dataIndex: "location"
    }
  ];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  // 数据源
  private dataSource: Array<WebManagerModule.UserInfo> = [];
  /**
   * 表格change事件
   */
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.queryTouristList();
  }
  /**
   * 请求数据
   */
  private async queryTouristList() {
    this.loading = true;

    const res: ApiResponse<ListResponse<
      Array<WebManagerModule.UserInfo>
    >> = await HttpRequest.AdminModule.geTouristList({
      page: this.pagination.current,
      limit: 10
    });

    if (res && res.data) {
      const dataSource = res.data.data;
      const total = res.data.total;
      this.dataSource = dataSource;
      this.pagination.total = total;
      this.loading = false;
      if (total >= 10 && dataSource.length === 0) {
        this.pagination.current -= 1;
        this.queryTouristList();
      }
    }
  }

  mounted() {
    this.queryTouristList();
  }
}
</script>
<style lang="less" scoped>
</style>