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
        <template v-if="column.key === 'title'">
          <span>
            <file-text-two-tone />
            {{ column.title }}
          </span>
        </template>
        <template v-if="column.key === 'thumbnail'">
          <span>
            <FileImageOutlined />
            {{ column.title }}
          </span>
        </template>
      </template>
      <template #bodyCell="{ record, column, value }">
        <template v-if="column.key === 'thumbnail'">
          <img :src="`${value}`" width="80" />
        </template>
        <template v-if="column.key === 'seriesType'">
          <a-tag :color="value === 'webtoon' ? 'blue' : 'green'">
            {{ value === "webtoon" ? "웹툰" : "웹소설" }}
          </a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <NuxtLink :to="`/series/${record.id}`">
              <a-button type="primary" size="small">
                <template #icon>
                  <EditOutlined />
                </template>
                수정
              </a-button>
            </NuxtLink>
            <a-button type="ghost" size="small">
              <template #icon>
                <DeleteOutlined />
              </template>
              삭제
            </a-button>
          </a-space>
        </template>
      </template>
      <!-- <a-table-column key="action" title="액션">
        
      </a-table-column> -->
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnType, TableProps } from "ant-design-vue";
const { data, execute, error, pending } = await useApi("/backoffice/series", {
  method: "get",
});

const columns: TableColumnType<any>[] = [
  {
    title: "아이디",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => a.id - b.id,
    defaultSortOrder: "descend",
    sortDirections: ["descend", "ascend"],
  },

  {
    title: "해시 아이디",
    dataIndex: "hashId",
    key: "hashId",
  },
  {
    title: "유형",
    dataIndex: "seriesType",
    key: "seriesType",
  },
  {
    title: "표지 이미지",
    dataIndex: "thumbnail",
    key: "thumbnail",
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "액션",
    key: "action",
  },
];

const tableData = computed(() => (data.value as any).data);
</script>
