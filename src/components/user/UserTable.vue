<script setup>
import moment from 'moment';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { STEP } from '../../constant/step';
const pagination = ref({ rowsPerPage: 0 });
const { t } = useI18n();
const { data, step } = defineProps(['data', 'step']);

const selectionReject = ref([]);

const columns = [
  {
    name: 'id',
    required: true,
    label: t('accountProcess.table.id'),
    align: 'center',
    field: 'creditReservesId',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'branchCode',
    align: 'center',
    label: t('accountProcess.table.branchCode'),
    field: 'branchCode',
    sortable: true,
  },
  {
    name: 'accountCode',
    align: 'center',
    label: t('accountProcess.table.accountCode'),
    field: 'accountCode',
    sortable: true,
  },
  {
    name: 'brandCode',
    align: 'center',
    label: t('accountProcess.table.brandCode'),
    field: 'brandCode',
    sortable: true,
  },
  {
    name: 'orderDate',
    align: 'center',
    label: t('accountProcess.table.orderDate'),
    field: 'orderDate',
    sortable: true,
  },
  {
    name: 'orderAmount',
    align: 'center',
    label: t('accountProcess.table.orderAmount'),
    field: 'orderAmount',
    sortable: true,
  },
  {
    name: 'accountType',
    align: 'center',
    label: t('accountProcess.table.accountType'),
    field: 'accountType',
    sortable: true,
  },
  {
    name: 'invalidCardCheckResult',
    align: 'center',
    label: t('accountProcess.table.invalidCardResult'),
    field: 'invalidCardCheckResult',
    sortable: true,
  },
  {
    name: 'branchlockResult',
    align: 'center',
    label: t('accountProcess.table.branchLockResult'),
    field: 'branchlockResult',
    sortable: true,
  },
  {
    name: 'ycustomerResult',
    align: 'center',
    label: t('accountProcess.table.yCustomerResult'),
    field: 'ycustomerResult',
    sortable: true,
  },
  {
    name: 'moneyShortageResult',
    align: 'center',
    label: t('accountProcess.table.moneyShortage'),
    field: 'moneyShortageResult',
    sortable: true,
  },
  {
    name: 'nisaResult',
    align: 'center',
    label: t('accountProcess.table.nisaResult'),
    field: 'nisaResult',
    sortable: true,
  },
  {
    name: 'nameMatchingResult',
    align: 'center',
    label: t('accountProcess.table.nameMatching'),
    field: 'nameMatchingResult',
    sortable: true,
  },
  {
    name: 'authSalesResult',
    align: 'center',
    label: t('accountProcess.table.authSale'),
    field: 'authSalesResult',
    sortable: true,
  },
  {
    name: 'snrfileFundsId',
    align: 'center',
    label: t('accountProcess.table.snrFundsId'),
    field: 'snrfileFundsId',
    sortable: true,
  },
  {
    name: 'snrfileDepositsId',
    align: 'center',
    label: t('accountProcess.table.snrDepositId'),
    field: 'snrfileDepositsId',
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: t('accountProcess.table.reject'),
    field: 'action',
  },
];
const rows = ref(data);
const columnsNoAction = [
  {
    name: 'id',
    required: true,
    label: t('accountProcess.table.id'),
    align: 'center',
    field: 'creditReservesId',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'branchCode',
    align: 'center',
    label: t('accountProcess.table.branchCode'),
    field: 'branchCode',
    sortable: true,
  },
  {
    name: 'accountCode',
    align: 'center',
    label: t('accountProcess.table.accountCode'),
    field: 'accountCode',
    sortable: true,
  },
  {
    name: 'brandCode',
    align: 'center',
    label: t('accountProcess.table.brandCode'),
    field: 'brandCode',
    sortable: true,
  },
  {
    name: 'orderDate',
    align: 'center',
    label: t('accountProcess.table.orderDate'),
    field: 'orderDate',
    sortable: true,
  },
  {
    name: 'orderAmount',
    align: 'center',
    label: t('accountProcess.table.orderAmount'),
    field: 'orderAmount',
    sortable: true,
  },
  {
    name: 'accountType',
    align: 'center',
    label: t('accountProcess.table.accountType'),
    field: 'accountType',
    sortable: true,
  },
  {
    name: 'invalidCardCheckResult',
    align: 'center',
    label: t('accountProcess.table.invalidCardResult'),
    field: 'invalidCardCheckResult',
    sortable: true,
  },
  {
    name: 'branchlockResult',
    align: 'center',
    label: t('accountProcess.table.branchLockResult'),
    field: 'branchlockResult',
    sortable: true,
  },
  {
    name: 'ycustomerResult',
    align: 'center',
    label: t('accountProcess.table.yCustomerResult'),
    field: 'ycustomerResult',
    sortable: true,
  },
  {
    name: 'moneyShortageResult',
    align: 'center',
    label: t('accountProcess.table.moneyShortage'),
    field: 'moneyShortageResult',
    sortable: true,
  },
  {
    name: 'nisaResult',
    align: 'center',
    label: t('accountProcess.table.nisaResult'),
    field: 'nisaResult',
    sortable: true,
  },
  {
    name: 'nameMatchingResult',
    align: 'center',
    label: t('accountProcess.table.nameMatching'),
    field: 'nameMatchingResult',
    sortable: true,
  },
  {
    name: 'authSalesResult',
    align: 'center',
    label: t('accountProcess.table.authSale'),
    field: 'authSalesResult',
    sortable: true,
  },
  {
    name: 'snrfileFundsId',
    align: 'center',
    label: t('accountProcess.table.snrFundsId'),
    field: 'snrfileFundsId',
    sortable: true,
  },
  {
    name: 'snrfileDepositsId',
    align: 'center',
    label: t('accountProcess.table.snrDepositId'),
    field: 'snrfileDepositsId',
    sortable: true,
  },
];
</script>
<template>
  <q-table
    dense
    table-class="user__table"
    :table-style="{ maxHeight: '25rem' }"
    :rows="rows"
    :columns="step === STEP.CHECK_INVALID_CARD ? columns : columnsNoAction"
    row-key="id"
    separator="cell"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id">
          {{ props.row.creditReservesId }}
        </q-td>
        <q-td key="branchCode" :props="props">
          {{ props.row.branchCode }}
        </q-td>
        <q-td key="accountCode" :props="props">
          {{ props.row.accountCode }}
        </q-td>
        <q-td key="brandCode" :props="props">
          {{ props.row.brandCode }}
        </q-td>
        <q-td key="orderDate" :props="props">
          {{ moment(props.row.orderDate).format('YYYY/MM/DD') }}
        </q-td>
        <q-td key="orderAmount" :props="props">
          {{ props.row.orderAmount }}
        </q-td>
        <q-td key="accountType" :props="props">
          {{ props.row.accountType }}
        </q-td>
        <q-td key="invalidCardCheckResult" :props="props">
          {{ props.row.invalidCardCheckResult }}
        </q-td>
        <q-td key="branchlockResult" :props="props">
          {{ props.row.branchlockResult }}
        </q-td>
        <q-td key="ycustomerResult" :props="props">
          {{ props.row.ycustomerResult }}
        </q-td>
        <q-td key="moneyShortageResult" :props="props">
          {{ props.row.moneyShortageResult }}
        </q-td>
        <q-td key="nisaResult" :props="props">
          {{ props.row.nisaResult }}
        </q-td>
        <q-td key="nameMatchingResult" :props="props">
          {{ props.row.nameMatchingResult }}
        </q-td>
        <q-td key="authSalesResult" :props="props">
          {{ props.row.authSalesResult }}
        </q-td>
        <q-td key="snrfileFundsId" :props="props">
          {{ props.row.snrfileFundsId }}
        </q-td>
        <q-td key="snrfileDepositsId" :props="props">
          {{ props.row.snrfileDepositsId }}
        </q-td>
        <q-td key="action" :props="props">
          <q-checkbox
            v-model="selectionReject"
            :val="props.row.creditReservesId"
            color="teal"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style lang="scss" scoped>
</style>
