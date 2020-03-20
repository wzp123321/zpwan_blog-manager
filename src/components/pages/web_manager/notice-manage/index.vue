<template>
  <div class="notice-wrapper">
    <div class="notice-header">
      <Button type="primary" @click="handleAddModal">新增通知</Button>
    </div>
    <Table
      :loading="loading"
      :rowKey="rowKey=>rowKey.id"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="JSON.stringify(dataSource)==='[]' ? false: pagination"
      bordered
    >
      <template slot="action" slot-scope="text,record" class="action">
        <span class="action" @click="handleEditModal(record.id)">编辑</span>
        <Divider type="vertical"></Divider>
        <span class="action" @click="handleNoticeDelete(record.id)">删除</span>
      </template>
    </Table>
    <Modal
      :visible="visible"
      :title="id === 0 ? '新增通知':'编辑通知'"
      okText="确认"
      cancelText="取消"
      @ok="handleNoticeConfirm"
      @cancel="()=>{ visible = false }"
    >
      <Form
        :form="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        @submit="handleNoticeConfirm"
      >
        <FormItem label="内容">
          <Input
            placeholder="请输入通知内容"
            v-decorator="['content', { rules: [{ required: true, message: '请输入通知内容' }] }]"
          />
        </FormItem>
        <FormItem label="是否紧急">
          <Checkbox v-decorator="['isEmergency', { valuePropName: 'checked' }]"></Checkbox>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  Table,
  Button,
  Input,
  Select,
  Divider,
  Modal,
  Form,
  Checkbox,
  message
} from "ant-design-vue";
import { formatDate } from "@/assets/js/index";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;
@Component({
  name: "NoticeModule",
  components: {
    Table,
    Button,
    Divider,
    Input,
    Modal,
    Select,
    Form,
    FormItem: Form.Item,
    Checkbox
  }
})
export default class AdminModule extends Vue {
  private loading: boolean = false;
  private form!: any;
  private visible: boolean = false;
  private id: number = 0;
  private dataSource: Array<WebManagerModule.NoticeInfo> = [];
  private columns: ColumnsInfo[] = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: WebManagerModule.NoticeInfo,
        index: string
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
      key: "isemergency",
      title: "是否紧急",
      customRender: (
        text: string,
        record: WebManagerModule.NoticeInfo,
        index: number
      ) => {
        return record.isEmergency === 0 ? "否" : "是";
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.NoticeInfo,
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
        record: WebManagerModule.NoticeInfo,
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
  private pagination: PaginationInfo = {
    current: 1,
    total: 0
  };
  //删除
  private handleNoticeDelete(id: number) {
    const that = this;
    Modal.confirm({
      title: "删除通知",
      content: "你确认删除这条通知吗?",
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getNoticeDelete(
          { id }
        );
        if (res && res.data) {
          that.$message.success("删除成功");
          that.handleNoticelist();
        }
      }
    });
  }
  // 新增
  private handleAddModal() {
    this.visible = true;
    this.id = 0;
    this.form.setFieldsValue({
      content: "",
      isEmergency: false
    });
  }
  // 编辑
  private handleEditModal(id: number) {
    this.id = id;
    this.visible = true;
    this.getNoticeInfoById();
  }
  /**
   * 对话框确认
   */
  private handleNoticeConfirm(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.NoticeInfo) => {
        if (!err) {
          if (this.id === 0) {
            // 新增
            this.handleNoticeAdd(values);
          } else {
            //编辑
            this.handleNoticeEdit(values);
          }
        }
      }
    );
  }
  //编辑
  private async handleNoticeEdit(values: WebManagerModule.NoticeInfo) {
    const content = values.content;
    const isEmergency = values.isEmergency ? 1 : 0;
    const { id } = this;
    const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getNoticeUpdate(
      { id, content, isEmergency }
    );

    if (res && res.data) {
      this.$message.success("编辑成功");
      this.visible = false;
      this.handleNoticelist();
    }
  }
  // 新增
  private async handleNoticeAdd(values: WebManagerModule.NoticeInfo) {
    const content = values.content;
    const isEmergency = values.isEmergency ? 1 : 0;
    const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getNoticeAdd(
      { content, isEmergency }
    );

    if (res && res.data) {
      this.$message.success("添加成功");
      this.visible = false;
      this.handleNoticelist();
    }
  }
  // 请求详细信息
  private async getNoticeInfoById() {
    const id = this.id;
    const res: ApiResponse<WebManagerModule.NoticeInfo> = await HttpRequest.AdminModule.getNoticeInfoById(
      { id }
    );

    if (res && res.data) {
      const { content, isEmergency } = res.data;
      this.form.setFieldsValue({
        content,
        isEmergency: isEmergency === 1 ? true : false
      });
    }
  }
  // 请求列表
  private async handleNoticelist() {
    this.loading = true;
    const res: ApiResponse<any> = await HttpRequest.AdminModule.getNoticeList(
      {}
    );
    if (res && res.data) {
      const data = res.data.data;
      this.dataSource = data;
      this.loading = false;
    }
  }
  created() {
    this.form = this.$form.createForm(this);
    this.$nextTick(() => {
      this.handleNoticelist();
    });
  }
}
</script>
<style lang="less" scoped>
.notice-header {
  margin-bottom: 20px;
}
.action {
  color: #06a5ff;
  cursor: pointer;
}
</style>