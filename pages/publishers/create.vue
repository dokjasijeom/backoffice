<template>
  <div>
    <FormPageHeader v-bind:title="`출판사 등록`" />
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
      <a-form-item ref="description" label="출판사 설명" name="description">
        <a-textarea :rows="4" v-model:value="formState.description" />
      </a-form-item>
      <a-form-item ref="homepageUrl" label="홈페이지 주소" name="homepageUrl">
        <a-input v-model:value="formState.homepageUrl" />
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
  description: string;
  homepageUrl: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: "",
  description: "",
  homepageUrl: "",
});
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "Please input name",
      trigger: "change",
    },
  ],
  description: [
    {
      required: false,
      message: "Please input description",
      trigger: "change",
    },
  ],
  homepageUrl: [
    {
      required: false,
      message: "Please input homepageUrl",
      trigger: "change",
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi("/backoffice/publishers/", {
        method: "post",
        body: {
          name: formState.name,
          description:
            formState.description == "" ? undefined : formState.description,
          homepageUrl:
            formState.homepageUrl == "" ? undefined : formState.homepageUrl,
        },
      });
      console.log("values", formState, toRaw(formState));
      if (data) {
        console.log(data);
        await usePublishers().getList();
        return navigateTo("/publishers");
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
