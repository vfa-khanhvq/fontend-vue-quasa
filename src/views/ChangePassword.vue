<script setup>
import { LocalStorage } from 'quasar';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { apolloCl, $q } from '../main';
import { changePassword } from '../graphql/changePassword';
import { SUCCESS } from '../boot/constant';
import { PASSWORD_PATTERN } from '../constant/pattern';
import router from '../router';

const isPwd = ref(true);
const isNewPwd = ref(true);
const isReNewPwd = ref(true);
const oldPw = ref('');
const newPw = ref('');
const reNewPw = ref('');
const loading = ref([false, false, false, false, false, false]);

const { t } = useI18n();

//Function change icon password input
const visibilityPassword = computed(() => {
  if (isPwd.value === true) {
    return 'visibility_off';
  } else {
    return 'visibility';
  }
});

//Function change icon new password input
const visibilityNewPassword = computed(() => {
  if (isNewPwd.value === true) {
    return 'visibility_off';
  } else {
    return 'visibility';
  }
});

//Function change icon re enter new password input
const visibilityReNewPassword = computed(() => {
  if (isReNewPwd.value === true) {
    return 'visibility_off';
  } else {
    return 'visibility';
  }
});

//Function hide/show password
const showPassword = computed(() => {
  if (isPwd.value === true) {
    return 'password';
  } else {
    return 'text';
  }
});

//Function hide/show new password
const showNewPassword = computed(() => {
  if (isNewPwd.value === true) {
    return 'password';
  } else {
    return 'text';
  }
});

//Function hide/show re enter new password
const showReNewPassword = computed(() => {
  if (isReNewPwd.value === true) {
    return 'password';
  } else {
    return 'text';
  }
});

//Function check valid password and new password not same at old password
const isValidPassword = computed(() => {
  if (!PASSWORD_PATTERN.test(newPw.value)) {
    return t('changePassword.notEnoughCondition');
  }
  if (newPw.value === oldPw.value) {
    return t('changePassword.doNotMatch');
  }
});

const disableBtn = computed(() => {
  return !oldPw.value || !newPw.value || !reNewPw.value || isValidPassword;
});

//Function change password
const onChangePassword = () => {
  apolloCl
    .mutate({
      mutation: changePassword,
      variables: {
        password: oldPw.value,
        newPassword: reNewPw.value,
      },
    })
    .then((res) => {
      const { changePassword } = res.data;
      if (changePassword.statusCode === SUCCESS) {
        $q.notify({
          type: 'positive',
          position: 'top',
          classes: 'q-mt-lg',
          message: t('changePassword.success'),
        });
        LocalStorage.remove('auth');
        router.push({ path: '/login' });
      } else {
        $q.notify({
          type: 'negative',
          position: 'top',
          classes: 'q-mt-lg',
          message: t(
            `changePassword.error.errorCode['${changePassword.error.errorCode}']`
          ),
        });
      }
    });
};
</script>

<template>
  <div class="wrapper">
    <div class="wrapper__icon">
      <q-avatar class="wrapper__icon__img">
        <img style="width: 60%" src="../assets/img/Vector.svg" />
      </q-avatar>
    </div>
    <div class="wrapper__header">
      <h5>{{ $t('changePassword.title') }}</h5>
    </div>
    <div class="wrapper__content">
      <q-form @submit="onChangePassword()">
        <q-input
          class="wrapper__content__inputLogin test-password"
          color="primary"
          v-model="oldPw"
          :label="$t('changePassword.oldPw')"
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
        <q-input
          class="wrapper__content__inputLogin test-password"
          color="primary"
          v-model="newPw"
          :label="$t('changePassword.newPw')"
          :type="showNewPassword"
          :rules="[(val) => (!val ? $t('login.notEmpty') : isValidPassword)]"
        >
          <template v-slot:append>
            <q-icon
              :name="visibilityNewPassword"
              class="cursor-pointer"
              @click="isNewPwd = !isNewPwd"
            />
          </template>
        </q-input>
        <q-input
          class="wrapper__content__inputLogin test-password"
          color="primary"
          v-model="reNewPw"
          :label="$t('changePassword.reNewPw')"
          :type="showReNewPassword"
          :rules="[
            (val) => (val && val === newPw) || $t('changePassword.notMatch'),
          ]"
          reactive-rules
        >
          <template v-slot:append>
            <q-icon
              :name="visibilityReNewPassword"
              class="cursor-pointer"
              @click="isReNewPwd = !isReNewPwd"
            />
          </template>
        </q-input>
        <q-btn
          class="wrapper__login test-login"
          :disable="disableBtn"
          :loading="loading[3]"
          color="primary"
          text-color="dark"
          type="submit"
        >
          {{ $t('changePassword.changeBtn') }}
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
