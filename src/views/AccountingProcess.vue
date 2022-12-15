<script setup>
import { defineAsyncComponent } from 'vue'

const BreadCrumb = defineAsyncComponent(() =>
  import("../components/Breadcrumb.vue")
);
</script>

<template>
<div>
  <div class="title">{{ $t('accountProcess.title') }}</div>
  <BreadCrumb />
</div>
</template>

<style scoped lang="scss">
.title {
  text-align: left;
  margin-left: 2.5rem;
  font-weight: bold;
  font-size: 2.5rem;
}
</style>
