<template>
  <router-view></router-view>
</template>
<script lang="ts">
import {Vue,Component} from "vue-property-decorator"
@Component({
  name:"ArticleModule"
})
export default class ArticleModule extends Vue{}
</script>