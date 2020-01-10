<template>
  <div class="tag-wrapper">
    <div class="tag-header">
      <Button type="primary" @click="()=>{visible=true}">新增Tag</Button>
    </div>
    <Table
      style="margin-top:10px"
      :rowKey="rowKey=>rowKey.id"
      :dataSource="dataSource"
      :columns="columns"
      :loading="loading"
      :pagination="dataSource.length>0?pagination:false"
      bordered
      @change="handleTableChange"
    >
      <template slot="action" slot-scope="text,record">
        <span style="cursor:pointer;color:#06a5ff" @click="handleTagDelete(record.id)">删除</span>
      </template>
    </Table>
    <Modal
      :visible="visible"
      title="新增Tag"
      okText="确认"
      cancelText="取消"
      @ok="handleTagCreate"
      @cancel="()=>{visible = false}"
    >
      <Form :form="form" @submit="handleTagCreate">
        <FormItem label="code" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            placeholder="请输入标签code值"
            v-decorator="['code', { rules: [{ required: true, message: '请输入标签code值!' }] }]"
          />
        </FormItem>
        <FormItem label="value" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            placeholder="请输入标签value值"
            v-decorator="['value', { rules: [{ required: true, message: '请输入标签value值!' }] }]"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Button, Modal, Form, Input, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
Vue.prototype.$message = message;
@Component({
  name: "TagModule",
  components: {
    Table,
    Button,
    Modal,
    Form,
    FormItem: Form.Item,
    Input
  }
})
export default class TagModule extends Vue {
  private form!: any;

  private loading: boolean = false;
  private dataSource: Array<DictionaryModule.TagInfo> = [];

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
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: DictionaryModule.TagInfo,
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

  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };

  private visible: boolean = false;

  /**
   * 新增tag
   */
  private handleTagCreate(e: any) {
    e.preventDefault();
    this.form.validateFields(
      async (err: Error, values: DictionaryModule.TagInfo) => {
        if (!err) {
          const { code, value } = values;
          const res: ApiResponse<
            boolean
          > = await HttpRequest.DictionaryModule.getTagAdd({ code, value });
          if (res && res.data) {
            this.$message.success("新增成功");
            this.getTagList();
            this.visible = false;
          } else {
            this.$message.error("新增失败");
          }
        }
      }
    );
  }

  /**
   * 表格change
   */
  private handleTableChange(pagination: any, filters: any, soter: any) {
    this.pagination.current = pagination.current;
    this.getTagList();
  }
  /**
   * 删除tag
   */
  private handleTagDelete(id: number) {
    const _this = this;
    Modal.confirm({
      title: "删除tag",
      content: "确认删除吗?",
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<
          boolean
        > = await HttpRequest.DictionaryModule.getTagDelete({ id });

        if (res && res.data) {
          _this.$message.success("删除成功");
          _this.getTagList();
        } else {
          _this.$message.error("删除失败");
        }
      }
    });
  }
  /**
   * 请求列表
   */
  private async getTagList() {
    this.loading = true;
    const params = {
      page: this.pagination.current,
      limit: 10
    };
    const res: ApiResponse<
      ListResponse<Array<DictionaryModule.TagInfo>>
    > = await HttpRequest.DictionaryModule.getTagList(params);

    if (res && res.data) {
      const data = res.data.data;
      const total = res.data.total;
      this.dataSource = data;
      this.pagination.total = total;
      this.loading = false;
      if (data.length === 0 && total >= 10) {
        this.pagination.current -= 1;
        this.getTagList();
      }
    }
  }

  created() {
    this.form = this.$form.createForm(this);
    this.$nextTick(() => {
      this.getTagList();
    });
  }
}
</script>
<style lang="less" scoped>
.tag-header {
  text-align: right;
}
</style>