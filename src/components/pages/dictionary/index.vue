<template>
  <div class="dictionary-wrapper">
    <DicHeader @change="handleSelectChange"></DicHeader>
    <a-table
      style="margin-top:10px"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) === '[]' ? false : pagination"
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
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
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
  // 搜索参数
  private searchParams: DictionaryModule.SearchParamsInfo = {};
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
    },
    {
      key: "code",
      title: "code",
      dataIndex: "code"
    },
    {
      key: "value",
      title: "value",
      dataIndex: "value"
    },
    {
      key: "type",
      title: "类型",
      customRender: (
        text: string,
        record: DictionaryModule.DictionaryInfo,
        index: number
      ) => {
        return record.type === 1 ? "一级目录" : "二级目录";
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: DictionaryModule.DictionaryInfo,
        index: number
      ) => {
        return formatDate(record.create_time);
      }
    }
  ];
  // 源数据
  private dataSource: Array<DictionaryModule.DictionaryInfo> = [];
  // 分页数据
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 顶部筛选
   */
  private handleSelectChange(params: { [key: string]: any }) {
    this.searchParams = Object.assign({}, params);
    this.queryDictionaryList();
  }
  /**
   * 请求字典列表数据
   */
  private async queryDictionaryList() {
    this.loading = true;
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });
    const res: ApiResponse<
      Array<DictionaryModule.DictionaryInfo>
    > = await HttpRequest.DictionaryModule.getDictionaryList(this.searchParams);

    if (res && res.data) {
      console.log(res.data);
      this.loading = false;
    }
  }
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
  created() {
    // this.queryDictionaryList();
  }
}
</script>
<style lang="less" scoped>
</style>