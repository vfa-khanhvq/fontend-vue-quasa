import { defineStore } from 'pinia';

export const useListByStep = defineStore({
  id: 'list-step',
  state: () => ({
    firstStep: [],
    stepCheckCard: [],
    stepBranchLock: [],
    stepCheckMoneyStorage: [],
    stepCheckNisa: [],
    stepCheckKana: [],
    stepCreateSnrFunds: [],
    stepCreateSnrDeposit: [],
    stepPaymentList: [],
    dataResult: [],
  }),
});
