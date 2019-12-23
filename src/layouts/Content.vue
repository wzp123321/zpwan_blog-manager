<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    <router-view></router-view>
  </a-layout-content>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Layout } from "ant-design-vue";
@Component({
  name: "ContentBox",
  components: {
    "a-layout-content": Layout.Content
  }
})
export default class COntentBox extends Vue {}
</script>
<style lang="less" scoped>
</style>
