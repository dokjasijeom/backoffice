<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="연재일 관리"
        sub-title="기본 연재일 주기를 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/publish-day/create">
          <a-button type="primary" size="large">
            <template #icon>
              <FormOutlined />
            </template>
            신규 등록
          </a-button>
        </NuxtLink>
      </div>
    </a-flex>
    <a-table :columns="columns" :data-source="tableData">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'title'">
          <span>
            <file-text-two-tone />
            Title
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
const { data, execute, error, pending } = useFetch("/backoffice/publish-days", {
  method: "get",
  baseURL: useRuntimeConfig().public.baseApiURL,
  headers: {
    Authorization: `Bearer ${(useUsers().userData as any).token}`,
  },
});

const columns = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "Day",
    dataIndex: "Day",
    key: "Day",
  },
  {
    title: "DisplayDay",
    dataIndex: "DisplayDay",
    key: "DisplayDay",
  },
  {
    title: "DisplayOrder",
    dataIndex: "DisplayOrder",
    key: "DisplayOrder",
  },
];

const tableData = computed(() => (data.value as any).data);
</script>
