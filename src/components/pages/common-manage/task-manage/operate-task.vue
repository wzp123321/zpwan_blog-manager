<template>
  <Modal
    style="position:relative"
    :title="JSON.stringify(taskInfo)==='{}'?'新增明日任务':'编辑任务'"
    :visible="operateVisiable"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
  >
    <Form :form="form" @submit="handleOk">
      <FormItem label="内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <Input
          placeholder="请输入任务内容"
          v-decorator="['title', { rules: [{ required: true, message: '请输入任务内容!' }] }]"
        />
      </FormItem>
      <FormItem label="优先级" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <Select
          placeholder="请选择任务优先级"
          v-decorator="[
          'priority',
          { rules: [{ required: true, message: '请选择任务优先级!' }] },
        ]"
          :getPopupContainer="triggerNode=>{
            return triggerNode.parentNode || document.body
        }"
        >
          <SelectOption
            v-for="(item,index) in priorities"
            :key="index"
            :value="item.key"
          >{{item.value}}</SelectOption>
        </Select>
      </FormItem>
      <FormItem label="截止日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <DatePicker
          placeholder="请选择截止日期"
          v-decorator="[
          'endline',
          { rules: [{ required: true, message: '请选择截止日期!' }] },
        ]"
          :getCalendarContainer="triggerNode=>{
            return triggerNode.parentNode || document.body
        }"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Modal, Form, Input, Select, DatePicker } from "ant-design-vue";
import moment from "moment";
Vue.prototype.moment = moment;
@Component({
  name: "OperateTask",
  components: {
    Modal,
    Form,
    FormItem: Form.Item,
    Input,
    Select,
    SelectOption: Select.Option,
    DatePicker
  }
})
export default class OperateTask extends Vue {
  private form!: any;
  @Prop({ default: false })
  private operateVisiable!: boolean;
  @Prop({ default: {} })
  private taskInfo!: WebManagerModule.TaskInfo;

  private priorities: Array<{ [key: string]: any }> = [
    {
      key: 1,
      value: "低"
    },
    {
      key: 2,
      value: "高"
    }
  ];

  @Emit("operSubmit")
  private handleOk(e: any) {
    let newValue: WebManagerModule.TaskInfo = {};
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: WebManagerModule.TaskInfo) => {
        if (!err) {
          newValue = values;
        }
      }
    );
    return newValue;
  }

  @Emit("operCancel")
  private handleCancel() {}

  async created() {
    this.form = this.$form.createForm(this);
  }
  async mounted() {
    if (JSON.stringify(this.taskInfo) !== "{}") {
      const { title, priority, endline } = this.taskInfo;
      this.form.setFieldsValue({
        title,
        priority,
        endline: moment(endline, "YYYY-MM-DD")
      });
    }
  }
}
</script>
<style lang="less">
</style>