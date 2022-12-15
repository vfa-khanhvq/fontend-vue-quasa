<script setup>
import * as moment from 'moment';
import { ref } from 'vue';
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { apolloCl, $q } from '../main';
import { checkNisa } from '../graphql/check-nisa';
import { SUCCESS } from '../boot/constant.js';
import { useListByStep } from '../stores/module/list-step';
import { useI18n } from 'vue-i18n';
import { STEP } from '../constant/step';
const TableUser = defineAsyncComponent(() => import('./user/UserTable.vue'));

const route = useRoute();
const store = useListByStep();
const { t } = useI18n();
const orderDate =
  route.query.year + '/' + route.query.month + '/' + route.query.day;
const step = ref(STEP.CHECK_INVALID_CARD);

const checkNisaWaku = () => {
  apolloCl
    .mutate({
      mutation: checkNisa,
      variables: {
        orderDate,
      },
    })
    .then((res) => {
      const responseCheck = res.data.checkNisaWaku;
      if (responseCheck.statusCode === SUCCESS) {
        store.stepCheckNisa = responseCheck.data;
        step.value = STEP.CHECK_KANA_NAME;
      } else {
        $q.notify({
          type: 'negative',
          position: 'top',
          classes: 'q-mt-lg',
          message: t(
            `accountProcess.error.errorCode['${responseCheck.error.errorCode}']`
          ),
        });
      }
    });
};
</script>
<template>
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      done-color="positive"
      done-icon="none"
      active-color="primary"
      animated
      flat
      header-nav
      contracted
      class="breadcrumb"
    >
      <q-step
        class="border__step"
        :name="STEP.CHECK_INVALID_CARD"
        prefix="1"
        :done="step > STEP.CHECK_INVALID_CARD"
      >
        Check Invalid Card
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        <TableUser :data="store.firstStep" :step="step" />
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                (step = STEP.CHECK_BRANCH_Y_CUSTOMER), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        class="border__step"
        :name="STEP.CHECK_BRANCH_Y_CUSTOMER"
        prefix="2"
        :done="step > STEP.CHECK_BRANCH_Y_CUSTOMER"
      >
        Check Branch Lock , Y Customer
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        <TableUser :data="store.stepCheckCard" />

        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.CHECK_INVALID_CARD"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />
          <q-btn
            @click="
              () => {
                (step = STEP.CHECK_MONEY_SHORTAGE), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        class="border__step"
        :name="STEP.CHECK_MONEY_SHORTAGE"
        prefix="3"
        :done="step > STEP.CHECK_MONEY_SHORTAGE"
      >
        Check money shortage
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        <TableUser :data="store.stepBranchLock" />
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.CHECK_BRANCH_Y_CUSTOMER"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />
          <q-btn
            @click="
              () => {
                (step = STEP.CHECK_NISA_WAKU), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        class="border__step"
        :name="STEP.CHECK_NISA_WAKU"
        prefix="4"
        :done="step > STEP.CHECK_NISA_WAKU"
      >
        <div class="title__breadcrumb">
          {{ $t('accountProcess.checkNisa') }}
        </div>
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        <TableUser :data="store.stepCheckMoneyStorage" />
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.CHECK_MONEY_SHORTAGE"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />
          <q-btn
            class="btn__test"
            @click="
              () => {
                checkNisaWaku();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="STEP.CHECK_KANA_NAME"
        title="Check Kana Name"
        prefix="5"
        :done="step > STEP.CHECK_KANA_NAME"
        class="border__step"
      >
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        <TableUser :data="store.stepCheckNisa" />
        <q-stepper-navigation style="width: 100%">
          <q-btn
            flat
            @click="step = STEP.CHECK_NISA_WAKU"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />
          <q-btn
            @click="
              () => {
                (step = STEP.CREATE_AUTH_SALE), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="STEP.CREATE_AUTH_SALE"
        title="Import auth sale result"
        prefix="6"
        :done="step > STEP.CREATE_AUTH_SALE"
        class="border__step"
      >
        Import auth sale result
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.CHECK_KANA_NAME"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />
          <q-btn
            @click="
              () => {
                (step = STEP.IMPORT_AUTH_SALE), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="STEP.IMPORT_AUTH_SALE"
        title="SNR funds list create"
        prefix="7"
        :done="step > STEP.IMPORT_AUTH_SALE"
        class="border__step"
      >
        Import auth sale result
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.CREATE_AUTH_SALE"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />

          <q-btn
            @click="
              () => {
                (step = STEP.SNR_FUNDS), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="STEP.SNR_FUNDS"
        title="SNR funds list create"
        prefix="8"
        :done="step > STEP.SNR_FUNDS"
        class="border__step"
      >
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        SNR funds list create
        <TableUser :data="store.stepCheckKana" />
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.IMPORT_AUTH_SALE"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />

          <q-btn
            @click="
              () => {
                (step = STEP.SNR_DEPOSIT), $refs.stepper.next();
              }
            "
            color="primary"
            :label="$t('accountProcess.next')"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="STEP.SNR_DEPOSIT"
        title="SNR deposit list create"
        prefix="9"
        :done="step > STEP.SNR_DEPOSIT"
        class="border__step"
      >
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        deposit
        <TableUser :data="store.stepCreateSnrFunds" />
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = STEP.SNR_FUNDS"
            color="primary"
            :label="$t('accountProcess.previous')"
            class="q-ml-sm"
          />

          <q-btn
            @click="
              () => {
                (step = SNR_PAYMENT), $refs.stepper.next();
              }
            "
            color="primary"
            :label="
              step === SNR_PAYMENT
                ? $t('accountProcess.finish')
                : $t('accountProcess.next')
            "
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="10"
        title="SNR deposit list create"
        prefix="10"
        class="border__step"
      >
        <div class="btn__retry">
          <q-btn
            class="q-ml-sm"
            color="primary"
            :label="$t('accountProcess.table.retry')"
          />
        </div>
        payment list
        <TableUser :data="store.stepCreateSnrDeposit" />
        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                (step = 10), $refs.stepper.next();
              }
            "
            color="primary"
            :label="
              step === 10
                ? $t('accountProcess.finish')
                : $t('accountProcess.next')
            "
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  text-align: center;
}
.border__step {
  margin-top: 20px;
  border-top: 1px solid grey;
}
</style>
