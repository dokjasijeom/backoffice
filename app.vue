<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "독자시점 백오피스",
  meta: [
    {
      name: "description",
      content:
        "독자시점 콘텐츠 관리 페이지 입니다. 인가된 사용자만 접근할 수 있습니다.",
    },
  ],
});
</script>
