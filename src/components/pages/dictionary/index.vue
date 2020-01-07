<template>
  <div class="dictionary-wrapper">
    <DicHeader @change="handleSelectChange" @add="handleDicAdd"></DicHeader>
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
      <template slot="action" slot-scope="text,record">
        <span @click="handleDicDelete(record.id)" style="cursor:pointer;color:#06a5ff">删除</span>
        <Divider type="vertical" />
        <!-- 明天重构这里 -->
         <!-- <span @click="handleDicUpdate(record.id)" style="cursor:pointer;color:#06a5ff">编辑</span> -->
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Modal,Divider } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
import DicHeader from "./DicHeader.vue";
@Component({
  name: "DictionaryModule",
  components: {
    "a-table": Table,
    Modal,
    Divider,
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
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: { customRender: "action" }
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
   * 新增回调
   */
  private handleDicAdd(){
    this.queryDictionaryList();
  }
  /**
   * 删除
   */
  private handleDicDelete(id: number) {
    const that = this;
    Modal.confirm({
      title: "删除目录",
      content: "确认删除吗?",
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<
          boolean
        > = await HttpRequest.DictionaryModule.getDictionaryDelete({ id });

        if (res && res.data) {
          that.$message.success("删除成功");
          that.queryDictionaryList();
        }
      }
    });
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
      ListResponse<Array<DictionaryModule.DictionaryInfo>>
    > = await HttpRequest.DictionaryModule.getDictionaryList(this.searchParams);

    if (res && res.data) {
      const dataSource = res.data.data;
      this.dataSource = dataSource;
      const total = res.data.total;
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
    this.queryDictionaryList();
  }
}
</script>
<style lang="less" scoped>
.dictionary-wrapper{
  position: relative;
}
</style>