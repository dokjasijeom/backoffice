<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="userStore.userData ? items : noAuthItems"
    @click="handleClick"
  ></a-menu>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from "vue";
import {
  BookOutlined,
  ShopOutlined,
  BarsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps, ItemType } from "ant-design-vue";
const userStore = useUsers();

const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const noAuthItems: ItemType[] = reactive([
  getItem("로그인이 필요합니다.", "sub1", () => h(UserOutlined)),
]);

const items: ItemType[] = reactive([
  getItem("콘텐츠 관리", "sub1", () => h(BookOutlined), [
    getItem("웹툰 / 웹소설 목록", "1"),
    getItem("시리즈 목록", "2"), // 단행본, 단일 회차 구분
    getItem("회차 목록", "3"),
  ]),

  { type: "divider" },
  getItem("출판사 목록", "4", () => h(ShopOutlined)),

  { type: "divider" },
  getItem("장르 목록", "5", () => h(BarsOutlined)),
  { type: "divider" },
  getItem("작가 목록", "6", () => h(UsergroupAddOutlined)),
  { type: "divider" },
]);

const handleClick = (e: any) => {
  console.log("click", e);
};

watch(openKeys, (val) => {
  console.log("openKeys", val);
});
</script>
