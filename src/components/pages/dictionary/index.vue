<template>
  <div class="dictionary-wrapper">
    <div class="frsp">
      <div class="select">
        <Select
          style="width: 120px"
          @change="handleSelectChange"
          placeholder="请选择"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
          :allowClear="true"
        >
          <SelectOption v-for="item in types" :key="item.key" :value="item.key">
            {{
            item.value
            }}
          </SelectOption>
        </Select>
      </div>
      <Button type="primary" @click="()=>{visible= true}">新增字典</Button>
    </div>
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
        <span @click="beforeEditDictionary(record.id)" style="cursor:pointer;color:#06a5ff">编辑</span>
      </template>
    </a-table>
    <DicModal
      v-if="visible"
      :visible="visible"
      :dicInfo="dicInfo"
      :types="types"
      @cancel="handleModalCancel"
      @operation="handleDictionaryOperation"
    ></DicModal>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Modal, Divider, Select, Button } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
import DicModal from "./DicModal.vue";
@Component({
  name: "DictionaryModule",
  components: {
    "a-table": Table,
    Modal,
    Divider,
    Select,
    SelectOption: Select.Option,
    DicModal,
    Button
  }
})
export default class DictionaryModule extends Vue {
  // 加载
  private loading: boolean = false;
  // 搜索参数
  private searchParams: DictionaryModule.SearchParamsInfo = {};
  // 字典对象
  private dicInfo: DictionaryModule.DictionaryInfo = {
    id: 0,
    code: "",
    value: "",
    type: 0,
    description: "",
    pid: 0,
    pcode: "",
    create_time: 0,
    modify_time: 0
  };
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
        return formatDate(record.create_time || 0);
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
  // 新增 编辑对话框开关
  private visible: boolean = false;
  /**
   * 目录类型
   */
  private types: Array<{ [key: string]: any }> = [
    {
      key: 1,
      value: "一级目录"
    },
    {
      key: 2,
      value: "二级目录"
    }
  ];
  /**
   * 顶部筛选
   */
  private handleSelectChange(type: number) {
    if (type) {
      this.searchParams = Object.assign({}, { type });
    }
    this.queryDictionaryList();
  }
  /**
   * 取消
   */
  private handleModalCancel() {
    this.visible = false;
    this.dicInfo = {
      id: 0,
      code: "",
      value: "",
      type: 0,
      description: "",
      pid: 0,
      pcode: "",
      create_time: 0,
      modify_time: 0
    };
  }
  /**
   * 新增编辑回调
   */
  private handleDictionaryOperation(values: DictionaryModule.DictionaryInfo) {
    if (!values.id) {
      // 新增
      this.handleDicAdd(values);
    } else {
      // 编辑
      this.handleDicEdit(values);
    }
  }
  /**
   * 新增
   */
  private async handleDicAdd(values: DictionaryModule.DictionaryInfo) {
    // 如果选择的是一级目录--不传pId
    if (values.type === 1) {
      Vue.delete(values, "pId");
    }
    const res: ApiResponse<
      boolean
    > = await HttpRequest.DictionaryModule.getDictionaryAdd(values);
    if (res && res.code === 200) {
      this.$message.success("新增成功");
      this.queryDictionaryList();
      this.dicInfo = {
        id: 0,
        code: "",
        value: "",
        type: 0,
        description: "",
        pid: 0,
        pcode: "",
        create_time: 0,
        modify_time: 0
      };
      this.visible = false;
    } else {
      throw new Error(res.message);
    }
  }
  /**
   * 编辑前  请求字典详情
   */
  private async beforeEditDictionary(id: number) {
    const res: ApiResponse<
      DictionaryModule.DictionaryInfo
    > = await HttpRequest.DictionaryModule.getDictionaryInfoById({ id });

    if (res && res.data) {
      const dicInfo = res.data;
      this.dicInfo = dicInfo;
      this.visible = true;
    }
  }
  /**
   * 编辑
   */
  private async handleDicEdit(values: DictionaryModule.DictionaryInfo) {
    const res: ApiResponse<
      boolean
    > = await HttpRequest.DictionaryModule.getDictionaryInfoUpdate(values);

    if (res && res.code === 200) {
      this.$message.success("编辑成功");
      this.queryDictionaryList();
      this.dicInfo = {
        id: 0,
        code: "",
        value: "",
        type: 0,
        description: "",
        pid: 0,
        pcode: "",
        create_time: 0,
        modify_time: 0
      };
      this.visible = false;
    } else {
      throw new Error(res.message);
    }
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
    this.pagination.current = pagination.current;
    this.queryDictionaryList();
  }
  created() {
    this.queryDictionaryList();
  }
}
</script>
<style lang="less" scoped>
.dictionary-wrapper {
  position: relative;
}
</style>