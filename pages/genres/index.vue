<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="장르 관리"
        sub-title="콘텐츠에 연결될 장르를 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/genres/create">
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
const genreStore = useGenres();
await genreStore.getList();

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
  {
    title: "메인 장르",
    dataIndex: "ParentGenreId",
    key: "ParentGenreId",
  },
];

const tableData = computed(() => genreStore.genres);
</script>
