<template>
  <div class="task-wrapper">
    <div class="tip-content">每天晚上制定明天的任务是一个好习惯哦</div>
    <div class="task-header frs">
      <Button type="primary" @click="handleViewTask">今日任务</Button>
      <Select style="width:120px" placeholder="请选择" @change="handleStatusChange">
        <SelectOption :value="0">未完成</SelectOption>
        <SelectOption :value="1">已完成</SelectOption>
      </Select>
      <DatePicker @change="handleDateSelect" placeholder="选择日期" />
      <Button type="primary" @click="handleCreateTask">新增任务</Button>
      <Button
        type="primary"
        @click="handleTaskBathComplete"
        :disabled="JSON.stringify(selectedRowKeys)==='[]'"
      >批量完成</Button>
    </div>
    <Table
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.task_id"
      :dataSource="dataSource"
      :columns="columns"
      @change="handleTableChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <template slot-scope="text,record" slot="action">
        <span @click="handleTaskEdit(record.id)">编辑</span>
      </template>
    </Table>
    <ToDayTaskList
      :viewVisiable="viewVisiable"
      :todayTasks="todayTasks"
      @viewCancel="()=>{viewVisiable=false}"
    ></ToDayTaskList>
    <OperateTask
      :operateVisiable="operateVisiable"
      :taskInfo="taskInfo"
      @operCancel="()=>{operateVisiable=false}"
      @operSubmit="handleOperateSubmit"
    ></OperateTask>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Table, Input, Select, DatePicker } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import ToDayTaskList from "./my-task.vue";
import OperateTask from "./operate-task.vue";
import { formatDate } from "@/assets/js/index";
@Component({
  name: "TaskManage",
  components: {
    Button,
    Table,
    Input,
    Select,
    SelectOption: Select.Option,
    DatePicker,
    ToDayTaskList,
    OperateTask
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
        return record.priority === 1 ? "低" : "高";
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
        return record.is_complete===0 ? "否" : "是";
      }
    },
    {
      key:'endline',
      title:"截止日期",
      dataIndex:"endline"
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
  // 任务详情
  private taskInfo: WebManagerModule.TaskInfo = {
    title:"踩踩踩踩踩",
    priority:1,
    endline:"2020-03-02"
  };
  // 任务id
  private task_id: string = "";
  // 今日任务数组
  private todayTasks: WebManagerModule.TaskInfo[] = [];
  // 选中的数组
  private selectedRowKeys: WebManagerModule.TaskInfo[] = [];
  // 筛选参数
  private searchParams: { [key: string]: any } = {};
  // change
  private handleTableChange() {}
  // 完成状态筛选
  private handleStatusChange(value: number) {
    console.log(value);
  }
  // 日期筛选
  private handleDateSelect(date: Date, dateString: string) {
    console.log(dateString);
  }
  // 打开新增任务对话框
  private handleCreateTask() {
    this.operateVisiable = true;
  }
  // 打开查看任务对话框
  private handleViewTask() {
    this.viewVisiable = true;
  }
  // 打开编辑对话框
  private handleTaskEdit(id: string) {
    this.task_id = id;
    this.operateVisiable = true;
  }
  // 根据id获取详情
  private getTaskInfoById() {}
  // 新增编辑对话框回调
  private handleOperateSubmit(values: WebManagerModule.TaskInfo) {
    console.log(values);
  }
  // 批量完成
  private handleTaskBathComplete() {}
  // table选择
  private onSelectChange(selectedRowKeys: any) {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.selectedRowKeys = selectedRowKeys;
  }
  // 新增任务
  private getTaskCreate() {}
  // 编辑任务
  private async getTaskEdit() {

  }
  // 请求列表
  private async getTaskList() {
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });
    const res: ApiResponse<ListResponse<
      WebManagerModule.TaskInfo[]
    >> = await HttpRequest.TaskModule.getTaskList(this.searchParams);

    if (res && res.data) {
      const total = res.data.total;
      const dataSource = res.data.data;
      this.pagination.total = total;
      this.dataSource = dataSource;
    }
  }
  created() {
    this.$nextTick(() => {
      this.getTaskList();
    });
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
    .ant-select {
      margin: 0 25px;
    }
    .ant-calendar-picker {
      margin-right: 25px;
    }
    .ant-btn-primary:last-child {
      margin-left: 25px;
    }
  }
}
</style>