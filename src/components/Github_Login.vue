<template>
  <h1>qq login</h1>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "QQ_LoginModule"
})
export default class QQ_LoginModule extends Vue {
  created(){
    console.log(this.$route.params)
  }
}
</script>
<style lang="less" scoped>
</style>