<template>
  <div class="banner-wrapper">
    <div class="header">
      <a-button type="primary" @click="()=>{$router.push('/app/webmanager/banner/add')}">新增banner</a-button>
    </div>
    <a-table
      style="margin-top:10px"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      bordered
      @change="handleTableChange"
    >
      <template slot="imgUrl" slot-scope="text,record">
        <img :src="record.imgUrl" alt style="width:60px;height:60px;border-radius:6px" />
      </template>
      <template slot="action" slot-scope="text,record">
        <span class="action-span" @click="()=>{$router.push(`/app/webmanager/banner/edit/${record.id}`)}">编辑</span>
        <a-divider type="vertical"></a-divider>
        <span class="action-span" @click="handleBannerDelete(record.id)">删除</span>
        <a-divider type="vertical"></a-divider>
        <i
          class="iconfont icon-RectangleCopy action-span"
          @click="()=>{imgShow = true;imgUrl = record.imgUrl}"
        ></i>
      </template>
    </a-table>
    <ImagePreView :show="imgShow" :imgUrl="imgUrl" @img_close="()=>{imgShow = false}"></ImagePreView>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Table, Divider, Modal } from "ant-design-vue";
import { formatDate } from "@/utils/index";
import HttpRequest from "@/assets/api/modules/banner";
import ImagePreView from "@/components/ImagePreView.vue";
@Component({
  name: "BannerList",
  components: {
    "a-button": Button,
    "a-table": Table,
    "a-divider": Divider,
    Modal,
    ImagePreView
  }
})
export default class BannerList extends Vue {
  private loading: boolean = false;
  // 图片预览开关
  private imgShow: boolean = false;
  // 预览图片地址
  private imgUrl: string = "";
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
      key: "title",
      title: "标题",
      dataIndex: "title"
    },
    {
      key: "url",
      title: "路径",
      dataIndex: "url"
    },
    {
      key: "imgUrl",
      title: "封面",
      scopedSlots: { customRender: "imgUrl" }
    },
    {
      key: "createTime",
      title: "创建时间",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
        index: number
      ) => {
        return formatDate(record.createTime);
      }
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: { customRender: "action" }
    }
  ];
  private dataSource: Array<BannerModule.BannerInfo> = [];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 表格change事件
   */
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    soter: any
  ) {}
  /**
   * banner删除
   */
  private handleBannerDelete(id: string) {
    Modal.confirm({
      title: "删除banner",
      content: "你确认删除这个banner吗？",
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {},
      onOk: () => {
        console.log("删除");
      }
    });
  }
  /**
   * 请求banner列表
   */
  private async getBannerList() {
    const res = await HttpRequest.getBannerList();

    if (res && res.data) {
      const dataSource = res.data.data;
      this.dataSource = dataSource;
    }
  }

  created() {
    this.$nextTick(() => {
      this.getBannerList();
    });
  }
}
</script>
<style lang="less" scoped>
.banner-wrapper {
  .header {
    text-align: right;
    margin-right: 10px;
  }
  .action-span {
    color: #06a5ff;
    cursor: pointer;
  }
}
</style>