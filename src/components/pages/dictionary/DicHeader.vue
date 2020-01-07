<template>
  <div class="frsp">
    <div class="select">
      <Select style="width: 120px" @change="handleChange" placeholder="请选择" :allowClear="true">
        <SelectOption v-for="item in types" :key="item.key" :value="item.key">
          {{
          item.value
          }}
        </SelectOption>
      </Select>
    </div>
    <Button type="primary" @click="()=>{visible = true}">新增字典</Button>
    <Modal title="新增字典" v-model="visible" okText="确认" cancelText="取消" @ok="handleCreateDic">
      <Form :form="form" @submit="handleCreateDic" :hideRequiredMark="false">
        <FormItem label="code" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            placeholder="请输入code值"
            v-decorator="['code', { rules: [{ required: true, message: '请输入code值!' }] }]"
          />
        </FormItem>
        <FormItem label="value" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Input
            placeholder="请输入value值"
            v-decorator="['value', { rules: [{ required: true, message: '请输入value值!' }] }]"
          />
        </FormItem>
        <FormItem label="类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <Select
            style="width: 120px"
            @change="(value)=>{type = value}"
            placeholder="请选择"
            :allowClear="true"
            v-decorator="['type', { rules: [{ required: true, message: '请输入类型!' }] }]"
          >
            <SelectOption v-for="item in types" :key="item.key" :value="item.key">
              {{
              item.value
              }}
            </SelectOption>
          </Select>
        </FormItem>
        <FormItem
          v-show="type !==0"
          label="所属一级目录"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
        <!-- 这里pId数据库字段改为pCode pValue -->
          <Select
            style="width: 120px"
            placeholder="请选择"
            @chane="(value)=>{pId = value}"
            :allowClear="true"
            v-decorator="['pCode', { rules: [{ required: true, message: '请输入所属目录!' }] }]"
          >
            <SelectOption v-for="item in types" :key="item.key" :value="item.key">
              {{
              item.value
              }}
            </SelectOption>
          </Select>
        </FormItem>
        <FormItem label="description" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <TextArea
            :rows="4"
            placeholder="请输入description值"
            v-decorator="['description', { rules: [{ required: true, message: '请输入description值!' }] }]"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Button, Form, Input, Modal, Select } from "ant-design-vue";
@Component({
  name: "DicHeader",
  components: {
    Button,
    Form,
    Input,
    Modal,
    TextArea: Input.TextArea,
    FormItem: Form.Item,
    Select,
    SelectOption: Select.Option
  }
})
export default class DicHeader extends Vue {
  private form: any;
  // 对话框开关
  private visible: boolean = false;
  // 新增字典选择类型
  private type: number = 0;
  // 所属目录id
  private pId: number = 0;
  // select
  private types: Array<{ [key: string]: any }> = [
    {
      key: 1,
      value: "一级目录"
    },
    {
      key: 2,
      value: "二级目录"
    }
  ];
  /**
   * select
   */
  @Emit("change")
  private handleChange(type: number): { [key: string]: any } {
    return type ? { type } : {};
  }
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