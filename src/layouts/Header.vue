<template>
  <a-layout-header class="header-box">
    <div class="frsp">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="changeCollpased"
      />
      <a-breadcrumb style="line-height: 58px;">
        <a-breadcrumb-item v-for="(routeItem,index) in routers" :key="'route_'+index">
          <router-link :to="routeItem.path">{{ routeItem.meta.name }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="userinfo">
      <span class="avatar">
        <img src="../assets/imgs/headshot.png" alt />
      </span>
      <span class="username">{{ userName }}</span>
      <span class="logout" @click="quiteAccount">退出登录</span>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { Layout, Icon, Avatar, Modal, Breadcrumb } from "ant-design-vue";
@Component({
  name: "HeaderBox",
  components: {
    "a-layout-header": Layout.Header,
    "a-icon": Icon,
    Avatar,
    Modal,
    "a-breadcrumb": Breadcrumb,
    "a-breadcrumb-item": Breadcrumb.Item
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
  // 路由数组
  private routers: Array<RouteInfo> = [];
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
        this.$router.push("/signin");
      }
    });
  }
  /**
   * 监听路有变化
   */
  @Watch("$route")
  handleRouteChange(newVal: RouteInfo, oldVal: RouteInfo) {
    this.routers = this.$route.matched.filter(item => item.meta.name);
  }
  created() {
    this.routers = this.$route.matched.filter(item => item.meta.name);
  }
}
</script>
<style lang="less" scoped>
.header-box {
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  padding: 0 10px;
  .trigger {
    display: inline-block;
  }
  .userinfo {
    .avatar {
      img {
        border-radius: 50%;
      }
      img:hover {
        cursor: pointer;
        animation: avatar_move 200ms linear infinite forwards;
      }
    }
    .logout:hover {
      text-decoration: underline;
    }
    span {
      display: inline-block;
      padding: 0 4px;
    }
  }
}

@keyframes avatar_move {
  0% {
    transform: rotateZ(0deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  75% {
    transform: rotateZ(10deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>