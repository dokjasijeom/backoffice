<template>
  <div></div>
</template>

<script lang="ts" setup>
onBeforeMount(() => {
  if (useUsers().userData) {
    navigateTo("/series");
  }
});
</script>
