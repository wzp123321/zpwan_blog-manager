<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { notification } from "ant-design-vue";
Vue.prototype.$notification = notification

@Component({
  components: {}
})
export default class App extends Vue {
  mounted() {
    this.$notification.success({
      message: "登录成功",
      description:
        "恭喜你登录成功，欢迎回来！"
    });
    console.log(`                                                      
                                                      
 /$$$$$$$$  /$$$$$$  /$$  /$$  /$$  /$$$$$$  /$$$$$$$ 
|____ /$$/ /$$__  $$| $$ | $$ | $$ |____  $$| $$__  $$
   /$$$$/ | $$  \ $$| $$ | $$ | $$  /$$$$$$$| $$  \ $$
  /$$__/  | $$  | $$| $$ | $$ | $$ /$$__  $$| $$  | $$
 /$$$$$$$$| $$$$$$$/|  $$$$$/$$$$/|  $$$$$$$| $$  | $$
|________/| $$____/  \_____/\___/  \_______/|__/  |__/
          | $$                                        
          | $$                                        
          |__/      `);
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100%;
  overflow: hidden;
}
</style>
