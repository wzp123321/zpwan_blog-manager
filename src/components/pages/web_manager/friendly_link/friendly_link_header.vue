<template>
  <div class="frsp">
    <div class="select">
      <a-select
        :allowClear="true"
        style="width: 120px;margin-right:20px;"
        placeholder="请选择"
        :getPopupContainer="(triggerNode)=>{
        return triggerNode.parentNode || document.body }"
        @change="(value)=>{handleChange('isShelves',value)}"
      >
        <a-select-option
          v-for="(item,index) in isshelves"
          :key="index"
          :value="item.key"
        >{{item.value}}</a-select-option>
      </a-select>
      <a-input-search
        placeholder="请输入链接名"
        :allowClear="true"
        style="width: 200px"
        @search="(value)=>{handleChange('name',value)}"
      />
    </div>
    <a-button type="primary" @click="()=>{$router.push('/app/webManager/friendlink/add')}">新增链接</a-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Select, Button, Input } from "ant-design-vue";
import { comment_isshelves } from "@/assets/js/data";
@Component({
  name: "FriendlyLinkHeader",
  components: {
    "a-select": Select,
    "a-select-option": Select.Option,
    "a-button": Button,
    "a-input-search": Input.Search
  }
})
export default class FriendlyLinkHeader extends Vue {
  // select
  private isshelves!: Array<{ [key: string]: any }>;
  // 搜索参数
  private searchParams: { [key: string]: any } = {};
  /**
   * change
   */
  @Emit("select")
  private handleChange(type: string, value: any) {
    this.searchParams = Object.assign(this.searchParams, {
      [type]: type === "isShelves" ? value - 1 : value
    });
    if (!value) {
      Vue.delete(this.searchParams, type);
    }
    return this.searchParams;
  }
  created() {
    this.isshelves = comment_isshelves;
  }
}
</script>
<style lang="less" scoped>
</style>