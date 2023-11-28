<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    :items="items"
    @click="handleClick"
  ></a-menu>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from "vue";
import {
  BookOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps, ItemType } from "ant-design-vue";

const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem("콘텐츠 관리", "sub1", () => h(BookOutlined), [
    getItem("웹툰 / 웹소설 목록", "1"),
    getItem("시리즈 목록", "2"), // 단행본, 단일 회차 구분
    getItem("회차 목록", "3"),
  ]),

  { type: "divider" },
]);

const handleClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

watch(openKeys, (val) => {
  console.log("openKeys", val);
});
</script>
