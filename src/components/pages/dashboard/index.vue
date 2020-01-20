<template>
  <div>
   1.新建表情管理表  可新增表情  存储Unicode编码
    // 1F923 可以根据http://unicode.org/emoji/charts/full-emoji-list.html这里面找对应的
    <span
      v-html="`&\#x1F923`"
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