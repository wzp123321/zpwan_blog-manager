<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <SiderBox :collapsed="collapsed"></SiderBox>
    <a-layout style="height:100%">
      <HeaderBox @change="()=> collapsed = !collapsed" userName="zpwan" style="height:64px"></HeaderBox>
      <ContentBox style="flex:1"></ContentBox>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Layout, Menu, Icon } from "ant-design-vue";
import SiderBox from "@/layouts/Sider.vue";
import HeaderBox from "@/layouts/Header.vue";
import ContentBox from "@/layouts/Content.vue";
@Component({
  name: "Home",
  components: {
    "a-layout": Layout,
    "a-layout-footer": Layout.Footer,
    "a-icon": Icon,
    SiderBox,
    HeaderBox,
    ContentBox
  }
})
export default class Home extends Vue {
  // 侧边栏开关
  private collapsed: boolean = false;
}
</script>
<style lang="less" scoped>
</style>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
