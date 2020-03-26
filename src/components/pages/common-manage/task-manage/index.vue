<template>
  <div class="task-wrapper">
    <div class="tip-content">每天晚上置顶明天的任务是一个好习惯哦</div>
    <div class="task-header frsp">
      <Button type="primary" @click="handleViewTask">今日任务</Button>
      <Select style="width:120px" placeholder="请选择" @change="handleStatusChange">
        <SelectOption :value="0">未完成</SelectOption>
        <SelectOption :value="1">已完成</SelectOption>
      </Select>
      <DatePicker @change="handleDateSelect" placeholder="选择日期" />
      <Button type="primary" @click="handleCreateTask">新增任务</Button>
    </div>
    <Table
      :loading="loading"
      bordered
      :dataSource="dataSource"
      :columns="columns"
      @change="handleTableChange"
    ></Table>
    <ToDayTaskList :viewVisiable="viewVisiable" @viewCancel="()=>{viewVisiable=false}"></ToDayTaskList>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Table, Input, Select, DatePicker } from "ant-design-vue";
import ToDayTaskList from "./my-task.vue";
import { formatDate } from "@/assets/js/index";
@Component({
  name: "TaskManage",
  components: {
    Button,
    Table,
    Input,
    Select,
    SelectOption: Select.Option,
    ToDayTaskList,
    DatePicker
  }
})
export default class TaskManage extends Vue {
  private columns: ColumnsInfo[] = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: WebManagerModule.TaskInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    },
    {
      key: "title",
      title: "内容",
      dataIndex: "title"
    },
    {
      key: "priority",
      title: "优先级",
      customRender: (
        text: string,
        record: WebManagerModule.TaskInfo,
        index: number
      ) => {
        return record.priority === 1
          ? "低"
          : record.priority === 2
          ? "中"
          : "高";
      }
    },
    {
      key: "is_complete",
      title: "完成",
      customRender: (
        text: string,
        record: WebManagerModule.TaskInfo,
        index: number
      ) => {
        return record.is_complete ? "否" : "是";
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.TaskInfo,
        index: number
      ) => {
        return formatDate(record.create_time || 0);
      }
    },
    {
      key: "modify_time",
      title: "修改时间",
      customRender: (
        text: string,
        record: WebManagerModule.TaskInfo,
        index: number
      ) => {
        return formatDate(record.modify_time || 0);
      }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: { customRender: "action" }
    }
  ];
  private dataSource: WebManagerModule.TaskInfo[] = [];
  private loading: boolean = false;
  private pagination: PaginationInfo = {
    current: 1,
    total: 0
  };
  // 今日任务对话框开关
  private viewVisiable: boolean = false;
  // 操作任务对话框开关
  private operateVisiable: boolean = false;
  // change
  private handleTableChange() {}
  // 打开新增任务对话框
  private handleCreateTask() {
    this.operateVisiable = true;
  }
  // 完成状态筛选
  private handleStatusChange(value: number) {
    console.log(value);
  }
  // 日期筛选
  private handleDateSelect(date: Date, dateString: string) {
    console.log(dateString);
  }
  // 打开查看任务对话框
  private handleViewTask() {
    this.viewVisiable = true;
  }
}
</script>
<style lang="less" scoped>
.task-wrapper {
  position: relative;
  .tip-content {
    font-size: 12px;
    padding: 3px;
    background: #eee;
    color: #31c27c;
  }
  .task-header {
    margin: 10px 0;
  }
}
</style>