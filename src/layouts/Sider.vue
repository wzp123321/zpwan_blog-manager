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
        <SubMenu v-if="menu.children" :key="'menu_' + menu.en_name">
          <span slot="title">
            <a-icon :type="menu.icon"></a-icon>
            {{menu.name}}
          </span>
          <MenuItem
            v-for="menuChild in menu.children"
            :key="'menuchild_' + menuChild.name"
            :class="menuChild.url===$route.path ? 'ant-menu-item-selected': ''"
          >
            <router-link :to="menuChild.url">{{ menuChild.name }}</router-link>
          </MenuItem>
        </SubMenu>
        <MenuItem
          v-else
          :key="'menu_' + menu.name"
          :class="menu.url===$route.path ? 'ant-menu-item-selected': ''"
          @click="()=>{$router.push(menu.url)}"
        >
          <a-icon :type="menu.icon"></a-icon>
          <span>{{ menu.name }}</span>
        </MenuItem>
      </template>
    </Menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Layout, Menu, Icon } from "ant-design-vue";
import { SiderRouters } from "@/assets/js/Sider";
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
  private rootSubmenuKeys: Array<string> = [
    "menu_webManager",
    "menu_commentManager",
    "menu_dictionary",
    "menu_util"
  ];
  private openKeys: Array<string> = ["menu_webManager"];

  private defaultSelectKey: string = "menu_0";
  /**
   * menus
   */
  private menus: Array<MenuInfo> = [];

  mounted() {
    this.menus = SiderRouters;
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
