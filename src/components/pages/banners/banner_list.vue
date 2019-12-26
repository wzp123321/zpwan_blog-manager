<template>
  <div class="banner-wrapper">
    <div class="header">
      <a-button type="primary" @click="()=>{$router.push('/app/banner/add')}">新增banner</a-button>
    </div>
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
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Table } from "ant-design-vue";
@Component({
  name: "BannerList",
  components: {
    "a-button": Button,
    "a-table": Table
  }
})
export default class BannerList extends Vue {
  private loading: boolean = false;
  private columns: Array<ColumnsInfo> = [];
  private dataSource: Array<BannerModule.BannerInfo> = [];
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
}
</script>
<style lang="less" scoped>
.banner-wrapper {
  .header {
    text-align: right;
    margin-right: 10px;
  }
}
</style>