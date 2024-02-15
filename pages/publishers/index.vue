<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="출판사 관리"
        sub-title="콘텐츠에 연결될 출판사를 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/publishers/create">
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
const { data, execute, error, pending } = await useApi(
  "/backoffice/publishers",
  {
    method: "get",
  }
);

const columns = [
  {
    title: "아이디",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "이름",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "해시 아이디",
    dataIndex: "HashId",
    key: "HashId",
  },
];

const tableData = computed(() => (data.value as any).data);
</script>
