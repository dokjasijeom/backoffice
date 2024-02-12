<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      width="256"
      theme="light"
      v-model:collapsed="collapsed"
      collapsible
    >
      <div class="logo">
        <img src="/logo.svg" style="width: 100%; height: 100%" />
      </div>
      <AppSidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div class="main-layout">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <div></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const collapsed = ref<boolean>(false);
</script>

<style>
.logo {
  height: 32px;
  margin: 16px;
}
.main-layout {
  padding: 24px;
  min-height: 100vh;
}
</style>
