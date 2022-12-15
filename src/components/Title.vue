<template>
  <div class="title color-blue">{{ title }}</div>
</template>
<script setup>
const { title } = defineProps(['title']);
</script>
<style scoped lang="scss">
.title {
  font-weight: 700;
  font-size: 35px;
  padding-left: 22px;
  padding-top: 14px;
  padding-bottom: 17px;
}
</style>
