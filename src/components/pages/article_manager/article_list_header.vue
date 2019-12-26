<template>
  <div class="frsp">
    <div class="select">111111</div>
    <Button type="primary" @click="()=>{$router.push('/app/article/add')}">新增文章</Button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button } from "ant-design-vue";
@Component({
  name: "ArticleHeader",
  components: {
    Button
  }
})
export default class ArticleHeader extends Vue {}
</script>
<style lang="less" scoped>
</style>