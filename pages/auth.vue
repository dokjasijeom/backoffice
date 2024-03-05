<template>
  <div
    style="
      display: flex;
      width: 100%;
      height: 100vh;
      align-items: center;
      justify-content: center;
    "
  >
    <a-form
      :model="formState"
      name="login_form"
      class="login-form"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item
        label="이메일"
        name="email"
        :rules="[{ required: true, message: '이메일을 입력해주세요.' }]"
      >
        <a-input v-model:value="formState.email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="비밀번호"
        name="password"
        :rules="[{ required: true, message: '비밀번호를 입력해주세요.' }]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>

      <a-form-item>
        <a-button
          :disabled="disabled"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          Log in
        </a-button>
        Or
        <a href="">register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
// import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  email: "",
  password: "",
  remember: true,
});

const onFinish = async (values: any) => {
  await useUsers().login(formState.email, formState.password);
  if (useUsers().userData) {
    const dsAut = useCookie("DS_AUT");
    const dsUser = useCookie("DS_USER");

    dsAut.value = (useUsers().userData as any).token;
    dsUser.value = useUsers().userData;

    return navigateTo("/");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(formState.email && formState.password);
});

onBeforeMount(() => {
  if (useUsers().userData) {
    navigateTo("/series");
  }
});
</script>

<style scoped>
.login-form {
  max-width: 300px;
  height: 300px;
}
.login-form .forgot {
  float: right;
}

.login-form .login-form-button {
  width: 100%;
}
</style>
