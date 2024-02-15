<template>
  <div>
    <FormPageHeader v-bind:title="`장르 등록`" />
    <a-form
      style="border: solid 1px #ccc; border-radius: 16px; padding: 50px 16px"
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="이름" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="장르 분류" ref="genreType" name="genreType">
        <a-radio-group v-model:value="formState.genreType">
          <a-radio value="common">공통</a-radio>
          <a-radio value="webnovel">웹소설</a-radio>
          <a-radio value="webtoon">웹툰</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">등록하기</a-button>
        <a-button style="margin-left: 10px" @click="resetForm"
          >입력값 초기화</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";

interface FormState {
  name: string;
  genreType: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: "",
  genreType: "common",
});
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "Please input name",
      trigger: "change",
    },
  ],
  genreType: [
    {
      required: true,
      message: "Please select genreType",
      trigger: "change",
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi("/backoffice/genres/", {
        method: "post",
        body: {
          name: formState.name,
          genreType: formState.genreType,
        },
      });
      console.log("values", formState, toRaw(formState));
      if (data) {
        console.log(data);
        return navigateTo("/genres");
      }
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
