<template>
  <Modal
    title="今日任务"
    :visible="viewVisiable"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
  >
    <Timeline v-if="JSON.stringify(todayTasks) !== '[]'">
      <TimelineItem
        v-for="(item,index) in todayTasks"
        :key="index"
        :color="item.is_complete===0 ? 'blue':'green'"
      >{{item.title}} {{item.endline}}</TimelineItem>
    </Timeline>
    <Empty v-else description="暂无任务" />
  </Modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Collapse, Modal, Timeline, Empty } from "ant-design-vue";
@Component({
  name: "ToDayTaskList",
  components: {
    Collapse,
    CollapsePanel: Collapse.Panel,
    Modal,
    Timeline,
    TimelineItem: Timeline.Item,
    Empty
  }
})
export default class ToDayTaskList extends Vue {
  @Prop({ default: false })
  private viewVisiable!: boolean;

  @Prop({ default: [] })
  private todayTasks!: CommonModule.TaskInfo[];

  @Emit("viewCancel")
  private handleOk() {}
  @Emit("viewCancel")
  private handleCancel() {}
}
</script>
<style lang="less" scoped>
</style>
<style lang="less">
.ant-timeline-item-last > .ant-timeline-item-content {
  min-height: 19px !important;
}
.ant-collapse-content > .ant-collapse-content-box {
  padding-bottom: 0;
}
</style>