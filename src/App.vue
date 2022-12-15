<script setup>
import { defineAsyncComponent } from 'vue';
const layout = defineAsyncComponent(() => import('../src/layout/index.vue'));
</script>

<template>
  <layout />
</template>

<style lang="scss">
@import '@/assets/scss/form.scss';
@import '@/assets/scss/custom.scss';
@import '@/assets/scss/base.scss';
</style>

<style>
@import '@/assets/css/base.css';
#app {
  margin: 0 auto;
  font-weight: normal;
  overflow-x: hidden;
  min-height: 100vh;
}
</style>
