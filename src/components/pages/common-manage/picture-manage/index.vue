<template>
  <div class="picture-wrapper">
    <a-table
      :rowKey="rowKey=>rowKey.picture_id"
      bordered
      :loading="loading"
      :columns="columns"
      :data-source="dataSource"
      @change="handleTableChange"
    >
      <template slot="picture_url" slot-scope="record">
        <img :src="record.picture_url" alt />
      </template>
      <template slot="action" slot-scope="text,record">
        <span @click="handlePictureDelete(record.picture_id)">删除</span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Button, Modal, Input, Divider } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "PictureModule",
  components: {
    "a-table": Table,
    Button,
    Modal,
    Input,
    Divider
  }
})
export default class PictureModule extends Vue {
  private columns: ColumnsInfo[] = [
    {
      key: "sort",
      title: "序号",
      customRender: (
        text: string,
        record: CommonModule.PictureModule,
        index: number
      ) => {
        return (this.pagination.current - 1) * 10 - index + 1;
      }
    },
    {
      key: "picture_img",
      title: "预览",
      scopedSlots: { customRender: "picture_url" }
    },
    {
      key: "picture_url",
      title: "预览地址",
      dataIndex: "picture_url"
    },
    {
      key: "init_date",
      title: "上传日期",
      dataIndex: "init_date"
    },
    {
      key: "action",
      title: "操作",
      scopedSlots: { customRender: "action" }
    }
  ];
  private dataSource: Array<CommonModule.PictureModule> = [];

  private pagination: PaginationInfo = {
    current: 1,
    total: 0
  };

  private loading: boolean = false;
  private handlePictureDelete(picture_id: string) {}

  private async getPictureList() {
    this.loading = true;
    const startDate = new Date("2020-05-01").getTime();
    const endDate = new Date().getTime();
    const { current } = this.pagination;
    const res: ApiResponse<ListResponse<
      Array<CommonModule.PictureModule>
    >> = await HttpRequest.PictureModule.getPictureList({
      page: current,
      startDate,
      endDate
    });

    if (res && res.data) {
      const dataSource = res.data.data;
      const total = res.data.total;
      this.dataSource = dataSource;
      this.pagination.total = total;
      this.loading = false;
    }
  }
  private handleTableChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.getPictureList();
  }
  mounted() {
    this.$nextTick(() => {
      this.getPictureList();
    });
  }
}
</script>
<style lang="less" scoped>
.picture-wrapper {
  position: relative;
  img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
}
</style>