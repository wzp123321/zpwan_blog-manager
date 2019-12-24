<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <h1 class="sider-title">博客管理后台</h1>
    <Menu mode="inline" theme="dark" :selectedKeys="[defaultSelectKey]">
      <template v-for="menu in menus">
        <SubMenu v-if="menu.children" :key="'menu_' + menu.name">
          <span slot="title">
            <i :class="`iconfont ${menu.icon}`"></i>
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
        >
          <router-link :to="menu.url" v-if="menu.en_name !== 'set'">
            <i :class="`iconfont ${menu.icon}`"></i>
            {{ menu.name }}
          </router-link>
          <a :href="menu.url" v-else target="_blank">{{ menu.name }}</a>
        </MenuItem>
      </template>
    </Menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Layout, Menu, Icon } from "ant-design-vue";
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

  private defaultSelectKey: string = "menu_0";
  /**
   * menus
   */
  private menus: Array<MenuInfo> = [
    {
      name: "个人中心",
      en_name: "personal",
      icon: "icon-person",
      url: "/app/admin"
    },
    {
      name: "字典管理",
      icon: "icon-zidianguanli",
      children: [
        {
          name: "标签管理",
          en_name: "tags",
          url: "/app/tags"
        },
        {
          name: "目录管理",
          en_name: "catalog",
          url: "/app/catalog"
        }
      ]
    },
    {
      name: "文章管理",
      icon: "icon-wenzhang",
      en_name: "article",
      url: "/app/article"
    }
  ];
}
</script>
<style lang="less" scoped>
.sider-title {
  text-align: center;
  color: #fff;
  font-family: cursive;
  margin: 0;
  padding: 10px 0;
}
.ant-menu {
  font-size: 20px;
  color: #fff;
  font-weight: 400;
}
</style>
