<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%">
    <SiderBox :collapsed="collapsed"></SiderBox>
    <a-layout style="height:100%;overflow:hidden">
      <HeaderBox @change="()=> collapsed = !collapsed" userName="zpwan" style="height:64px"></HeaderBox>
      <ContentBox style="flex:1;overflow:scroll"></ContentBox>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Layout } from "ant-design-vue";
import SiderBox from "@/layouts/Sider.vue";
import HeaderBox from "@/layouts/Header.vue";
import ContentBox from "@/layouts/Content.vue";
@Component({
  name: "Home",
  components: {
    "a-layout": Layout,
    SiderBox,
    HeaderBox,
    ContentBox
  }
})
export default class Home extends Vue {
  private collapsed: boolean = false;
}
</script>
