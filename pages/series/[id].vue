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
          <a-radio v-for="genre in genreData" :value="genre.id">
            {{ genre.name }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="연재일" ref="publishDayId" name="publishDayId">
        <a-radio-group v-model:value="formState.publishDayId">
          <a-radio v-for="publishDay in publishDayData" :value="publishDay.id">
            {{ publishDay.displayDay }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="플랫폼" ref="providerId" name="providerId">
        <a-radio-group v-model:value="formState.providerId">
          <a-radio v-for="provider in providerData" :value="provider.id">
            {{ provider.displayName }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="작가" ref="personId" name="personId">
        <a-select
          v-model:value="formState.personId"
          show-search
          placeholder="Select a person"
          :options="selectPeopleData"
          :filter-option="filterPeopleData"
          @foucs="() => console.log('focus')"
          @blur="() => console.log('blur')"
        ></a-select>
      </a-form-item>
      <a-form-item ref="image" label="표지 이미지" name="image">
        <a-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <div>
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">수정하기</a-button>
        <a-button style="margin-left: 10px" @click="resetForm"
          >입력값 초기화</a-button
        >
      </a-form-item>

      <a-divider>회차 관리</a-divider>
      <a-form-item label="회차">
        <a-input-number
          id="episodeNumber"
          v-model:value="episodeNumber"
        ></a-input-number>
        <a-button @click="createEpisode">회차 등록</a-button>
      </a-form-item>
      <a-row>
        <template v-for="episode in seriesData.episodes">
          <a-col :span="2">{{ episode.episodeNumber }}</a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { UploadFile, SelectProps } from "ant-design-vue";
import { hangulIncludes } from "@toss/hangul";

interface FormState {
  title: string;
  description: string | undefined;
  isbn: string | undefined;
  ecn: string | undefined;
  seriesType: string;
  genreId: string;
  publishDayId: string;
  providerId: string;
  personId?: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };

const episodeNumber = ref<number>(0);

const { data: responseData } = await useApi(
  `/backoffice/series/${useRoute().params.id}`,
  {
    method: "get",
  }
);

const seriesData = computed(
  () => (responseData.value as any).data as SeriesResponse
);

const formState: UnwrapRef<FormState> = reactive({
  title: seriesData.value!.title,
  description: seriesData.value!.description,
  isbn: seriesData.value!.isbn,
  ecn: seriesData.value!.ecn,
  seriesType: seriesData.value!.seriesType,
  genreId: "1",
  publishDayId: "1",
  providerId: "1",
  personId: undefined,
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
  publishDayId: [
    {
      required: true,
      message: "Please select publishDayId",
      trigger: "change",
    },
  ],
  providerId: [
    {
      required: true,
      message: "Please select providerId",
      trigger: "change",
    },
  ],
  personId: [
    {
      required: true,
      message: "Please select personId",
      trigger: "change",
    },
  ],
  image: [
    {
      required: false,
      message: "Please select image file",
      trigger: "change",
    },
  ],
};

const genreData = computed(() => useGenres().genres as GenreResponse[]);
const publishDayData = computed(
  () => usePublishDays().publishDays as PublishDayResponse[]
);
const providerData = computed(
  () => useProviders().providers as ProviderResponse[]
);
const peopleData = computed(() => usePeople().people as PersonResponse[]);

const selectPeopleData = computed(() => {
  const response: SelectProps["options"] = usePeople().people.map(
    (person: PersonResponse) => {
      return {
        value: person.id,
        label: person.name,
      };
    }
  );

  return response;
});

const filterPeopleData = (input: string, option: any) => {
  return hangulIncludes(option.label, input);
};

if (genreData.value.length == 0) useGenres().getList();
if (publishDayData.value.length == 0) usePublishDays().getList();
if (providerData.value.length == 0) useProviders().getList();
if (peopleData.value.length == 0) usePeople().getList();

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

const createEpisode = async () => {
  console.log(episodeNumber.value);
  const { data } = await useApi(
    `/backoffice/series/${seriesData.value.id}/episodes`,
    {
      method: "post",
      body: { episodeNumber: episodeNumber.value },
    }
  );

  if (data) {
    console.log(data);
  }
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
