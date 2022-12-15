<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    :mini="leftDrawerMini"
    side="left"
    :width="280"
    class="background-linear-gradient-blue rounded-lg shadow-sidebar"
  >
    <q-toolbar class="q-drawer__header">
      <img v-show="!leftDrawerMini" src="../assets/img/logo.svg" />
      <q-btn class="icon" flat round dense @click="toggleMiniLeftDrawer">
        <q-icon>
          <img
            class="q-drawer__header__icon"
            src="../assets/img/double-arrow-right.svg"
            v-if="leftDrawerMini"
          />
          <img
            class="q-drawer__header__icon"
            src="../assets/img/double-arrow-left.svg"
            v-else
          />
        </q-icon>
      </q-btn>
    </q-toolbar>

    <div class="q-drawer__content">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon>
              <img src="../assets/img/order-list-icon.svg" />
            </q-icon>
          </q-item-section>
          <q-item-section> {{ $t('orderList.title') }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-drawer__footer">
      <div
        :class="{
          ['q-drawer__footer__user-info']: !leftDrawerMini,
        }"
      >
        <q-avatar>
          <img src="../assets/img/avatar.svg" />
        </q-avatar>
        <span class="admin-name color-white" v-show="!leftDrawerMini"
          >Admin</span
        >
      </div>
      <div>
        <q-btn
          outline
          class="q-drawer__footer--btn"
          no-caps
          align="left"
          @click="openChangePassword"
          ><q-icon left size="sm"
            ><img src="../assets/img/change-password.svg" /></q-icon
          ><span v-show="!leftDrawerMini" class="font-medium">{{
            $t('changePassword.title')
          }}</span></q-btn
        >
      </div>
      <div>
        <q-btn
          outline
          class="q-drawer__footer--btn"
          no-caps
          align="left"
          @click="onLogout"
          ><q-icon left size="sm">
            <img src="../assets/img/logout.svg" /> </q-icon
          ><span v-show="!leftDrawerMini">{{ $t('logout') }}</span></q-btn
        >
      </div>
    </div>
  </q-drawer>
</template>
<script setup>
import { ref, computed } from 'vue';
import router from '../router';
import { logout } from '../graphql/logout';
import { LocalStorage } from 'quasar';
import { apolloCl, $q } from '../main';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const leftDrawerOpen = ref(true);
const leftDrawerMini = ref(false);

const getIconMiniDrawer = computed(() => {
  return leftDrawerMini.value
    ? '../assets/img/double-arrow.svg'
    : '../assets/img/double-arrow.svg';
});
const toggleMiniLeftDrawer = () => {
  leftDrawerMini.value = !leftDrawerMini.value;
};
const openChangePassword = () => {
  router.push({ name: 'change-pw' });
};
const onLogout = () => {
  apolloCl.query({ query: logout }).then((res) => {
    $q.notify({
      type: 'positive',
      position: 'top',
      classes: 'q-mt-lg',
      message: t('logoutSuccess'),
    });
    LocalStorage.remove('auth');
    router.push({ path: '/login' });
  });
};
</script>
<style scoped lang="scss">
.q-drawer {
  &__header {
    padding: 20px 15px;
    display: flex;
    justify-content: space-around;
    > img {
      height: 35px;
    }
    &__icon {
      width: 35px;
      height: 35px;
    }
  }
  &__content {
    background: white;
    & .q-item {
      height: 60px;
      &__section {
        font-size: larger;
      }
    }
  }
  &__footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 35px;
    text-align: center;
    &--btn {
      color: #fff;
      border-radius: 7px;
    }
    &__user-info {
      display: flex;
      margin: 0 50px;
      & .admin-name {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        font-weight: 500;
        font-size: 25px;
        padding: 5px 17px;
      }
    }
    & .q-btn {
      margin-top: 10px;
      padding: 10px 0;
      padding-left: 12px;
      min-width: 65%;
    }
  }
}
</style>
