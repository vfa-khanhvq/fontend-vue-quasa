import { createI18n } from 'vue-i18n';
import enUS from './en-us';
import jaJp from './ja-jp';
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'jp', // set locale
  fallbackLocale: 'jp',
  globalInjection: true,
  messages: {
    en: {
      ...enUS,
    },
    jp: {
      ...jaJp,
    },
  },
});

export const { t } = i18n.global;
export default i18n;
