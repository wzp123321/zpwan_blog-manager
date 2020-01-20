<template>
  <div class="friednly-link-wrapper">
    <FriendlyLinkHeader
      :visible="visible"
      :friendlyLinkInfo="friendlyLinkInfo"
      @select="handleHeaderSelect"
    ></FriendlyLinkHeader>
    <p>备注：再审核的时候注意头像是否可用 如果不可用记得给个默认头像</p>
    <a-table
      style="margin-top:10px"
      bordered
      :loading="loading"
      :rowKey="rowKey=>rowKey.id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="JSON.stringify(dataSource) ==='[]' ? false : pagination"
      @change="handleTableChange"
    >
      <template slot="isShelves" slot-scope="text,record">
        <a-switch
          :checked="record.isShelves ===1"
          @change="(value)=>{handleIsShelvesChange(value,record.id)}"
        ></a-switch>
      </template>
      <template slot="action" slot-scope="text,record">
        <span
          style="cursor:pointer;color:#06a5ff;"
          @click="()=>{$router.push('/app/webManager/friendlink/edit/'+record.id)}"
        >编辑</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Switch, Modal, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
import FriendlyLinkHeader from "./friendly_link_header.vue";
Vue.prototype.$message = message;

@Component({
  name: "FriendlyLinkList",
  components: {
    "a-table": Table,
    "a-switch": Switch,
    Modal,
    FriendlyLinkHeader
  }
})
export default class FriendlyLinkList extends Vue {
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
      key: "name",
      title: "链接名",
      dataIndex: "name"
    },
    {
      key: "url",
      title: "链接地址",
      dataIndex: "url"
    },
    {
      key: "isShelves",
      title: "上架",
      scopedSlots: {
        customRender: "isShelves"
      }
    },
    {
      key: "create_time",
      title: "创建时间",
      customRender: (
        text: string,
        record: WebManagerModule.FriendlyLinkInfo,
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
        record: WebManagerModule.FriendlyLinkInfo,
        index: number
      ) => {
        return formatDate(record.modify_time || 0);
      }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: {
        customRender: "action"
      }
    }
  ];
  // 数据源
  private dataSource: Array<WebManagerModule.FriendlyLinkInfo> = [];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  // 对话框开关
  private visible: boolean = false;
  // 详情
  private friendlyLinkInfo: WebManagerModule.FriendlyLinkInfo = {};
  // 搜索参数
  private searchParams: { [key: string]: any } = {};
  /**
   * 头部筛选
   */
  private handleHeaderSelect(params: { [key: string]: any }) {
    this.searchParams = Object.assign({}, params);
    this.pagination.current = 1;
    this.queryFriendlyList();
  }
  /**
   * 上下架
   */
  private handleIsShelvesChange(value: boolean, id: number) {
    const isShelves = value ? 1 : 0;
    const that = this;
    Modal.confirm({
      title: value ? "上架友情链接" : "下架友情链接",
      content: value ? "你确认上架友情链接吗?" : "你确认下架友情链接吗?",
      cancelText: "取消",
      okText: "确认",
      onCancel() {},
      async onOk() {
        const res: ApiResponse<boolean> = await HttpRequest.FriendlyLinkModule.getFriendlyLinkUpdate(
          { id, isShelves }
        );

        if (res && res.data) {
          that.$message.success("操作成功");
          that.queryFriendlyList();
        }
      }
    });
  }
  /**
   * 表格change
   */
  private handleTableChange(pagination: any, filters: any, soter: any) {
    this.pagination.current = pagination.current;
    this.queryFriendlyList();
  }
  /**
   * 请求数据
   */
  private async queryFriendlyList() {
    this.loading = true;
    this.searchParams = Object.assign(this.searchParams, {
      page: this.pagination.current,
      limit: 10
    });
    const res: ApiResponse<ListResponse<
      Array<WebManagerModule.FriendlyLinkInfo>
    >> = await HttpRequest.FriendlyLinkModule.getFriendlyLinkList(
      this.searchParams
    );

    if (res && res.data) {
      const data = res.data.data;
      const total = res.data.total;
      this.dataSource = data;
      this.pagination.total = total;
      this.loading = false;
    }
  }

  created() {
    this.$nextTick(() => {
      this.queryFriendlyList();
    });
  }
}
</script>
<style lang="less" scoped>
.friednly-link-wrapper {
  position: relative;
}
</style>