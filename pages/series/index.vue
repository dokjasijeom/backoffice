<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="웹툰 / 웹소설 관리"
        sub-title="웹툰 / 웹소설을 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/series/create">
          <a-button type="primary" size="large">
            <template #icon>
              <FormOutlined />
            </template>
            신규 등록
          </a-button>
        </NuxtLink>
      </div>
    </a-flex>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="{ pageSize: 20 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'Title'">
          <span>
            <file-text-two-tone />
            {{ column.title }}
          </span>
        </template>
        <template v-if="column.key === 'Thumbnail'">
          <span>
            <FileImageOutlined />
            {{ column.title }}
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, value }">
        <template v-if="column.key === 'Thumbnail'">
          <img
            :src="`${useRuntimeConfig().thumbnailBaseUrl}${value}`"
            width="80"
          />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
const { data, execute, error, pending } = await useApi("/backoffice/series", {
  method: "get",
});

const columns = [
  {
    title: "아이디",
    dataIndex: "Id",
    key: "Id",
  },

  {
    title: "해시 아이디",
    dataIndex: "HashId",
    key: "HashId",
  },
  {
    title: "표지 이미지",
    dataIndex: "Thumbnail",
    key: "Thumbnail",
  },
  {
    title: "제목",
    dataIndex: "Title",
    key: "Title",
  },
  {
    title: "설명",
    dataIndex: "Description",
    key: "Description",
  },
];

const tableData = computed(() => (data.value as any).data);
</script>
