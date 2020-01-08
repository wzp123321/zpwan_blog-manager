<template>
  <div class="detail-wrapper">
    <div class="detail-header">
      <div class="header-info">
        <h1>{{articleInfo.title}}</h1>
        <div>{{time}}</div>
      </div>
      <div>
        <Button @click="$router.back()" style="width:60px">返回</Button>
      </div>
    </div>
    <Divider></Divider>
    <div  class="markdown-body" v-html="articleInfo.content"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Divider } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/utils/index";
@Component({
  name: "ArticleDetail",
  components: {
    Divider
  }
})
export default class ArticleDetail extends Vue {
  private articleInfo: ArticleModule.ArticleInfo = {};

  private time: string = "";

  /**
   * 根据id获取详情
   */
  private async getArticleInfoById(id: string) {
    const res: ApiResponse<
      ArticleModule.ArticleInfo
    > = await HttpRequest.ArticleModule.getArticleInfoById({
      id
    });

    if (res && res.data) {
      const data = res.data;
      this.articleInfo = data;
      this.time = formatDate(this.articleInfo.create_time);
    }
  }
  created() {
    const id = this.$route.params.id;
    this.getArticleInfoById(id);
  }
}
</script>
<style lang="less" scoped>
.detail-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .header-info {
    flex: 1;
    text-align: center;
    h1 {
      margin: 0;
    }
  }
}
</style>