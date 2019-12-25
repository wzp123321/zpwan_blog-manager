<template>
  <div class="frsp">
    <div class="select">111111111</div>
    <Button type="primary" @click="()=>{visible = true}">新增字典</Button>
    <Modal title="新增字典" v-model="visible" okText="确认" cancelText="取消" @ok="handleCreateDic">
      <Form :form="form" @submit="handleCreateDic">
        <FormItem label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Form, Input, Modal, Select } from "ant-design-vue";
@Component({
  name: "DicHeader",
  components: {
    Button,
    Form,
    Input,
    Modal,
    FormItem: Form.Item,
    Select,
    SelectOption: Select.Option
  }
})
export default class DicHeader extends Vue {
  private form: any;
  // 对话框开关
  private visible: boolean = false;
  /**
   * 新增字典
   */
  private handleCreateDic(e: any) {
    e.preventDefault();
    this.form.validateFields(
      (err: Error, values: DictionaryModule.DictionaryInfo) => {
        console.log(values);
      }
    );
  }
  created() {
    this.form = this.$form.createForm(this);
  }
}
</script>
<style lang="less" scoped>
</style>