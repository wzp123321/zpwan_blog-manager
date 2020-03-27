<template>
  <div class="task-wrapper">
    <div class="tip-content">每天制定任务是一个好习惯</div>
    <div class="task-header frs">
      <Button type="primary" @click="handleViewTask">今日任务</Button>
      <Select
        style="width:120px;margin-right:0"
        placeholder="完成状态"
        @change="handleStatusChange"
        :allowClear="true"
      >
        <SelectOption :value="0">未完成</SelectOption>
        <SelectOption :value="1">已完成</SelectOption>
      </Select>
      <Select
        style="width:120px"
        placeholder="优先级"
        @change="handlePriorityChange"
        :allowClear="true"
      >
        <SelectOption :value="1">低</SelectOption>
        <SelectOption :value="2">高</SelectOption>
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
      :pagination="dataSource.length===0 ? false:pagination"
      :dataSource="dataSource"
      :columns="columns"
      @change="handleTableChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <template slot-scope="text,record" slot="action">
        <span style="color:#06a5ff;cursor:pointer" @click="handleTaskEdit(record.task_id)">编辑</span>
        <Divider type="vertical"></Divider>
        <span style="color:#06a5ff;cursor:pointer" @click="handleTaskDelete(record.task_id)">删除</span>
      </template>
    </Table>
    <Modal
      style="position:relative"
      :title="task_id ===''?'新增明日任务':'编辑任务'"
      :visible="operateVisiable"
      @ok="handleOperateSubmit"
      @cancel="()=>{operateVisiable =false}"
      okText="确认"
      cancelText="取消"
    >
      <Form :form="form" @submit="handleOperateSubmit">
        <FormItem label="内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            placeholder="请输入任务内容"
            v-decorator="['title', { rules: [{ required: true, message: '请输入任务内容!' }] }]"
          />
        </FormItem>
        <FormItem label="优先级" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Select
            placeholder="请选择任务优先级"
            v-decorator="[
          'priority',
          { rules: [{ required: true, message: '请选择任务优先级!' }] },
        ]"
            :getPopupContainer="triggerNode=>{
            return triggerNode.parentNode || document.body
        }"
          >
            <SelectOption
              v-for="(item,index) in priorities"
              :key="index"
              :value="item.key"
            >{{item.value}}</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="截止日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <DatePicker
            placeholder="请选择截止日期"
            v-decorator="[
          'endline',
          { rules: [{ required: true, message: '请选择任务优先级!' }] },
        ]"
            :getCalendarContainer="triggerNode=>{
            return triggerNode.parentNode || document.body
        }"
          ></DatePicker>
        </FormItem>
      </Form>
    </Modal>
    <ToDayTaskList
      :viewVisiable="viewVisiable"
      :todayTasks="todayTasks"
      @viewCancel="()=>{viewVisiable=false}"
    ></ToDayTaskList>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  Button,
  Table,
  Input,
  Select,
  DatePicker,
  Modal,
  Form,
  Divider,
  message
} from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import ToDayTaskList from "./my-task.vue";
import { formatDate } from "@/assets/js/index";
import moment from "moment";
Vue.prototype.moment = moment;
Vue.prototype.$message = message;
@Component({
  name: "TaskManage",
  components: {
    Button,
    Table,
    Input,
    Select,
    SelectOption: Select.Option,
    DatePicker,
    Modal,
    Form,
    FormItem: Form.Item,
    Divider,
    ToDayTaskList
  }
})
export default class TaskManage extends Vue {
  private form!: any;
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
        return record.is_complete === 0 ? "否" : "是";
      }
    },
    {
      key: "endline",
      title: "截止日期",
      dataIndex: "endline"
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
  // 任务id
  private task_id: string = "";
  // 今日任务数组
  private todayTasks: WebManagerModule.TaskInfo[] = [];
  // 选中的数组
  private selectedRowKeys: WebManagerModule.TaskInfo[] = [];
  // 筛选参数
  private searchParams: { [key: string]: any } = {};
  private priorities: Array<{ [key: string]: any }> = [
    {
      key: 1,
      value: "低"
    },
    {
      key: 2,
      value: "高"
    }
  ];
  // change
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.getTaskList();
  }

  // 完成优先级筛选
  private handlePriorityChange(value: number) {
    this.pagination.current = 1;
    this.searchParams = Object.assign(
      {},
      {
        priority: value
      }
    );
    if (JSON.stringify(value) === "undefined") {
      Vue.delete(this.searchParams, "priority");
    }
    this.getTaskList();
  }
  // 完成状态筛选
  private handleStatusChange(value: number) {
    this.pagination.current = 1;
    this.searchParams = Object.assign(
      {},
      {
        is_complete: value
      }
    );
    if (JSON.stringify(value) === "undefined") {
      Vue.delete(this.searchParams, "is_complete");
    }
    this.getTaskList();
  }
  // 日期筛选
  private handleDateSelect(date: Date, dateString: string) {
    this.pagination.current =1 ;
    this.searchParams = Object.assign(
      {},
      {
        endline: dateString
      }
    );
    if (JSON.stringify(dateString) === "undefined") {
      Vue.delete(this.searchParams, "dateString");
    }
    this.getTaskList();
  }
  // 打开新增任务对话框
  private handleCreateTask() {
    this.task_id = "";
    this.form.resetFields();
    this.operateVisiable = true;
  }
  // 打开查看任务对话框
  private async handleViewTask() {
    this.viewVisiable = true;
    const res: ApiResponse<ListResponse<
      WebManagerModule.TaskInfo[]
    >> = await HttpRequest.TaskModule.getTaskList({
      endline: moment(new Date()).format("YYYY-MM-DD")
    });

    if (res && res.data) {
      const dataSource = res.data.data;
      this.todayTasks = dataSource;
    }
  }
  // 打开编辑对话框
  private async handleTaskEdit(task_id: string) {
    this.task_id = task_id;
    this.operateVisiable = true;
    const res: ApiResponse<WebManagerModule.TaskInfo> = await HttpRequest.TaskModule.getTaskInfoById(
      { task_id }
    );

    if (res && res.data) {
      const { title, priority, endline } = res.data;
      this.form.setFieldsValue({
        title,
        priority,
        endline: moment(endline, "YYYY-MM-DD")
      });
    }
  }
  // 新增编辑对话框回调
  private handleOperateSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.TaskInfo) => {
        if (!err) {
          if (this.task_id === "") {
            this.getTaskCreate(values);
          } else {
            this.getTaskEdit(values);
          }
        }
      }
    );
  }
  // 批量完成
  private async handleTaskBathComplete() {
    const task_ids = this.selectedRowKeys.join(",");
    const res: ApiResponse<boolean> = await HttpRequest.TaskModule.getTaskBathComplete(
      { task_ids }
    );

    if (res && res.data) {
      this.$message.success("已批量完成");
      this.selectedRowKeys = [];
      this.getTaskList();
    }
  }
  // table选择
  private onSelectChange(selectedRowKeys: any) {
    this.selectedRowKeys = selectedRowKeys;
  }
  // 删除
  private async handleTaskDelete(task_id: string) {
    const res:ApiResponse<boolean> = await HttpRequest.TaskModule.getTaskDeleteById({task_id})

    if(res && res.data){
      this.$message.success("删除成功");
      this.getTaskList();
    }
  }
  // 新增任务
  private async getTaskCreate(values: WebManagerModule.TaskInfo) {
    const { title, priority, endline } = values;
    const res: ApiResponse<boolean> = await HttpRequest.TaskModule.getTaskAdd({
      title,
      priority,
      endline: moment(endline).format("YYYY-MM-DD")
    });
    if (res && res.data) {
      this.$message.success("新增成功");
      this.operateVisiable = false;
      this.getTaskList();
    }
  }
  // 编辑任务
  private async getTaskEdit(values: WebManagerModule.TaskInfo) {
    const { title, priority, endline } = values;
    const { task_id } = this;
    const res: ApiResponse<boolean> = await HttpRequest.TaskModule.getTaskUpdate(
      {
        task_id,
        title,
        priority,
        endline: moment(endline).format("YYYY-MM-DD")
      }
    );
    if (res && res.data) {
      this.$message.success("编辑成功");
      this.operateVisiable = false;
      this.getTaskList();
    }
  }
  // 请求列表
  private async getTaskList() {
    this.loading = true;
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
      this.loading = false;
    }
  }
  created() {
    this.form = this.$form.createForm(this);
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