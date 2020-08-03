<template>
  <div class="music-wrapper">
    <!-- 头部 -->
    <div class="music-wrapper-header frsp">
      <MusicHeader @search="handleDataSearch"></MusicHeader>
      <Button type="primary" @click="handleModalOpen('')">新增音乐</Button>
    </div>
    <!-- 表格 -->
    <Table
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.id"
      :columns="columnList"
      :dataSource="musicList"
      @change="handleTableChange"
    >
      <template slot-scope="text,record" slot="pic">
        <img :src="record.pic" alt />
      </template>
      <template slot-scope="text,record" slot="action">
        <span @click="handleModalOpen(record.id)">编辑</span>
        <Divider type="vertical"></Divider>
        <span @click="handleMusicDelete(record)">删除</span>
      </template>
    </Table>
    <!-- 新增&编辑对话框 -->
    <Modal
      :title="id?'编辑音乐':'新增音乐'"
      :visible="visible"
      okText="确认"
      cancelText="取消"
      @ok="handleModalConfirm"
      @cancel="()=>{visible = false,id=''}"
    >
      <Form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleModalConfirm"
      >
        <FormItem label="歌曲名称">
          <Input
            maxlength="20"
            v-decorator="['title', { rules: [{ required: true, message: '请输入歌曲名称!' }] }]"
          />
        </FormItem>
        <FormItem label="歌手名称">
          <Input
            maxlength="20"
            v-decorator="['author', { rules: [{ required: true, message: '请输入歌手名称!' }] }]"
          />
        </FormItem>
        <FormItem label="播放链接">
          <Input
            maxlength="20"
            v-decorator="['src', { rules: [{ required: true, message: '请输入播放链接!' }] }]"
          />
        </FormItem>
        <FormItem label="歌曲封面">
          <UploadHandler
            v-decorator="['pic', { rules: [{ required: true, message: '请上传歌曲封面!' }] }]"
            :imgUrl="pic"
            @change="handleUploadChange"
          ></UploadHandler>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Table, Button, Form, Modal, Input, Divider } from "ant-design-vue";
import { Vue, Component } from "vue-property-decorator";
import MusicHeader from "./music-header.vue";
import comment from "../../../../assets/api/modules/comment";
import HttpRequest from "@/assets/api/modules/index";
import UploadHandler from "@/components/Uploader.vue";
@Component({
  name: "MusicModule",
  components: {
    Table,
    Button,
    Form,
    Modal,
    Input,
    Divider,
    FormItem: Form.Item,
    MusicHeader,
    UploadHandler
  }
})
export default class MusicModule extends Vue {
  // form表单
  private form: any = null;
  // 列数据
  private columnList: ColumnsInfo[] = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: WebManagerModule.MusicInfo,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 + index + 1;
      }
    },
    {
      key: "title",
      title: "歌曲名称",
      dataIndex: "title"
    },
    {
      key: "author",
      title: "歌手名称",
      dataIndex: "author"
    },
    {
      key: "src",
      title: "歌曲链接",
      dataIndex: "src"
    },
    {
      key: "pic",
      title: "封面",
      scopedSlots: { customRender: "pic" }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: {
        customRender: "action"
      }
    }
  ];
  // 列表
  private musicList: WebManagerModule.MusicInfo[] = [];
  // loading
  private loading: boolean = false;
  // 音乐详情
  private musicInfo: WebManagerModule.MusicInfo = {};
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 0
  };
  // 当前音乐id
  private id: string = "";
  // 对话框开关
  private visible: boolean = false;
  // 上传的图片
  private pic: string = "";
  // 打开新增对话框
  private handleModalOpen(id: string) {
    this.resetForm();
    if (id) {
      this.id = id;
      this.getMusicInfoById();
    }
    this.form.resetFields();
    this.visible = true;
  }
  // 图片上传
  private handleUploadChange(value: string) {
    this.pic = value;
  }
  // 顶部搜索
  private handleDataSearch(params: { title: string; author: string }) {
    this.getMusicList(params);
  }
  // 删除
  private handleMusicDelete(record: WebManagerModule.MusicInfo) {
    const { id, title } = record;
    const that = this;
    Modal.confirm({
      title: "删除确认",
      content: `确认删除${title}吗？`,
      cancelText: "取消",
      okText: "确认",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<boolean> = await HttpRequest.MusicModule.getMusicDelete(
          { id }
        );
        if (res && res.data) {
          that.$message.success("删除成功");
          that.resetForm();
          that.getMusicList();
        } else {
          that.$message.error("删除失败");
        }
      }
    });
  }
  // 对话框确认
  private handleModalConfirm(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.MusicInfo) => {
        if (!err) {
          if (this.id) {
            this.handleMusicUpdate(values);
          } else {
            this.handleMusicAdd(values);
          }
        }
      }
    );
  }
  // 编辑
  private async handleMusicUpdate(params: WebManagerModule.MusicInfo) {
    const { id } = this;
    const newParams = Object.assign(params, { id });
    const res: ApiResponse<boolean> = await HttpRequest.MusicModule.getMusicUpdate(
      newParams
    );
    if (res && res.data) {
      this.getMusicList();
      this.resetForm();
      this.$message.success("编辑成功");
    } else {
      this.$message.error("编辑失败");
    }
  }
  // 新增
  private async handleMusicAdd(params: WebManagerModule.MusicInfo) {
    const res: ApiResponse<boolean> = await HttpRequest.MusicModule.getMusicCreate(
      params
    );
    if (res && res.data) {
      this.getMusicList();
      this.resetForm();
      this.$message.success("新增成功");
    } else {
      this.$message.error("新增失败");
    }
  }
  // 重置表单数据
  private resetForm() {
    this.visible = false;
    this.id = "";
    this.pic = "";
  }
  // 分页
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    sorter: any
  ) {
    this.pagination.current = pagination.current;
    this.getMusicList();
  }
  // 查询音乐列表
  private async getMusicList(params = {}) {
    this.loading = true;
    const { current } = this.pagination;
    const newParams = Object.assign(params, { page: current });
    try {
      const res: ApiResponse<ListResponse<
        WebManagerModule.MusicInfo[]
      >> = await HttpRequest.MusicModule.getMusicList(newParams);
      if (res && res.data) {
        const list = res.data.data;
        const total = res.data.total;
        this.musicList = list;
        this.pagination.total = total;
        this.loading = false;
      }
    } catch (error) {
      this.$message.error(error);
      this.loading = false;
    }
  }
  // 获取详情
  private async getMusicInfoById() {
    const { id } = this;
    const res: ApiResponse<WebManagerModule.MusicInfo> = await HttpRequest.MusicModule.getMusicInfoById(
      { id }
    );
    if (res && res.data) {
      this.musicInfo = res.data;
      const { title, author, src, pic } = res.data;
      this.form.setFieldsValue({ title, author, src, pic });
      this.pic = pic || "";
    }
  }
  // 初始化
  mounted() {
    this.$nextTick(() => {
      this.getMusicList();
      this.getMusicInfoById();
    });
  }
  created() {
    this.form = this.$form.createForm(this);
  }
}
</script>
<style lang="less" scoped>
.music-wrapper {
  position: relative;
  &-header {
    padding: 10px 0;
  }
  img {
    width: 100px;
    height: 80px;
    border-radius: 10px;
  }
  span {
    cursor: pointer;
    color: #06a5ff;
  }
}
</style>