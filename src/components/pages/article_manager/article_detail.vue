<template>
  <h1>Detail</h1>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "ArticleDetail",
  components: {}
})
export default class ArticleDetail extends Vue {
  private articleInfo:ArticleModule.ArticleInfo = {}

  /**
   * 根据id获取详情
   */
  private async getArticleInfoById(){
    
  }
}
</script>
<style lang="less" scoped>
</style>