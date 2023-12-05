<template>
  <div>
    <a-table :columns="columns" :data-source="data">
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
import { FileTextTwoTone } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "ReleaseDay",
    dataIndex: "release_day",
    key: "release_day",
  },
];

const data = [
  {
    key: "1",
    title: "길사",
    author: "carbo(도효원)",
    genre: "로맨스",
    category: "웹소설",
    release_day: "수요일",
  },
  {
    key: "2",
    title: "나 혼자만 레벨업",
    author: "추공",
    genre: "판타지",
    category: "웹소설",
    release_day: "수요일",
  },
  {
    key: "3",
    title: "바바리안 퀘스트",
    author: "백수귀족",
    genre: "판타지",
    category: "웹소설",
    release_day: "수요일",
  },
  {
    key: "4",
    title: "전지적 독자 시점",
    author: "추공",
    genre: "판타지",
    category: "웹소설",
    release_day: "수요일",
  },
];
</script>
