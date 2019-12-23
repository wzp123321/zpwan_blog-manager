<template>
  <a-layout-header class="header-box">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="changeCollpased"
    />
    <div class="userinfo">
      <Avatar icon="user" />
      <span class="username">{{ userName }}</span>
      <span class="logout" @click="quiteAccount">退出登录</span>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Layout, Icon, Avatar, Modal } from "ant-design-vue";
@Component({
  name: "HeaderBox",
  components: {
    "a-layout-header": Layout.Header,
    "a-icon": Icon,
    Avatar,
    Modal
  }
})
export default class HeaderBox extends Vue {
  @Emit("change")
  changeCollpased() {}
  @Prop({
    default: false
  })
  private collapsed!: boolean;
  @Prop({
    default: ""
  })
  private userName!: string;
  /**
   * 退出
   */
  private quiteAccount() {
    Modal.confirm({
      title: "退出登录",
      content: "您确认退出登录吗？.",
      okText: "确认",
      cancelText: "取消",
      onCancel: () => {},
      onOk: () => {
        console.log("退出");
      }
    });
  }
}
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  padding: 0 10px;
  .trigger {
    display: block;
  }
  .userinfo {
    .logout:hover {
      text-decoration: underline;
    }
    span {
      display: inline-block;
      padding: 0 4px;
    }
  }
}
</style>