<template>
  <div class="comment-input">
    <TextArea placeholder="请输入您的评论" :rows="4" class="first_comment" v-model="input_data" />
    <div class="frsp">
      <i class="iconfont icon-smile"></i>
      <div class="btn">
        <Button
          type="primary"
          style="border-radius:20px"
          :disabled="input_data === ''"
          @click="handleCommentRelease"
        >发布</Button>
        <Button style="border-radius:20px;margin-left:10px" @click="()=>{input_data = ''}">取消</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Input, Button } from "ant-design-vue";
@Component({
  name: "CommentInput",
  components: {
    TextArea: Input.TextArea,
    Button
  }
})
export default class CommentInput extends Vue {
  // 输入框信息
  private input_data: string = "";

  // 发布评论
  @Emit("release")
  handleCommentRelease() {
    return this.input_data.replace("\n", "");
  }
}
</script>
<style lang="less" scoped>
.first_comment {
  margin-bottom: 10px;
}
.icon-smile {
  font-size: 18px;
  cursor: pointer;
}
</style>