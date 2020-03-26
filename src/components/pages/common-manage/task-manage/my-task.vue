<template>
  <Modal
    title="今日任务"
    :visible="viewVisiable"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
  >
    <Timeline>
      <TimelineItem color="green">Create a services site 2015-09-01</TimelineItem>
      <TimelineItem color="blue">Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem color="green">Technical testing 2015-09-01</TimelineItem>
      <TimelineItem color="blue">Network problems being solved 2015-09-01</TimelineItem>
    </Timeline>
  </Modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Collapse, Modal, Timeline } from "ant-design-vue";
@Component({
  name: "ToDayTaskList",
  components: {
    Collapse,
    CollapsePanel: Collapse.Panel,
    Modal,
    Timeline,
    TimelineItem: Timeline.Item
  }
})
export default class ToDayTaskList extends Vue {
  @Prop({ default: false })
  private viewVisiable!: boolean;

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