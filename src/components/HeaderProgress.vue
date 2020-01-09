<template>
  <a-progress
    v-show="percent!==0"
    strokeLinecap="square"
    :percent="percent"
    class="header-progress"
    :showInfo="false"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Progress } from "ant-design-vue";
@Component({
  name: "HeaderProgress",
  components: {
    "a-progress": Progress
  }
})
export default class HeaderProgress extends Vue {
  @Prop({ default: 0 })
  private totalHeight!: number;
  @Prop({ default: 0 })
  private currentHeight!: number;
  // 当前进度 为0时不显示顶部进度条
  private percent: number = 0;

  /**
   * 监听当前滚动高度
   */
  @Watch("currentHeight")
  private handleCurrentHeightChange(newVal: number, oldVal: number) {
    this.percent = 100*newVal / this.totalHeight;
  }
}
</script>
<style lang="less" scoped>
.header-progress {
  width: 100%;
  position: fixed;
  top: -11px;
  left: 0;
}
</style>
<style>
.ant-progress-bg {
  height: 3px !important;
}
</style>