<template>
  <div class="frsp">
    <div class="select">
      <a-select
        placeholder="一级目录"
        :allowClear="true"
        style="width: 120px"
        :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        @change="handleFirstCatalogChange"
      >
        <a-select-option
          v-for="(item,index) in firstCatalogs"
          :key="index"
          :value="item.id"
        >{{item.value}}</a-select-option>
      </a-select>
      <a-select
        :disabled="pId ===0"
        placeholder="二级目录"
        :allowClear="true"
        style="width: 120px;margin-left:10px"
        :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        @change="(value)=>{handleSearchData('second_catalogId',value)}"
      >
        <a-select-option
          v-for="(item,index) in secondCatalogs"
          :key="index"
          :value="item.id"
        >{{item.value}}</a-select-option>
      </a-select>
      <a-select
        placeholder="上下架"
        :allowClear="true"
        style="width: 120px;margin-left:10px"
        :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
        @change="(value)=>{handleSearchData('isShelves',value)}"
      >
        <a-select-option v-for="(item,index) in types" :key="index" :value="item.key">{{item.value}}</a-select-option>
      </a-select>
      <a-input-search
        :allowClear="true"
        placeholder="请输入文章标题"
        style="width: 200px;margin-left:10px"
        @search="(value)=>{handleSearchData('title',value)}"
      />
    </div>
    <Button type="primary" @click="()=>{$router.push('/app/article/add')}">新增文章</Button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Button, Select, Input } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "ArticleHeader",
  components: {
    Button,
    "a-input-search": Input.Search,
    "a-select": Select,
    "a-select-option": Select.Option
  }
})
export default class ArticleHeader extends Vue
  implements ArticleModule.CatalogArray {
  // 搜索参数
  private searchParams: ArticleModule.SearchParams = {};
  // 一级目录数组
  firstCatalogs = [];
  // 一级目录id
  private pId: number = 0;
  // 二级目录数组
  secondCatalogs = [];
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
  /**
   * 一级目录change
   */
  private handleFirstCatalogChange(value: number) {
    this.pId = value ? value : 0;
    this.querySelectData({ pId: value }, "secondCatalogs");
    this.handleSearchData("first_catalogId", value);
  }
  /**
   * 回传数据
   */
  @Emit("change")
  private handleSearchData(type: string, value: any) {
    if (!value) {
      Vue.delete(this.searchParams, type);
      if (type === "first_catalogId") {
        Vue.delete(this.searchParams, "second_catalogId");
      }
    } else {
      switch (type) {
        case "first_catalogId":
          this.searchParams.first_catalogId = value;
          break;
        case "second_catalogId":
          this.searchParams.second_catalogId = value;
          break;
        case "isShelves":
          this.searchParams.isShelves = value-1;
          break;
        case "title":
          this.searchParams.title = value;
          break;
      }
    }
    return this.searchParams;
  }
  /**
   * 请求数据
   */
  private async querySelectData(
    params: { [key: string]: any },
    list: "firstCatalogs" | "secondCatalogs"
  ) {
    const res: any = await HttpRequest.DictionaryModule.getCatalogList(
      params
    );

    if (res && res.data) {
      this[list] = res.data.data;
    }
  }
  created() {
    this.querySelectData({ type: 1 }, "firstCatalogs");
  }
}
</script>
<style lang="less" scoped>
.select {
  display: flex;
  flex-direction: row;
}
</style>