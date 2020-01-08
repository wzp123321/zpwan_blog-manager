<template>
  <Modal
    title="新增字典"
    :visible="visible"
    okText="确认"
    cancelText="取消"
    @ok="handleCreateDic"
    @cancel="handleCancel"
  >
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
          style="width: 220px"
          @change="handleTypeChange"
          placeholder="请选择"
          :allowClear="true"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
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
        v-show="type ===2"
        label="所属一级目录"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <Select
          style="width: 220px"
          placeholder="请选择"
          @change="(value)=>{pId = value}"
          :allowClear="true"
          :getPopupContainer="(triggerNode)=>{return triggerNode.parentNode|| document.body}"
          v-decorator="['pId', { rules: [{ required: type ===2 ? true : false, message: '请输入所属目录!' }] }]"
        >
          <SelectOption v-for="(item,index) in firstcatalogs" :key="index" :value="item.id">
            {{
            item.value
            }}
          </SelectOption>
        </Select>
      </FormItem>
      <FormItem label="description" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <TextArea :rows="4" placeholder="请输入description值" v-decorator="['description']" />
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { Button, Form, Input, Modal, Select, message } from "ant-design-vue";
import HttpRequest from "@/assets/api/modules/index";
Vue.prototype.$message = message;
@Component({
  name: "CatalogModal",
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
export default class CatalogModal extends Vue {
  // 对话框开关
  @Prop({ default: false })
  private visible!: boolean;

  // 字典
  @Prop()
  private dicInfo!: DictionaryModule.DictionaryInfo;

  // 类型数组
  @Prop({ default: {} })
  private types!: Array<{ [key: string]: any }>;

  private form: any;
  // 新增字典选择类型
  private type: number = 0;
  // 所属目录id
  private pId: number = 0;

  private firstcatalogs: Array<DictionaryModule.DictionaryInfo> = [];
  /**
   * 取消
   */
  @Emit("cancel")
  private handleCancel() {}
  /**
   * 新增类型
   */
  private async handleTypeChange(type: number) {
    this.type = type;
    if (type === 2) {
      this.form.setFields({
        pId: { value: "" }
      });
      this.handleSecondcatalogList(1);
    }
  }
  /**
   * 请求二级目录数组
   */
  private async handleSecondcatalogList(type: number) {
    const res: ApiResponse<
      ListResponse<Array<DictionaryModule.DictionaryInfo>>
    > = await HttpRequest.DictionaryModule.getCatalogList({ type });

    if (res && res.data) {
      const dataSource = res.data.data;
      this.firstcatalogs = dataSource;
    }
  }
  /**
   * 新增&&编辑字典
   */
  @Emit("operation")
  private handleCreateDic(e: any) {
    e.preventDefault();
    let newVal: any = {};
    this.form.validateFields(
      (err: Error, values: DictionaryModule.DictionaryInfo) => {
        if (!err) {
          newVal = values;
        }
      }
    );
    if (this.dicInfo.id !== 0) {
      newVal = Object.assign(newVal, { id: this.dicInfo.id });
    }
    return newVal;
  }
  mounted() {
    this.form.resetFields();
    // 判断是否为编辑
    if (this.visible && this.dicInfo.id !== 0) {
      const { code, value, description, type, pid, pcode } = this.dicInfo;
      this.handleSecondcatalogList(1);
      this.form.setFieldsValue({
        code,
        value,
        description,
        type,
        pId: pid
      });
      this.type = type;
      this.pId = pid;
    }
  }
  created() {
    this.form = this.$form.createForm(this);
    this.pId = 0;
    this.type = 0;
    this.firstcatalogs = [];
  }
}
</script>
<style lang="less" scoped>
</style>