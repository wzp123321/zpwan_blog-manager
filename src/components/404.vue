<template>
  <div class="not-found">
    <img src="@/assets/imgs/404.jpg" alt />
    <div>
      <a href="#/app">返回首页</a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="less" scoped>
.not-found {
  width: 100%;
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column-reverse;
    a {
      display: block;
      margin-bottom: 40px;
    }
  }
}
</style>