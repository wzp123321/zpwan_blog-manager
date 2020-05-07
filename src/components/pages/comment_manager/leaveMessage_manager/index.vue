<template>
  <div class="leave-message-wrapper">
    <a-table
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.leave_message_id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
      @change="handleTableChange"
    >
      <template slot="is_shelves" slot-scope="record">
        <a-switch
          :checked="record.is_shelves===1"
          @change="value=>{handleLeaveMessageOper(value,record.leave_message_id,'is_shelves')}"
        ></a-switch>
      </template>
      <template slot="is_good" slot-scope="record">
        <a-switch
          :checked="record.is_good===1"
          @change="value=>{handleLeaveMessageOper(value,record.leave_message_id,'is_good')}"
        ></a-switch>
      </template>
      <template slot="action" slot-scope="record">
        <span
          class="del-span"
          @click="value=>{handleLeaveMessageOper(value,record.leave_message_id,'is_delete')}"
        >删除</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Switch, Modal, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
Vue.prototype.$message = message;
@Component({
  name: "LeaveMessageManage",
  components: {
    "a-table": Table,
    "a-switch": Switch,
    Modal
  }
})
export default class LeaveMessageManage extends Vue {
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
      key: "content",
      title: "内容",
      dataIndex: "content"
    },
    {
      key: "name",
      title: "留言人",
      customRender: (
        text: string,
        record: CommentModule.LeaveMessageInfo,
        index: number
      ) => {
        return record.author.name;
      }
    },
    {
      key: "is_shelves",
      title: "上下架",
      scopedSlots: { customRender: "is_shelves" }
    },
    {
      key: "is_good",
      title: "精品",
      scopedSlots: { customRender: "is_good" }
    },
    {
      key: "create_time",
      title: "留言时间",
      customRender: (
        text: string,
        record: CommentModule.LeaveMessageInfo,
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
        record: CommentModule.LeaveMessageInfo,
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
  //数据源
  private dataSource: Array<CommentModule.LeaveMessageInfo> = [];
  // 操作
  private handleLeaveMessageOper(
    value: boolean,
    leave_message_id: string,
    type: "is_shelves" | "is_good" | "is_delete"
  ) {
    const data = value ? 1 : 0;

    const that = this;
    const title =
      type === "is_shelves"
        ? "确认上下架这条留言吗？"
        : type === "is_good"
        ? "确定设置这条留言为精品吗？"
        : "确认删除这条留言吗？";
    Modal.confirm({
      title,
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        let res: any;
        if (type === "is_shelves") {
          res = await HttpRequest.CommentModule.getLeaveMessageShelves({
            leave_message_id,
            is_shelves: data
          });
        }
        if (type === "is_delete") {
          res = await HttpRequest.CommentModule.getLeaveMessageDelete({
            leave_message_id
          });
        }
        if (type === "is_good") {
          res = await HttpRequest.CommentModule.getLeaveMessageGood({
            leave_message_id,
            is_good: data
          });
        }
        if (res && res.data) {
          that.$message.success("修改成功");
          that.queryLeaveMessageList();
        }
      }
    });
  }
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
  private async queryLeaveMessageList() {
    this.loading = true;
    const { current } = this.pagination;
    const res: ApiResponse<ListResponse<
      Array<CommentModule.LeaveMessageInfo>
    >> = await HttpRequest.CommentModule.getLeaveMessageList({
      page: current
    });
    if (res && res.data) {
      const total: number = res.data.total;
      const dataSource: Array<CommentModule.LeaveMessageInfo> = res.data.data;
      this.pagination.total = total;
      this.dataSource = dataSource;
      this.loading = false;
    }
  }
  mounted() {
    this.$nextTick(() => {
      this.queryLeaveMessageList();
    });
  }
}
</script>
<style lang="less" scoped>
.leave-message-wrapper {
  .del-span {
    color: #06a5ff;
    cursor: pointer;
  }
}
</style>