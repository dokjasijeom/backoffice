<template>
  <div>
    <FormPageHeader v-bind:title="`플랫폼 등록`" />
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
      <a-form-item ref="displayName" label="표시 이름" name="displayName">
        <a-input v-model:value="formState.displayName" />
      </a-form-item>
      <a-form-item ref="description" label="플랫폼 설명" name="description">
        <a-textarea :rows="4" v-model:value="formState.description" />
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
  displayName: string;
  description: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: "",
  displayName: "",
  description: "",
});
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "Please input name",
      trigger: "change",
    },
  ],
  displayName: [
    {
      required: true,
      message: "Please input displayName",
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
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi("/backoffice/providers/", {
        method: "post",
        body: {
          name: formState.name,
          displayName: formState.displayName,
          description:
            formState.description == "" ? undefined : formState.description,
        },
      });
      console.log("values", formState, toRaw(formState));
      if (data) {
        console.log(data);
        return navigateTo("/providers");
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
