<template>
  <div>
    <FormPageHeader v-bind:title="`웹툰 / 웹소설 등록`" />
    <a-form
      style="border: solid 1px #ccc; border-radius: 16px; padding: 50px 16px"
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="title" label="작품명" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item ref="description" label="작품 설명" name="description">
        <a-textarea :rows="4" v-model:value="formState.description" />
      </a-form-item>
      <a-form-item ref="isbn" label="ISBN" name="isbn">
        <a-input v-model:value="formState.isbn" />
      </a-form-item>
      <a-form-item ref="ecn" label="ECN" name="ecn">
        <a-input v-model:value="formState.ecn" />
      </a-form-item>
      <a-form-item
        label="웹소설 / 웹툰 구분"
        ref="seriesType"
        name="seriesType"
      >
        <a-radio-group v-model:value="formState.seriesType">
          <a-radio value="webnovel">웹소설</a-radio>
          <a-radio value="webtoon">웹툰</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="장르" ref="genreId" name="genreId">
        <a-radio-group v-model:value="formState.genreId">
          <a-radio v-for="genre in genreData" :value="genre.Id">{{
            genre.Name
          }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item ref="image" label="표지 이미지" name="image">
        <a-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <!-- <img
            v-if="imageUrl"
            style="position: relative; width: 100%; height: 100%"
            :src="imageUrl"
            alt="preview"
          /> -->
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
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
import type { UploadFile } from "ant-design-vue";

interface FormState {
  title: string;
  description: string;
  isbn: string;
  ecn: string;
  seriesType: string;
  genreId: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  title: "",
  description: "",
  isbn: "",
  ecn: "",
  seriesType: "webnovel",
  genreId: "1",
});
const fileList = ref([]);
const rules: Record<string, Rule[]> = {
  title: [
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
  isbn: [
    {
      required: false,
      message: "Please input isbn",
      trigger: "change",
    },
  ],
  ecn: [
    {
      required: false,
      message: "Please input ecn",
      trigger: "change",
    },
  ],
  seriesType: [
    {
      required: true,
      message: "Please select seriesType",
      trigger: "change",
    },
  ],
  genreId: [
    {
      required: true,
      message: "Please select genreId",
      trigger: "change",
    },
  ],
};

const genreData = computed(() => useGenres().genres as GenreResponse[]);
if (genreData.value.length == 0) useGenres().getList();

const beforeUpload = (file: any) => {
  fileList.value = fileList.value.concat(file);
  return false;
};

const formData = computed(() => {
  const item = new FormData();
  Object.entries(unref(formState)).forEach(([key, value]) => {
    if (value) {
      item.append(key, value);
    }
  });
  fileList.value.forEach((file: UploadFile) =>
    item.append("image", file.originFileObj!)
  );
  return item;
});

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi("/backoffice/series/", {
        method: "post",
        body: formData.value,
      });
      console.log("values", formState, toRaw(formState));
      if (data) {
        console.log(data);
        return navigateTo("/series");
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
