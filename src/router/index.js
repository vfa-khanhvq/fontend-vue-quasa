import { createRouter, createWebHistory } from 'vue-router';
import { LocalStorage } from 'quasar';
import { $q } from '../main';
import i18n from '../i18n';

const { t } = i18n.global;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: 'Log In',
        noHeader: true,
        unAuthenticate: true,
      },
      component: () => import('../views/Login.vue'),
    },

    {
      path: '/change-pw',
      name: 'change-pw',
      meta: {
        title: 'Change Password',
        noHeader: true,
        unAuthenticate: false,
      },
      component: () => import('../views/ChangePassword.vue'),
    },
    {
      path: '/',
      name: 'MainView',
      component: () => import('../layout/MainView.vue'),
      children: [
        {
          path: '/',
          name: 'OrderList',
          meta: {
            title: 'Order List',
            noHeader: true,
            unAuthenticate: false,
          },
          component: () => import('../views/OrderList.vue'),
        },
        {
          path: '/account-process',
          name: 'account-process',
          meta: {
            title: 'Account Process',
            noHeader: true,
            unAuthenticate: false,
          },
          component: () => import('../views/AccountingProcess.vue'),
        },
        {
          path: '/result',
          name: 'result',
          meta: {
            title: 'Result',
            noHeader: true,
            unAuthenticate: true,
          },
          component: () => import('../views/ResultScreen.vue'),
        },
      ],
    },
    {
      path: '/404',
      name: 'not-found',
      meta: {
        title: 'Not Found',
        noHeader: true,
      },
      component: () => import('../views/404.vue'),
    },
    { path: '/:catchAll(.*)', redirect: '/404' },
  ],
});
router.beforeEach((to, from) => {
  let isAuthenticated = false;
  const auth = LocalStorage.getItem('auth');
  if (auth?.accessToken) {
    isAuthenticated = true;
  }
  if (!isAuthenticated && to.name !== 'Login' && !to.meta.unAuthenticate) {
    return { name: 'Login' };
  }
});
export default router;
