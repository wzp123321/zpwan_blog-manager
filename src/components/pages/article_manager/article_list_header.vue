<template>
  <div class="frsp">
    <div class="select">
      <a-select
        placeholder="一级目录"
        style="width: 120px"
        @change="(value)=>{handleSearchData('first_catalogId',value)}"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
      <a-select
        placeholder="二级目录"
        style="width: 120px"
        @change="(value)=>{handleSearchData('second_catalogId',value)}"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
      <a-select
        placeholder="上下架"
        style="width: 120px"
        @change="(value)=>{handleSearchData('isShelves',value)}"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
      <a-radio @change="(value)=>{handleSearchData('isTop',value)}">置顶</a-radio>
      <a-radio @change="(value)=>{handleSearchData('isRecommend',value)}">推荐</a-radio>
      <a-input-search
        placeholder="请输入文章标题"
        style="width: 200px"
        @search="(value)=>{handleSearchData('title',value)}"
      />
    </div>
    <Button type="primary" @click="()=>{$router.push('/app/article/add')}">新增文章</Button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Button, Select, Input, Radio } from "ant-design-vue";
@Component({
  name: "ArticleHeader",
  components: {
    Button,
    "a-input-search": Input.Search,
    "a-select": Select,
    "a-select-option": Select.Option,
    "a-radio": Radio
  }
})
export default class ArticleHeader extends Vue {
  // 搜索参数
  private searchParams: ArticleModule.SearchParams = {};

  @Emit("change")
  private handleSearchData(type: string, value: string) {}
}
</script>
<style lang="less" scoped>
.select {
  display: flex;
  flex-direction: row;
}
</style>