<template>
  <div>
    <a-flex>
      <a-page-header title="연재일 등록" @back="() => null"></a-page-header>
    </a-flex>
    <a-form
      style="border: solid 1px #ccc; border-radius: 16px; padding: 50px 16px"
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="day" label="연재일 영문명" name="day">
        <a-input v-model:value="formState.day" />
      </a-form-item>
      <a-form-item
        ref="displayDay"
        label="연재일 한글 표기명"
        name="displayDay"
      >
        <a-input v-model:value="formState.displayDay" />
      </a-form-item>
      <a-form-item
        ref="displayOrder"
        label="연재일 순서 정렬"
        name="displayOrder"
      >
        <a-input-number
          v-model:value="formState.displayOrder"
          :min="1"
          :max="10"
        />
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
  day: string;
  displayDay: string;
  displayOrder: number;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  day: "",
  displayDay: "",
  displayOrder: 1,
});
const rules: Record<string, Rule[]> = {
  day: [
    {
      required: true,
      message: "Please input day",
      trigger: "change",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  displayDay: [
    {
      required: true,
      message: "Please input displayDay",
      trigger: "change",
    },
  ],
  displayOrder: [
    {
      required: true,
      message: "Please input number",
      trigger: "change",
    },
  ],
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi("/backoffice/publish-days/", {
        method: "post",
        body: {
          day: formState.day,
          displayDay: formState.displayDay,
          displayOrder: formState.displayOrder,
        },
      });
      console.log("values", formState, toRaw(formState));
      if (data) {
        console.log(data);
        return navigateTo("/publish-day/list");
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
