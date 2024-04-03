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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-popconfirm
            title="삭제하시겠습니까?"
            ok-text="네, 삭제합니다"
            cancel-text="취소"
            placement="left"
            @confirm="deleteHandler(record.id)"
            @cancel="cancelDelete"
          >
            <a-button type="primary" danger size="large">
              <template #icon>
                <ClearOutlined />
              </template>
              삭제
            </a-button>
          </a-popconfirm>
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
    dataIndex: "id",
    key: "id",
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "해시 아이디",
    dataIndex: "hashId",
    key: "hashId",
  },
  {
    title: "메인 장르",
    dataIndex: "parentGenreId",
    key: "parentGenreId",
  },
  {
    title: "Action",
    key: "action",
  },
];

const tableData = computed(() => genreStore.genres);

const deleteHandler = async (genreId: number) => {
  await useApi(`/backoffice/genres/${genreId}`, {
    method: "delete",
  }).then(async () => {
    notification["success"]({
      message: "장르 관리",
      description: `'${
        tableData.value.find((v) => v.id == genreId)?.name
      }' 장르 삭제가 완료되었습니다.`,
      duration: 3,
    });

    await genreStore.getList();
  });
};

const cancelDelete = () => console.log("삭제 취소");
</script>
