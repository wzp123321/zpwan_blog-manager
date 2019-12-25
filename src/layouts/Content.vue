<template>
  <div style="background:#fff;padding:15px">
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "ContentBox"
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
