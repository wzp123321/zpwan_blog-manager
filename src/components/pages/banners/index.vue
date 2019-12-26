<template>
 <router-view></router-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "BannerModule",
})
export default class BannerModule extends Vue {}
</script>
<style lang="less" scoped>
</style>