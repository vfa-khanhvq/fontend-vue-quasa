<script setup>
import router from "../router";
  //Function button to back home
  function backToHome() {
    router.push({path: '/'})
  }
</script>

<template>
<div class="wrapper">
  <h3 class="m-a-4">{{ $t('notFound') }}</h3>
  <q-btn class="m-a-4 wrapper__btn-back" :label="$t('backHome')" @click="backToHome" color="primary" />
</div>
</template>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  &__btn-back {
    width: 10rem;
    height: 4rem;
  }
}
</style>
