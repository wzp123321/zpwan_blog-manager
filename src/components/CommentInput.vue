<template>
  <div class="comment-input">
    <TextArea placeholder="请输入您的评论" :rows="4" class="first_comment" v-model="input_data" />
    <div class="frsp">
      <div class="emoji" id="emoji" @mouseleave="handleMouseLeave()">
        <i class="iconfont icon-smile" @click="()=>{show = !show}"></i>
        <div class="emoji-content" id="emoji-content" v-show="show">
          <span
            v-for="(item,index) in emojis"
            :key="index"
            @click="handleEmojiPut(item)"
            id="emoji-span"
          >{{item}}</span>
        </div>
      </div>
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
  // emoji-show
  private show: boolean = false;
  private emojis: Array<string> = [
    "🐷",
    "😄",
    "😂",
    "😭",
    "😊",
    "😍",
    "😏",
    "😆",
    "👿",
    "😃",
    "😏",
    "😘",
    "😚",
    "😳",
    "😌",
    "😆",
    "😁",
    "👍",
    "😜",
    "😝",
    "😀",
    "😗",
    "😙",
    "😛",
    "😴",
    "😟",
    "😦",
    "😧",
    "😮",
    "😬",
    "😕",
    "😯",
    "😑",
    "😒",
    "😅",
    "😓",
    "😥",
    "😩",
    "😔",
    "😞",
    "😖",
    "😣",
    "💩",
    "😡",
    "🔥",
    "👎",
    "✋",
    "👏",
    "🤘",
    "🙋",
    "👸",
    "🙈",
    "🙉",
    "🙊",
    "👀",
    "🍔",
    "♿️",
    "🐗",
    "🐷",
    "🐶",
    "🐵",
    "🐢",
    "🐝",
    "🐔",
    "🐛",
    "🖕"
  ];
  /**
   * 添加emoji
   */
  private handleEmojiPut(value: string) {
    this.input_data += value;
  }
  /**
   * 发布评论  将需要返回的参数赋值给另一个字段 然后清空原字段
   */
  @Emit("release")
  handleCommentRelease() {
    const content = this.input_data.replace("\n", "");
    this.show = false;
    this.input_data = "";
    return content;
  }
  /**
   * emoji区域鼠标移出 隐藏
   */
  private handleMouseLeave() {
    this.show = false;
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
.emoji {
  position: relative;
  .emoji-content {
    width: 363px;
    height: 170px;
    background: #fff;
    border: 1px solid #eee;
    position: absolute;
    top: 30px;
    left: -10px;
    padding: 5px;
    span {
      display: inline-block;
      padding: 3px 5px;
    }
    span:hover {
      background: #eee;
    }
  }
}
</style>