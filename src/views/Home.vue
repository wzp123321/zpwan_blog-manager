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
import { Layout, notification } from "ant-design-vue";
import SiderBox from "@/layouts/Sider.vue";
import HeaderBox from "@/layouts/Header.vue";
import ContentBox from "@/layouts/Content.vue";
import { Route } from "vue-router";
/**
 * 在这里注册 如果其他地方有用到的就放到main.ts 但是路由必须要懒加载
 */
Component.registerHooks([
  "beforeRouteEnter", //进入路由之前
  "beforeRouteLeave", //离开路由之前
  "beforeRouteUpdate"
]);

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

  beforeRouteEnter(to: Route, from: Route, next: Function) {
    notification.success({
      message: "登录成功",
      description: "恭喜你登录成功，欢迎回来！"
    });
    next();
  }
}
</script>
