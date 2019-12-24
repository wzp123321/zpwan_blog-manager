<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </a-layout-content>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Layout } from "ant-design-vue";
@Component({
  name: "ContentBox",
  components: {
    "a-layout-content": Layout.Content
  }
})
export default class COntentBox extends Vue {}
</script>
<style lang="less">
.slide-right,
.slide-left {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-left-enter-active {
  transition: all 0.4s ease;
}
.slide-left-leave-active {
  transition: all 0.2s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-left-enter {
  left: 0;
  right: 0;
  transform: translateX(300px);
  opacity: 0;
}
.slide-left-leave-to {
  left: 0;
  right: 0;
  opacity: 0;
}
.slide-right-enter-active {
  transition: all 0.2s ease;
}
.slide-right-leave-active {
  transform: translateX(300px);
  transition: all 0.3s ease-out;
}
.slide-right-enter {
  left: 0;
  right: 0;
  opacity: 0;
}
.slide-right-leave-to {
  left: 0;
  right: 0;
  opacity: 0;
}
</style>
