<template>
  <div>
    今日访客：111
    今天留言：111，
    1.本月方可量
    2.本月点赞量
    3.本月分享量
    // 1F923 可以根据http://unicode.org/emoji/charts/full-emoji-list.html这里面找对应的
    <span
      v-html="`&\#`+`x1F923`"
    ></span>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "Dashboard"
})
export default class Dashboard extends Vue {}
</script>
<style lang="less" scoped>
</style>