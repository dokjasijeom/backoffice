<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <a-page-header
        title="인물 관리"
        sub-title="콘텐츠에 연결될 인물을 관리하는 페이지 입니다."
      ></a-page-header>
      <div>
        <NuxtLink to="/people/create">
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
const peopleStore = usePeople();
await peopleStore.getList();

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

const tableData = computed(() => peopleStore.people);

const deleteHandler = async (personId: number) => {
  await useApi(`/backoffice/people/${personId}`, {
    method: "delete",
  }).then(async () => {
    notification["success"]({
      message: "인물 관리",
      description: `'${
        tableData.value.find((v) => v.id == personId)?.name
      }' 인물 삭제가 완료되었습니다.`,
      duration: 3,
    });

    await peopleStore.getList();
  });
};

const cancelDelete = () => console.log("삭제 취소");
</script>
