<script setup>
import { LocalStorage } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { query } from '../graphql/auth';
import { useI18n } from 'vue-i18n';
import { apolloCl, $q } from '../main';
import { SUCCESS } from '../boot/constant';
import router from '../router';
import { LOADING_STATE } from '../constant/loading.js';

const remember = ref(false);
const isPwd = ref(true);
const email = ref('');
const password = ref('');
const loading = ref([false, false, false, false, false, false]);

const { t } = useI18n();

onMounted(() => {
  LocalStorage.set('auth', {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
    flag: '',
  });
  handleRememberMe();
});

//Function check when mounted if have remember me, take all info out
function handleRememberMe() {
  let login = localStorage.getItem('login');
  if (login) {
    login = JSON.parse(login);
    remember.value = login.remember;
    email.value = login.email;
    password.value = login.password;
  }
}

//Function save info when checked remember me
function saveRemember() {
  remember.value &&
    localStorage.setItem(
      'login',
      JSON.stringify({
        remember: remember.value,
        email: email.value,
        password: password.value,
      })
    );
}

//Function check email is valid
function isValidEmail() {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email.value) || t('login.invalidEmail');
}

//Function disable button
const disableBtn = computed(
  () =>
    !email.value ||
    !password.value ||
    isValidEmail() === t('login.invalidEmail')
);

//Function hide/show password
const showPassword = computed(() => {
  if (isPwd.value) {
    return 'password';
  } else {
    return 'text';
  }
});

//Function hide/show password icon
const visibilityPassword = computed(() => {
  if (isPwd.value) {
    return 'visibility_off';
  } else {
    return 'visibility';
  }
});

//Function Login
function onSubmit() {
  loading.value[LOADING_STATE] = true;
  saveRemember();
  apolloCl
    .query({
      query,
      variables: {
        password: password.value,
        email: email.value,
        grantType: 'password',
      },
    })
    .then((res) => {
      const { login } = res.data;
      if (login.statusCode === SUCCESS) {
        LocalStorage.set('auth', {
          accessToken: login?.data?.accessToken.accessToken,
          refreshToken: login?.data?.refreshToken.refreshToken,
          tokenType: login?.data?.tokenType,
          flag: login?.data.flag,
        });
        router.push({ path: '/' });
        $q.notify({
          type: 'positive',
          position: 'top',
          classes: 'q-mt-lg',
          message: t('login.message.success'),
        });
      } else {
        loading.value[LOADING_STATE] = false;
        $q.notify({
          type: 'negative',
          position: 'top',
          classes: 'q-mt-lg',
          message: t(`login.error.errorCode['${login.error.errorCode}']`),
        });
      }
      loading.value[LOADING_STATE] = false;
    });
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper__icon">
      <q-avatar class="wrapper__icon__img">
        <img style="width: 60%" src="../assets/img/Vector.svg" />
      </q-avatar>
    </div>
    <div class="wrapper__header">
      <h5>{{ $t('login.title') }}</h5>
    </div>
    <div class="wrapper__content">
      <q-form @submit="onSubmit()">
        <q-input
          class="wrapper__content__inputLogin test__email"
          color="primary"
          v-model="email"
          type="email"
          :label="$t('login.inputID')"
          :rules="[(val) => (!val ? $t('login.notEmpty') : isValidEmail())]"
        >
          <template v-slot:append>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          class="wrapper__content__inputLogin test__password"
          color="primary"
          v-model="password"
          :label="$t('login.inputPw')"
          :type="showPassword"
          :rules="[(val) => (val && val.trim().length) || $t('login.notEmpty')]"
        >
          <template v-slot:append>
            <q-icon
              :name="visibilityPassword"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="wrapper__remember">
          <q-checkbox
            v-model="remember"
            :label="$t('login.remember')"
            class="test-remember"
          />
        </div>
        <q-btn
          :disable="disableBtn"
          class="wrapper__login test__login"
          :loading="loading[3]"
          :color="disableBtn ? 'grey' : 'primary'"
          text-color="white"
          type="submit"
        >
          {{ $t('login.title') }}
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            {{ $t('login.loading') }}
          </template>
        </q-btn>
      </q-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
