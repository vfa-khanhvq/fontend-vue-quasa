<template>
  <q-layout view="hHh LpR fFf">
    <Sidebar />
    <q-page-container> <router-view /> </q-page-container
  ></q-layout>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const Sidebar = defineAsyncComponent(() => import('../components/Sidebar.vue'));
</script>

<style></style>
