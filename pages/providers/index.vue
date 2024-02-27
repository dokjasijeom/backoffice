<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="플랫폼 관리"
        sub-title="콘텐츠가 제공되는 플랫폼을 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/providers/create">
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
        <template v-if="column.key === 'Name'">
          <span>
            <file-text-two-tone />
            {{ column.title }}
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
const providerStore = useProviders();
await providerStore.getList();

const columns = [
  {
    title: "아이디",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "해시 아이디",
    dataIndex: "hashId",
    key: "hashId",
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "표시 이름",
    dataIndex: "displayName",
    key: "displayName",
  },
];

const tableData = computed(() => providerStore.providers);
</script>
