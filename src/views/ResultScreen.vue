<script setup>
import { defineAsyncComponent, onBeforeMount, onMounted, ref } from 'vue';
import { apolloCl, $q } from '../main';
import { queryResultList } from '../graphql/result';
import { SUCCESS } from '../boot/constant';
import { useRoute } from 'vue-router';
import { useListByStep } from '../stores/module/list-step';
import { useI18n } from 'vue-i18n';

const TableUser = defineAsyncComponent(() =>
  import('../components/user/UserTable.vue')
);
onBeforeMount(() => {
  getResultData();
});

const { t } = useI18n();
const show = ref(false);
const route = useRoute();
const orderDate =
  route.query.year + '/' + route.query.month + '/' + route.query.day;

function getResultData() {
  apolloCl
    .query({
      query: queryResultList,
      variables: {
        input: {
          orderDate,
          resultOption: true,
        },
      },
    })
    .then((res) => {
      const dataResponse = res.data.getOrdersByDate;
      if (dataResponse.statusCode === SUCCESS) {
        useListByStep().dataResult = dataResponse.data.items;
      } else {
        $q.notify({
          type: 'negative',
          position: 'top',
          classes: 'q-mt-lg',
          message: t(
            `result.error.errorCode['${dataResponse.error.errorCode}']`
          ),
        });
      }
      show.value = true;
    });
}
</script>

<template>
  <div>
    <div class="title">{{ $t('result.title') }}</div>
    <div v-if="useListByStep().dataResult.length" class="q-pa-md bt-s">
      <TableUser :data="useListByStep().dataResult" />
    </div>
    <div v-if="!show" class="row justify-center q-my-md">
      <q-spinner-dots color="primary" size="40px" />
    </div>
    <div
      v-if="show && !useListByStep().dataResult.length"
      class="row justify-center q-my-md"
    >
      <h3 class="no__data">{{ $t('result.noData') }}</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  text-align: left;
  margin-left: 2.5rem;
  font-weight: bold;
  font-size: 2.5rem;
}
.no__data {
  color: rgba(121, 161, 204, 1);
}
</style>
