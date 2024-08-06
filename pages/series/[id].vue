<template>
  <div>
    <a-flex :justify="`space-between`" :align="`center`">
      <FormPageHeader v-bind:title="`웹툰 / 웹소설 등록`" />
      <a-popconfirm
        title="삭제하시겠습니까?"
        ok-text="네, 삭제합니다"
        cancel-text="취소"
        placement="left"
        @confirm="deleteHandler"
        @cancel="cancelDelete"
      >
        <a-button type="primary" danger size="large">
          <template #icon>
            <ClearOutlined />
          </template>
          삭제
        </a-button>
      </a-popconfirm>
    </a-flex>
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
      <a-form-item label="장르" ref="genreIds" name="genreIds">
        <a-checkbox
          v-model:checked="genreState.checkAll"
          :indeterminate="genreState.indeterminate"
          @change="onCheckGenreAllChange"
          >전체 선택</a-checkbox
        >
        <a-checkbox-group
          style="margin-top: 8px"
          v-model:value="genreState.checkedList"
          :options="genreOptions"
        />
      </a-form-item>
      <a-form-item label="연재일" ref="publishDayIds" name="publishDayIds">
        <a-checkbox
          v-model:checked="publishDayState.checkAll"
          :indeterminate="publishDayState.indeterminate"
          @change="onCheckPublishDayAllChange"
          >전체 선택</a-checkbox
        >
        <a-checkbox-group
          style="margin-top: 8px"
          v-model:value="publishDayState.checkedList"
          :options="publishDayOptions"
        />
      </a-form-item>
      <a-form-item label="플랫폼" ref="providerIds" name="providerIds">
        <div>
          <a-checkbox
            v-model:checked="providerState.checkAll"
            :indeterminate="providerState.indeterminate"
            @change="onCheckProviderAllChange"
            >전체 선택</a-checkbox
          >
        </div>
        <a-checkbox-group
          style="margin-top: 8px"
          v-model:value="providerState.checkedList"
          :options="providerOptions"
        />
        <div style="margin-top: 10px" v-if="formState.providers.length > 0">
          <div
            v-for="provider in formState.providers"
            :key="provider.providerId"
          >
            <a-form-item
              :label="
                providerOptions.find((v) => v.value == provider.providerId)
                  ?.label
              "
            >
              <a-input
                v-model:value="provider.link"
                placeholder="링크를 입력하세요"
              />
            </a-form-item>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="출판사">
        <a-select
          v-if="publisherOptions"
          v-model:value="publisherState"
          mode="multiple"
          :options="publisherOptions"
          :filter-option="filterPublisherData"
          option-label-prop="label"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="글 작가">
        <a-select
          v-if="selectPeopleData"
          v-model:value="authorState"
          mode="multiple"
          placeholder="Select a person"
          :options="selectPeopleData"
          :filter-option="filterPeopleData"
        ></a-select>
      </a-form-item>
      <a-form-item label="그림 작가">
        <a-select
          v-if="selectPeopleData"
          v-model:value="illustratorState"
          mode="multiple"
          placeholder="Select a person"
          :options="selectPeopleData"
          :filter-option="filterPeopleData"
        ></a-select>
      </a-form-item>
      <a-form-item label="원작 작가">
        <a-select
          v-if="selectPeopleData"
          v-model:value="originalAuthorState"
          mode="multiple"
          placeholder="Select a person"
          :options="selectPeopleData"
          :filter-option="filterPeopleData"
        ></a-select>
      </a-form-item>
      <a-form-item label="완결 여부" ref="isComplete" name="isComplete">
        <a-radio-group v-model:value="formState.isComplete">
          <a-radio :value="false">연재중</a-radio>
          <a-radio :value="true">완결</a-radio>
        </a-radio-group>
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
        <template v-for="episode in seriesData.episodes" :key="episode.id">
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
import { notification } from "ant-design-vue";

