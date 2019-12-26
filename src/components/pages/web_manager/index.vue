<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "WebManagerModule",
  components: {}
})
export default class WebManagerModule extends Vue {}
</script>
<style lang="less" scoped>
</style>