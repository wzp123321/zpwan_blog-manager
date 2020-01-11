<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {
  mounted() {
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