interface FormState {
  title: string;
  description: string;
  isbn: string;
  ecn: string;
  seriesType: string;
  publisherIds?: number[];
  genreIds?: number[];
  providerIds?: number[];
  providers: { providerId: number; link: string }[];
  publishDayIds?: number[];
  authorId?: string;
  illustratorId?: string;
  originalAuthorId?: string;
  authorIds?: number[];
  illustratorIds?: number[];
  originalAuthorIds?: number[];
  isComplete: boolean;
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

const author = (type: string) => {
  console.log(seriesData.value!.authors?.find((v) => v.personType == type));
  return seriesData.value!.authors?.find((v) => v.personType == type);
};

const formState: UnwrapRef<FormState> = reactive({
  title: seriesData.value!.title,
  description: seriesData.value!.description ?? "",
  isbn: seriesData.value!.isbn ?? "",
  ecn: seriesData.value!.ecn ?? "",
  seriesType: seriesData.value!.seriesType,
  authorId: author("author") ? author("author")?.id?.toString() : undefined,
  illustratorId: author("illustrator")
    ? author("illustrator")?.id?.toString()
    : undefined,
  originalAuthorId: author("original_author")
    ? author("original_author")?.id?.toString()
    : undefined,
  publisherIds: [],
  genreIds: [],
  providerIds: [],
  providers: [],
  publishDayIds: [],
  authorIds: [],
  illustratorIds: [],
  originalAuthorIds: [],
  isComplete: seriesData.value!.isComplete,
});

const genreOptions = computed(() =>
  genreData.value.map((genre) => {
    return { label: genre.name, value: genre.id };
  })
);

const genreState = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [] as number[],
});

const onCheckGenreAllChange = (e: any) => {
  Object.assign(genreState, {
    checkedList: e.target.checked ? genreOptions.value.map((v) => v.value) : [],
    indeterminate: false,
  });
};

watch(
  () => genreState.checkedList,
  (val) => {
    formState.genreIds = genreState.checkedList;
    genreState.indeterminate =
      !!val.length && val.length < genreOptions.value.length;
    genreState.checkAll = val.length === genreOptions.value.length;
  }
);

const publishDayOptions = computed(() =>
  publishDayData.value.map((day) => {
    return { label: day.displayDay, value: day.id };
  })
);

const publishDayState = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [] as number[],
});

const onCheckPublishDayAllChange = (e: any) => {
  Object.assign(publishDayState, {
    checkedList: e.target.checked
      ? publishDayOptions.value.map((v) => v.value)
      : [],
    indeterminate: false,
  });
};

watch(
  () => publishDayState.checkedList,
  (val) => {
    formState.publishDayIds = publishDayState.checkedList;
    publishDayState.indeterminate =
      !!val.length && val.length < publishDayOptions.value.length;
    publishDayState.checkAll = val.length === publishDayOptions.value.length;
  }
);

const providerOptions = computed(() =>
  providerData.value.map((provider) => {
    return { label: provider.displayName, value: provider.id };
  })
);

const publisherOptions = computed(() =>
  publisherData.value.map((publisher) => {
    return { label: publisher.name, value: publisher.id };
  })
);

const providerState = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [] as number[],
});

const publisherState = ref([] as number[]);
const authorState = ref([] as number[]);
const illustratorState = ref([] as number[]);
const originalAuthorState = ref([] as number[]);

const onCheckProviderAllChange = (e: any) => {
  Object.assign(providerState, {
    checkedList: e.target.checked
      ? providerOptions.value.map((v) => v.value)
      : [],
    indeterminate: false,
  });
};

