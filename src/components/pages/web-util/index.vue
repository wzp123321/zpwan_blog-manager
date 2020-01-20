<template>
  <div class="comment-wrapper">
  
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Input, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;
@Component({
  name: "UtilModule",
  components: {
    Input,
  }
})
export default class UtilModule extends Vue {

}
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  padding-left: 20px;
  border-left: 3px solid #626362;
  margin-top: 30px;
}
</style>