<template>
  <div class="admin-wrapper">
    <Button type="primary" @click="()=>{visible=true}">新增管理员</Button>
    <a-table
      style="margin-top:10px;"
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.admin_id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
      @change="handleTableChange"
    >
      <template slot="action" slot-scope="text,record">
        <span
          style="color:#06a5ff;cursor:pointer"
          @click="()=>{visible=true;admin_id= record.admin_id;getAdminInfoById()}"
        >编辑</span>
        <Divider type="vertical"></Divider>
        <span style="color:#06a5ff;cursor:pointer" @click="handleAdminDelete(record.admin_id)">删除</span>
      </template>
    </a-table>
    <a-modal
      title="管理员"
      cancelText="取消"
      okText="确认"
      :visible="visible"
      @ok="handleAdminOperation"
      @cancel="()=>{visible = false}"
    >
      <a-form :form="form" @submit="handleAdminOperation">
        <a-form-item label="管理员名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="请输入名字"
            v-decorator="['admin_name', { rules: [{ required: true, message: '请输入名字!' }] }]"
          />
        </a-form-item>
        <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="请输入密码"
            v-decorator="['admin_password', { rules: [{ required: true, message: '请输入密码!' }] }]"
          />
        </a-form-item>
        <a-form-item label="头像" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <UploadHandler
            v-decorator="[
          'avatar_url',
          { rules: [{ required: true, message: '请上传头像!' },{valuePropName:'avatar_url'}] },
        ]"
            :imgUrl="avatar_url"
            @change="handleImgUpload"
          ></UploadHandler>
        </a-form-item>
        <a-form-item label="角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
            placeholder="请选择"
            :getPopupContainer="triggerNode=>{
              return triggerNode.parentNode || document.body
            }"
            v-decorator="[
          'role',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
          >
            <a-select-option :value="1">普通管理员</a-select-option>
            <a-select-option :value="2">超级管理员</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import {
  Table,
  Button,
  Divider,
  Modal,
  message,
  Form,
  Input,
  Select
} from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
import UploadHandler from "@/components/Uploader.vue";
Vue.prototype.$message = message;

@Component({
  name: "AdminListManage",
  components: {
    "a-table": Table,
    Button,
    Divider,
    "a-modal": Modal,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-select": Select,
    "a-select-option": Select.Option,
    "a-input": Input,
    UploadHandler
  }
})
export default class AdminListManage extends Vue {
  private loading: boolean = false;
  private visible: boolean = false;
  private form: any;
  private avatar_url: string = "";
  private admin_id: string = "";
  private columns: Array<ColumnsInfo> = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    },
    {
      key: "admin_id",
      title: "ID",
      dataIndex: "admin_id"
    },
    {
      key: "admin_name",
      title: "姓名",
      dataIndex: "admin_name"
    },
    {
      key: "role",
      title: "角色",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
        index: number
      ) => {
        return record.role === 2 ? "超级管理员" : "普通管理员";
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.AdminInfo,
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
        record: WebManagerModule.AdminInfo,
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
  // 数据源
  private dataSource: Array<WebManagerModule.AdminInfo> = [];
  private handleImgUpload(avatar_url: string) {
    this.avatar_url = avatar_url;
    this.form.setFieldsValue({ avatar_url });
  }
  /**
   * 表格change事件
   */
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.queryTouristList();
  }
  private handleAdminOperation(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.AdminInfo) => {
        if (!err) {
          if (this.admin_id) {
            this.handleAdminEdit(values);
          } else {
            this.handleAdminAdd(values);
          }
        }
      }
    );
  }
  private async handleAdminEdit(values: WebManagerModule.AdminInfo) {
    const { admin_name, admin_password, role, avatar_url } = values;
    const { admin_id } = this;
    const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getAdminUpdateById(
      {
        admin_id,
        admin_name,
        admin_password,
        role,
        avatar_url
      }
    );

    if (res && res.data) {
      this.$message.success("编辑成功");
      this.visible = false;
      this.queryTouristList();
    }
  }
  private async handleAdminAdd(values: WebManagerModule.AdminInfo) {
    const { admin_name, admin_password, role, avatar_url } = values;
    const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getAdminCreate(
      {
        admin_name,
        admin_password,
        role,
        avatar_url
      }
    );

    if (res && res.data) {
      this.$message.success("新增成功");
      this.visible = false;
      this.queryTouristList();
    }
  }
  private handleAdminDelete(admin_id: string) {
    const that = this;
    Modal.confirm({
      title: "删除管理员",
      content: "你确认删除管理员吗?",
      okText: "确认",
      cancelText: "取消",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<boolean> = await HttpRequest.AdminModule.getAdminDelete(
          { admin_id }
        );
        if (res && res.code === 200) {
          if (res.data) {
            that.$message.success("删除成功");
            that.queryTouristList();
          } else {
            that.$message.error("不可删除！");
          }
        }
      }
    });
  }

  /**
   * 请求数据
   */
  private async queryTouristList() {
    this.loading = true;
    const res: ApiResponse<ListResponse<
      Array<WebManagerModule.AdminInfo>
    >> = await HttpRequest.AdminModule.geTouristList({
      page: this.pagination.current,
      limit: 10
    });

    if (res && res.data) {
      const dataSource = res.data.data;
      const total = res.data.total;
      this.dataSource = dataSource;
      this.pagination.total = total;
      this.loading = false;
      if (total >= 10 && dataSource.length === 0) {
        this.pagination.current -= 1;
        this.queryTouristList();
      }
    }
  }

  private async getAdminInfoById() {
    const res: ApiResponse<WebManagerModule.AdminInfo> = await HttpRequest.AdminModule.getAdminInfoById(
      {
        admin_id: this.admin_id
      }
    );

    if (res && res.data) {
      const { admin_name, admin_password, role, avatar_url } = res.data;
      this.avatar_url = avatar_url;
      this.form.setFieldsValue({
        admin_name,
        admin_password,
        role,
        avatar_url
      });
    }
  }

  created() {
    this.queryTouristList();
    this.form = this.$form.createForm(this);
  }
}
</script>
<style lang="less" scoped>
.admin-wrapper {
  position: relative;
}
</style>