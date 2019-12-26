<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "CommentModule",
  components: {}
})
export default class CommentModule extends Vue {}
</script>
<style lang="less" scoped>
</style>