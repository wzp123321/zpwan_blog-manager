<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "FriendlyModule"
})
export default class FriendlyModule extends Vue {}
</script>
<style lang="less" scoped>
</style>