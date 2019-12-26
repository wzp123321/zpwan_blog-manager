<template>
  <div class="dictionary-wrapper">
    <DicHeader></DicHeader>
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
import { Table } from "ant-design-vue";
import DicHeader from "./DicHeader.vue";
@Component({
  name: "DictionaryModule",
  components: {
    "a-table": Table,
    DicHeader
  }
})
export default class DictionaryModule extends Vue {
  // 加载
  private loading: boolean = false;
  // 列数据
  private columns: Array<ColumnsInfo> = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: DictionaryModule.DictionaryInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    }
  ];
  // 源数据
  private dataSource: Array<DictionaryModule.DictionaryInfo> = [
    {
      id: "121212121"
    },
    {
      id: "21244444r66"
    }
  ];
  // 分页数据
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 除了表格change事件
   */
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    sorter: any
  ) {
    console.log(pagination);
  }
}
</script>
<style lang="less" scoped>
</style>