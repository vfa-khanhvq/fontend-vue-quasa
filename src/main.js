import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import { createApolloProvider } from '@vue/apollo-option';
import { createPinia } from 'pinia';
import { Quasar, useQuasar, Notify, Dialog, Loading } from 'quasar';
// Import Quasar css
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';
import App from './App.vue';
import { apolloProvider } from './boot/apollo';
import i18n from './i18n';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(Quasar, {
  plugins: { Notify, Dialog, Loading }, // import Quasar plugins and add here
});
// Using store
app.use(createPinia());
app.use(i18n);
const apollo = createApolloProvider({
  defaultClient: apolloProvider,
});
app.use(apollo);

// Config global Quasar properties.
() => {
  app.config.globalProperties.$q = useQuasar();
};

app.mount('#app');
const apolloCl =
  app.config.globalProperties.$apolloProvider.defaultClient.defaultClient;
const $q = app.config.globalProperties.$q;
const $t = i18n.global;
export { app, apolloCl, $q };
