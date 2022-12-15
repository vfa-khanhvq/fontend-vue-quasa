<template>
  <q-list class="w-full text-base font-bold text-left">
    <q-expansion-item
      class="w-full"
      header-class="pl-10 rounded-header-table"
      expand-icon="fas fa-caret-right"
      expanded-icon="fas fa-caret-down"
    >
      <template v-slot:header>
        <q-item-section>
          <table>
            <thead>
              <th class="table__header-id">{{ id }}</th>
              <th class="table__header-monthly">
                {{ convertMonthly }}
              </th>
            </thead>
          </table>
        </q-item-section>
      </template>
      <q-card>
        <q-markup-table class="mt-10">
          <tbody class="background-color-light-blue color-gray">
            <tr v-for="(item, index) in data" :key="index">
              <td class="table__data-id pl-10">{{ `${id}.${index + 1}` }}</td>
              <td class="table__data-month">
                {{ convertThreeDigitMonth(item?.month) }}
              </td>
              <td class="table__data-order-date">
                {{ convertTwoDigit(item?.day) }}
              </td>
              <td
                :class="{
                  'table__data-status': true,
                  'text-green': item?.isActive,
                  'text-gray': !item?.isActive,
                }"
              >
                {{ item?.isActive ? 'Active' : 'Inactive' }}
              </td>
              <td class="table__data-action">
                <q-btn
                  no-caps
                  class="background-color-blue btn color-white"
                  :label="getLabel(item?.isActive)"
                  @click="getNavigate(item?.isActive, item?.day)"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
<script setup>
import { computed } from 'vue';
import router from '../router';
import { convertThreeDigitMonth, convertTwoDigit } from '../util/convertMonth';

const { id, monthly, data } = defineProps(['id', 'monthly', 'data']);

const monthAndYear = monthly.split('/');

const getNavigate = (isActive, day) => {
  return isActive
    ? router.push({
        path: '/account-process',
        query: { day, month: monthAndYear[0], year: monthAndYear[1] },
      })
    : router.push({
        path: '/result',
        query: { day, month: monthAndYear[0], year: monthAndYear[1] },
      });
};

const getLabel = (isActive) => {
  return isActive ? 'Checkout' : 'View Result';
};

const convertMonthly = computed(() => {
  let [month, year] = monthly.split('/');
  return convertThreeDigitMonth(month) + '/' + year;
});
</script>
<style scoped lang="scss">
.q-table__card {
  box-shadow: none;
}

.q-table {
  & thead {
    border-bottom-width: 0px;
  }
  & th {
    padding: 0;
    border-bottom-width: 0px;
    font-size: 1rem;
    line-height: 1.5rem;
  }
  & td {
    padding: 0;
    padding-left: 10px;
  }
}

.btn {
  width: 57%;
  font-weight: 400;
}

.table {
  &__data-id {
    width: 20%;
  }
  &__data-month {
    width: 20%;
    padding-left: 20px !important;
  }
  &__data-order-date {
    width: 20%;
    padding-left: 30px !important;
  }
  &__data-status {
    width: 20%;
    padding-left: 30px !important;
  }
  &__data-action {
    width: 20%;
  }

  &__header-id {
    width: 20%;
  }
  &__header-monthly {
    width: 80%;
  }
}
</style>
