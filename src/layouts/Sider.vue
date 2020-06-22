<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <h1 class="sider-title" v-if="!collapsed">博客管理后台</h1>
    <Menu
      mode="inline"
      theme="dark"
      :selectedKeys="[defaultSelectKey]"
      :openKeys="openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="menu in menus">
        <SubMenu v-if="JSON.stringify(menu.children) !=='[]'" :key="menu.menuName">
          <span slot="title">
            <a-icon :type="menu.meta.icon"></a-icon>
            {{menu.meta.name}}
          </span>
          <MenuItem
            v-for="menuChild in menu.children"
            :key="'menuchild_' + menuChild.menuName"
            :class="menuChild.path===$route.path ? 'ant-menu-item-selected': ''"
          >
            <router-link :to="menuChild.path">{{ menuChild.meta.name }}</router-link>
          </MenuItem>
        </SubMenu>
        <MenuItem
          v-else
          :key="menu.menuName"
          :class="menu.url===$route.path ? 'ant-menu-item-selected': ''"
          @click="()=>{$router.push(menu.path)}"
        >
          <a-icon :type="menu.meta.icon"></a-icon>
          <span>{{ menu.meta.name }}</span>
        </MenuItem>
      </template>
    </Menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Layout, Menu, Icon } from "ant-design-vue";
import { routes } from "@/router/index";
@Component({
  name: "SiderBox",
  components: {
    "a-layout-sider": Layout.Sider,
    Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
    "a-icon": Icon
  }
})
export default class SiderBox extends Vue {
  @Prop({ default: false })
  private collapsed!: boolean;
  // 一级目录数组
  private rootSubmenuKeys: Array<string> = [];
  private openKeys: Array<string> = [];

  private defaultSelectKey: string = "";
  /**
   * menus
   */
  private menus: Array<MenuInfo> = [];

  mounted() {
    this.$nextTick(() => {
      this.getRoutesCalculate();
    });
  }

  // 封装路由数组
  getRoutesCalculate() {
    let newRoutes: RouteInfo[] = [];
    routes.forEach((item: any) => {
      if (item.meta && item.meta.isAside) {
        newRoutes = item.children.filter((childItem: any) => {
          if (childItem.meta && childItem.meta.isAside) {
            const paths = childItem.path.split("/");
            if (childItem.children) {
              this.rootSubmenuKeys.push("menu_" + paths[paths.length - 1]);
            }
            childItem.menuName = "menu_" + paths[paths.length - 1];
            childItem.children = childItem.children.filter((sonItem: any) => {
              if (sonItem.meta && sonItem.meta.isAside) {
                const newpaths = sonItem.path.split("/");
                sonItem.menuName =
                  "menu_" +
                  newpaths[newpaths.length - 2] +
                  newpaths[newpaths.length - 1];
                return sonItem;
              }
            });
            return childItem;
          }
        });
      }
    });
    this.menus = newRoutes;
    this.defaultSelectKey = this.rootSubmenuKeys[0];
    this.openKeys = [this.rootSubmenuKeys[0]];
  }

  onOpenChange(openKeys: any) {
    const latestOpenKey = openKeys.find(
      (key: any) => this.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys;
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  }
}
</script>
<style lang="less" scoped>
.sider-title {
  text-align: center;
  color: #fff;
  font-family: cursive;
  margin: 0;
  padding: 10px 0;
  position: relative;
  bottom: 0;
}

.sider-title:hover {
  cursor: pointer;
  animation: title_shake 1.5s linear infinite forwards;
}

.ant-menu {
  font-size: 20px;
  color: #fff;
  font-weight: 400;
}

@keyframes title_shake {
  0% {
    bottom: 0;
  }
  25% {
    bottom: 5px;
  }
  50% {
    bottom: 0;
  }
  75% {
    bottom: 2px;
  }
  100% {
    bottom: 0;
  }
}
</style>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
