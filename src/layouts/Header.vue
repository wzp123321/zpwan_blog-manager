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
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xingzhuanggongnengtubiao-" />
      </svg>
      <span style="font-size:12px">{{cityinfo}}</span>
      <span class="avatar">
        <img v-if="avatar_url!==''" :src="avatar_url" alt />
        <img src="../assets/imgs/headshot.png" alt />
      </span>
      <span class="username">{{ name  }}</span>
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
  // 城市定位
  private cityinfo: string = "";
  // 路由数组
  private routers: Array<RouteInfo> = [];
  // 用户名
  private name: string = "";
  //用户头像
  private avatar_url: string = "";
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
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("avatar_url");
        localStorage.removeItem("token")
        this.$router.push("/signin");
      }
    });
  }

  //获取用户所在城市信息
  showCityInfo() {
    //实例化城市查询类  https://www.jianshu.com/p/e945c3ce28fd
    const citysearch = new AMap.CitySearch();
    const that = this;
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status: string, result: any) {
      if (status === "complete" && result.info === "OK") {
        if (result && result.city && result.bounds) {
          const cityinfo = result.province + "" + result.city;
          that.cityinfo = cityinfo;
        }
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
    this.showCityInfo();
    this.name = localStorage.getItem("name") || "zpwan";
    this.avatar_url = localStorage.getItem("avatar_url") || "../assets/imgs/headshot.png";
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
        max-width: 30px;
        max-height: 30px;
        border-radius: 50px
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