watch(
  () => providerState.checkedList,
  (val) => {
    formState.providerIds = providerState.checkedList;
    if (seriesData.value!.providers) {
      formState.providers = seriesData.value!.providers!.map((provider) => {
        return {
          providerId: provider.id,
          link: provider.link ?? "",
        };
      });
    }
    for (const id of providerState.checkedList) {
      const item = formState.providers.find((v) => v.providerId == id);
      if (!item) {
        formState.providers.push({ providerId: id, link: "" });
      }
    }

    if (formState.providers.length != val.length) {
      formState.providers = formState.providers.filter((v) =>
        val.includes(v.providerId)
      );
    }
    providerState.indeterminate =
      !!val.length && val.length < providerOptions.value.length;
    providerState.checkAll = val.length === providerOptions.value.length;
  }
);

watch(
  () => publisherState.value,
  (val) => {
    formState.publisherIds = publisherState.value;
  }
);

watch(
  () => authorState.value,
  (val) => {
    formState.authorIds = authorState.value;
  }
);

watch(
  () => illustratorState.value,
  (val) => {
    formState.illustratorIds = illustratorState.value;
  }
);

watch(
  () => originalAuthorState.value,
  (val) => {
    formState.originalAuthorIds = originalAuthorState.value;
  }
);

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
const publisherData = computed(
  () => usePublishers().publishers as PublisherResponse[]
);

const selectPeopleData = computed(() =>
  peopleData.value.map((person) => {
    return { label: person.name, value: person.id };
  })
);

const filterPeopleData = (input: string, option: any) => {
  return hangulIncludes(option.label, input);
};

const filterPublisherData = (input: string, option: any) => {
  return hangulIncludes(option.label, input);
};

if (genreData.value.length == 0) useGenres().getList();
if (publishDayData.value.length == 0) usePublishDays().getList();
if (providerData.value.length == 0) useProviders().getList();
if (peopleData.value.length == 0) usePeople().getList();
if (publisherData.value.length == 0) usePublishers().getList();
if (seriesData.value != null) {
  genreState.checkedList = seriesData.value.genres
    ? seriesData.value.genres!.map((v) => v.id)
    : [];
  providerState.checkedList = seriesData.value.providers
    ? seriesData.value.providers!.map((v) => v.id)
    : [];
  publishDayState.checkedList = seriesData.value.publishDays
    ? seriesData.value.publishDays!.map((v) => v.id)
    : [];
  publisherState.value = seriesData.value.publishers
    ? seriesData.value.publishers!.map((v) => v.id)
    : [];
  authorState.value = seriesData.value.authors
    ? seriesData.value
        .authors!.filter((v) => v.personType == "author")
        .map((v) => v.id)
    : [];
  illustratorState.value = seriesData.value.authors
    ? seriesData.value
        .authors!.filter((v) => v.personType == "illustrator")
        .map((v) => v.id)
    : [];
  originalAuthorState.value = seriesData.value.authors
    ? seriesData.value
        .authors!.filter((v) => v.personType == "original_author")
        .map((v) => v.id)
    : [];

  console.log(formState);
}

const beforeUpload = (file: any) => {
  fileList.value = fileList.value.concat(file);
  return false;
};

const formData = computed(() => {
  const item = new FormData();
  Object.entries(unref(formState)).forEach(([key, value]) => {
    if (key === "providers") {
      item.append(key, JSON.stringify(value));
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        item.append(key, value[i].toString());
      }
    } else {
      item.append(key, value as string);
    }
  });
  fileList.value.forEach((file: UploadFile) =>
    item.append("image", file.originFileObj!)
  );
  return item;
});

const deleteHandler = async () => {
  await useApi(`/backoffice/series/${useRoute().params.id}`, {
    method: "delete",
  }).then(() => {
    notification["success"]({
      message: "웹툰 / 웹소설 관리",
      description: `'${seriesData.value.title}' 작품 삭제가 완료되었습니다.`,
      duration: 3,
    });

    navigateTo("/series");
  });
};

const cancelDelete = () => console.log("삭제 취소");

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const { data } = await useApi(
        `/backoffice/series/${useRoute().params.id}`,
        {
          method: "patch",
          body: formData.value,
        }
      );
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
