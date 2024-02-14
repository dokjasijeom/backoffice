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
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: "",
});
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "Please input name",
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
