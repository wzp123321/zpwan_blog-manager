<template>
  <div class="detail-wrapper">
    <div class="detail-header">
      <h1>{{articleInfo.title}}</h1>
      <div>{{time}}</div>
    </div>
    <Divider></Divider>
    <div class="markdown-body" v-html="articleInfo.content"></div>
    <!-- 这里加一个输入框 评论 -->
    <Divider>文章评论</Divider>
    <div>
      <Input placeholder="请输入您的评论" />
    </div>
    <div v-for="(item,index) in comments" :key="index">
      <div class="frsp">
        <div>
          <img
            :src="item.author.avatar"
            style="wdith:30px;height:30px;border-radius:50px;display:inline"
            alt
          />
          <span>{{item.author.name}}</span>
        </div>
      </div>
      <p>{{item.content}}</p>
      <p>
        点赞 --
        <Button @click="()=>{ floor =index ;id= item.id}" style="background:#67c33d;border-radius:15px;border:0;color:#fff" :ghost="true">回复</Button>
      </p>
      <div>
        <Input
          placeholder="点击回复的时候传两个参数 一个是外层item表示是第几个评论楼  小的是当前需要回复的评论id"
          v-if="floor===index && id === item.id"
        />
      </div>
      <div style="margin-left:30px">
        <div v-for="(childItem,idx) in item.children" :key="idx">
          <div class="frsp">
            <div>
              <img
                :src="childItem.author.avatar"
                style="wdith:30px;height:30px;border-radius:50px;display:inline"
                alt
              />
              <span>{{childItem.author.name}}</span>
            </div>
            <!-- 点击这里的评论出现@这个评论的楼主 -->
          </div>
          <p>
            回复
            <span style="color:#06a5ff">{{childItem.reply_owner.name}}</span>
            : {{childItem.content}}
          </p>
          <p>
            点赞 --
            <span @click="()=>{ floor =index ;id= childItem.id}">回复</span>
          </p>
          <div>
            <Input
              placeholder="点击回复的时候传两个参数 一个是外层item表示是第几个评论楼  小的是当前需要回复的评论id-----这里会有一个@xxx"
              v-if="floor===index && id === childItem.id"
            />
          </div>
          <p  placeholder="点击回复的时候传两个参数 一个是外层item表示是第几个评论楼  小的是当前需要回复的评论id-----这里没有@xxx"
              v-if="floor===index && id === childItem.id">添加新评论</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Divider, Input } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { formatDate } from "@/assets/js/index";
import { comments } from "@/mock/index";
@Component({
  name: "ArticleDetail",
  components: {
    Divider,
    Input
  }
})
export default class ArticleDetail extends Vue {
  private articleInfo: ArticleModule.ArticleInfo = {};
  // 标识当前评论的大楼层
  private floor: number = 1;
  // 当前需要评论的评论id
  private id: string = "";

  private time: string = "";

  private comments: Array<{ [key: string]: any }> = [];

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
      this.time = formatDate(this.articleInfo.create_time || 0);
    }
  }
  created() {
    this.comments = comments;
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
  h1 {
    flex: 1;
    text-align: center;
  }
}
img {
  width: auto;
  height: auto;
}
</style>