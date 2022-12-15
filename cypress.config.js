const { defineConfig } = require('cypress');
require('dotenv').config();
module.exports = defineConfig({
  env: {
    base_Url: process.env.VITE_BASE_URL_CYPRESS,
    base_API: process.env.VITE_API_URL_GRAPHQL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
