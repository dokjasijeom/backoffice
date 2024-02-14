<template>
  <a-flex>
    <a-page-header :title="title" @back="() => $router.back()"></a-page-header>
  </a-flex>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
});
</script>
