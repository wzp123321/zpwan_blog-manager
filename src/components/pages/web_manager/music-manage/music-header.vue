<template>
  <div class="music-header frsart">
    <Input v-model="title" placeholder="请输入歌曲名称进搜索" />
    <Input v-model="author" placeholder="请输入歌手名称进行搜索" />
    <Button type="primary" @click="handleSearch">查询</Button>
  </div>
</template>
<script lang="ts">
import { Input, Button } from "ant-design-vue";
import { Vue, Component, Emit } from "vue-property-decorator";
@Component({
  name: "MusicHeader",
  components: { Input, Button }
})
export default class MusicHeader extends Vue {
  // 歌曲名称
  private title: string = "";
  // 歌手名称
  private author: string = "";
  // 搜索
  @Emit("search")
  private handleSearch() {
    const { title, author } = this;
    return { title, author };
  }
}
</script>
<style lang="less" scoped>
.music-header {
  input {
    width: 240px;
    margin-right: 20px;
  }
}
</style>