<template>
  <div class="banner-wrapper">
    <div class="header">
      <Select
        style="width:120px"
        @change="handleTypeChange"
        placeholder="请选择"
        :allowClear="true"
        :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
      >
        <SelectOption v-for="(item,index) in types" :key="index" :value="item.key">{{item.value}}</SelectOption>
      </Select>
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
        <span
          class="action-span"
          @click="()=>{$router.push(`/app/webmanager/banner/edit/${record.id}`)}"
        >编辑</span>
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
import { Button, Table, Divider, Modal, Select } from "ant-design-vue";
import { formatDate } from "@/utils/index";
import HttpRequest from "@/assets/api/modules/index";
import ImagePreView from "@/components/ImagePreView.vue";
@Component({
  name: "BannerList",
  components: {
    "a-button": Button,
    "a-table": Table,
    "a-divider": Divider,
    Select,
    SelectOption: Select.Option,
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
      title: "跳转链接",
      dataIndex: "url"
    },
    {
      key: "imgUrl",
      title: "banner封面",
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
        return formatDate(record.create_time);
      }
    },
    {
      key: "modify_time",
      title: "修改时间",
      customRender: (
        text: string,
        record: ArticleModule.ArticleInfo,
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
  // 上下架类型
  private types: Array<{ [key: string]: any }> = [
    {
      key: 2,
      value: "上架"
    },
    {
      key: 1,
      value: "下架"
    }
  ];
  // 搜索条件
  private searchParams: { [key: string]: any } = {};
  private dataSource: Array<BannerModule.BannerInfo> = [];
  // 分页
  private pagination: PaginationInfo = {
    current: 1,
    total: 10
  };
  /**
   * 头部筛选
   */
  private handleTypeChange(isShelves: number) {
    this.searchParams = Object.assign({}, { isShelves: isShelves - 1 });
    if (!isShelves) {
      Vue.delete(this.searchParams, "isShelves");
    }
    this.getBannerList();
  }
  /**
   * 表格change事件
   */
  private handleTableChange(
    pagination: PaginationInfo,
    filters: any,
    soter: any
  ) {
    this.pagination.current = pagination.current;
    this.getBannerList();
  }
  /**
   * 请求banner列表
   */
  private async getBannerList() {
    this.loading = true;
    const { current } = this.pagination;
    const res = await HttpRequest.BannerModule.getBannerList(this.searchParams);

    if (res && res.data) {
      const dataSource = res.data.data;
      this.dataSource = dataSource;
      this.loading = false;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
  }
  .action-span {
    color: #06a5ff;
    cursor: pointer;
  }
}
</style>