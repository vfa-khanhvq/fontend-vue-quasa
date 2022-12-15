import { defineStore } from 'pinia';

export const useOrderListStore = defineStore({
  id: 'order-list',
  state: () => ({
    thisMonth: {},
  }),

  getters: {
    getThisMonth: (state) => state.thisMonth,
  },

  actions: {
    setThisMonth(payload) {
      this.thisMonth = payload;
    },
  },
});
