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
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="{ pageSize: 20 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
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
const publisherStore = usePublishers();
await publisherStore.getList();

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
    title: "Action",
    key: "action",
  },
];

const tableData = computed(() => publisherStore.publishers);

const deleteHandler = async (publisherId: number) => {
  await useApi(`/backoffice/publishers/${publisherId}`, {
    method: "delete",
  }).then(async () => {
    notification["success"]({
      message: "출판사 관리",
      description: `'${
        tableData.value.find((v) => v.id == publisherId)?.name
      }' 출판사 삭제가 완료되었습니다.`,
      duration: 3,
    });

    await publisherStore.getList();
  });
};

const cancelDelete = () => console.log("삭제 취소");
</script>
