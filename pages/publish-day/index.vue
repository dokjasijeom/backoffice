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
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="{ pageSize: 20 }"
    >
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
const { data, execute, error, pending } = await useApi(
  "/backoffice/publish-days",
  {
    method: "get",
  }
);

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "DisplayDay",
    dataIndex: "displayDay",
    key: "displayDay",
  },
  {
    title: "DisplayOrder",
    dataIndex: "displayOrder",
    key: "displayOrder",
  },
];

const tableData = computed(() => (data.value as any).data);
</script>
