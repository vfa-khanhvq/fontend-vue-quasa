<template>
  <Title class="order-list-title" :title="$t('orderList.title')" />
  <div class="order-list__table">
    <q-markup-table class="rounded-lg">
      <thead class="background-color-blue color-white text-left">
        <th class="table__header-id">{{ $t('orderList.headers.ID') }}</th>
        <th class="table__header-month">
          {{ $t("orderList.headers['month/Year']") }}
        </th>
        <th class="table__header-order-date">
          {{ $t('orderList.headers.orderDate') }}
        </th>
        <th class="table__header-status">
          {{ $t('orderList.headers.status') }}
        </th>
        <th class="table__header-action">
          {{ $t('orderList.headers.action') }}
        </th>
      </thead>
    </q-markup-table>
    <div class="title__order-list w-full">
      {{ $t('orderList.thisMonthOrder') }}
    </div>
    <OrderListExpansion
      v-if="orderListStore.thisMonth?.no"
      :id="orderListStore.thisMonth?.no"
      :monthly="`${orderListStore.thisMonth?.month}/${orderListStore.thisMonth?.year}`"
      :data="orderListStore.thisMonth?.orderDetail"
    />
    <div class="title__order-list w-full" v-show="orderList.length !== 0">
      {{ $t('orderList.lastMonthOrder') }}
    </div>
    <template v-for="(item, index) in orderList" :key="index">
      <OrderListExpansion
        :id="item.no"
        :monthly="`${item.month}/${item.year}`"
        :data="item.orderDetail"
      />
    </template>
  </div>
  <q-pagination
    class="justify-center pb-15"
    direction-links
    :boundary-numbers="false"
    v-model="pagination.currentPage"
    :max="pagination.pageTotal"
    @update:model-value="onChange"
  />
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { $q, apolloCl } from '../main';
import { queryGetList } from '../graphql/order-list';
import { useOrderListStore } from '../stores/module/order-list';
import { SUCCESS, PAGINATION } from '../boot/constant';
import { t } from '../i18n';
const Title = defineAsyncComponent(() => import('../components/Title.vue'));
const OrderListExpansion = defineAsyncComponent(() =>
  import('../components/OrderListExpansion.vue')
);
const orderListStore = useOrderListStore();
const orderList = ref([]);

const pagination = ref({
  currentPage: PAGINATION.PAGE,
  pageSize: PAGINATION.PAGESIZE,
  pageTotal: 1,
});

const onChange = (val) => {
  getOrderList(val);
};

/**
 * Get order list with pagination
 * @params
 * @author BaoPG
 */
const getOrderList = (
  page = pagination.value.currentPage,
  pageSize = pagination.value.pageSize
) => {
  // Logic pagination: If page index is 1, pagesize is 10. Else pagesize is 9
  if (page !== 1) pageSize -= 1;
  apolloCl
    .query({
      query: queryGetList,
      variables: {
        page,
        pageSize,
      },
    })
    .then((res) => {
      const { getOrderList } = res.data;
      if (getOrderList.statusCode === SUCCESS) {
        const { data } = getOrderList;
        if (data.pagination.currentPage === 1) {
          const [firstItem, ...otherItem] = data.items;
          orderListStore.setThisMonth(firstItem);
          orderList.value = otherItem;
          // Set the pagesize for first time get order list
          pagination.value = data.pagination;
        } else orderList.value = data.items;
      } else {
        $q.notify({
          type: 'negative',
          position: 'top',
          classes: 'q-mt-lg',
          message: t('cannotLoadList'),
        });
      }
    });
};
onMounted(() => {
  getOrderList();
});
</script>
<style scoped lang="scss">
.title__order-list {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
  padding-top: 19px;
  padding-bottom: 12px;
}
.order-list {
  &__table {
    padding: 0px 71px 20px 71px;
    & .q-table__card {
      box-shadow: none;
    }
    & .q-table {
      & thead {
        border-bottom-width: 0px;
      }
      & th {
        padding: 9px 10px;
        font-size: 1rem;
      }
    }
  }
}
.table {
  &__header-id {
    width: 20%;
  }
  &__header-month {
    width: 20%;
  }
  &__header-order-date {
    width: 20%;
  }
  &__header-status {
    width: 20%;
  }
  &__header-action {
    width: 20%;
  }
}
</style>
