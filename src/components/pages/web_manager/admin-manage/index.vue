<template>
  <div class="admin-wrapper">
    <Button type="primary">新增管理员</Button>
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
        <img :src="record.avatar_url" alt style="width:60px;height:60px;border-radius:4px;" />
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Button } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
@Component({
  name: "AdminListManage",
  components: {
    "a-table": Table,
    Button
  }
})
export default class AdminListManage extends Vue {
  private loading: boolean = false;
  private columns: Array<ColumnsInfo> = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    },
    {
      key: "admin_id",
      title: "ID",
      dataIndex: "admin_id"
    },
    {
      key: "admin_name",
      title: "姓名",
      dataIndex: "admin_name"
    },
    {
      key: "role",
      title: "角色",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
        index: number
      ) => {
        return record.role === 1 ? "超级管理员" : "普通管理员";
      }
    },
    {
      key: "isShelves",
      title: "禁用",
      scopedSlots: { customRender: "isShelves" }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
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
        record: WebManagerModule.AdminInfo,
        index: number
      ) => {
        return formatDate(record.modify_time);
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
  // 数据源
  private dataSource: Array<WebManagerModule.AdminInfo> = [];
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
      Array<WebManagerModule.AdminInfo>
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