<template>
  <div class="comment-wrapper">
    <!-- 这里加一个输入框 评论 -->
    <CommentInput @release="releaseComment"></CommentInput>
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
        <Button
          @click="()=>{ floor =index ;id= item.id}"
          style="background:#67c33d;border-radius:15px;border:0;color:#fff"
          :ghost="true"
        >回复</Button>
      </p>
      <div>
        <CommentInput v-if="floor===index && id === item.id" @release="releaseComment"></CommentInput>
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
            <CommentInput v-if="floor===index && id === childItem.id" @release="releaseComment"></CommentInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Input, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
import { comments } from "@/mock/index";
import CommentInput from "@/components/CommentInput.vue";
Vue.prototype.$message = message;
@Component({
  name: "UtilModule",
  components: {
    Input,
    TextArea: Input.TextArea,
    CommentInput
  }
})
export default class UtilModule extends Vue {
  // 标识当前评论的大楼层
  private floor: number = 1;
  // 当前需要评论的评论id
  private id: string = "";
  // 测试评论数据
  private comments: Array<{ [key: string]: any }> = [];
  // 评论的作者信息
  private author: { [key: string]: any } = {
    id: "test_ddrrfaaa",
    name: "test评论",
    avatar_url: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg",
    location: "江苏南京"
  };
  // 被评论的作者信息
  private reply_userInfo: { [key: string]: any } = {};
  // 文章id
  private article_id: string = "f7c8c0f9-2d51-4915-b690-7bfd460beca2";
  // 评论的父级id
  private parent_id: string = "783c5a44-6747-4ff8-babf-cddc11231b91";
  /**
   * 发布评论
   */
  private async releaseComment(content: string) {
    if (content.replace(/\s+/g, "") === "") {
      this.$message.error("评论不能为空！");
      return;
    }
    const { author, article_id, parent_id } = this;
    const res: any = await HttpRequest.CommentModule.getCommentCreate({
      article_id,
      author: JSON.stringify(this.author),
      content,
      parent_id,
      is_root: parent_id === "",
      reply_userInfo: JSON.stringify({
        user_id: "22222323",
        name: "万直鹏",
        avatar_url:
          "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg",
        location: "location"
      })
    });
    if (res && res.data) {
      this.$message.success("评论成功");
    }
  }

  created() {
    this.comments = comments;
  }
}
</script>
<style lang="less" scoped>
.first_comment {
  height: 80px;
  margin: 10px 0;
}
</style>