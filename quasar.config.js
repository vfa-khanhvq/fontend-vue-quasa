// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    boot: ['i18n', 'axios', 'apollo', 'vuelidate'],
    css: ['app.styl'],
    extras: [
      'ionicons-v4',
      'fontawesome-v5',
      'material-icons',
      // ctx.theme.mat ? 'roboto-font' : null,
      // 'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: ctx.dev
        ? {
            // so on dev we'll have
            API: JSON.stringify('http://localhost:3000/graphql'),
          }
        : {
            // and on build (production):
            API: JSON.stringify('http://54.254.201.189:3000/graphql'),
          },
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        });
        cfg.module.rules.push({
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader',
          exclude: /(node_modules)/,
        });
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QDialog',
        'QIcon',
        'QList',
        'QItem',
        'QInput',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QTabs',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QBadge',
        'QScrollArea',
        'QMenu',
        'QSeparator',
        'QAvatar',
        'QItemSection',
        'QItemLabel',
        'QPopupProxy',
        'QSelect',
        'QUploader',
        'QImg',
        'QDate',
        'QParallax',
        'QCheckbox',
        'QFab',
        'QFabAction',
        'QTime',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTimeline',
        'QTimelineEntry',
      ],
      iconSet: 'fontawesome-v5',
      directives: ['Ripple', 'ClosePopup'],
      // Quasar plugins
      plugins: ['Notify', 'Loading', 'LocalStorage'],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false,
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  };
};
