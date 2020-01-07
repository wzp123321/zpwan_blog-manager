<template>
  <h1>CommentList</h1>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Table, Button, Modal } from "ant-design-vue";
@Component({
  name: "CommentList",
  components: {
    "a-table": Table
  }
})
export default class CommentList extends Vue {
  
}
</script>
<style lang="less" scoped>
</style>