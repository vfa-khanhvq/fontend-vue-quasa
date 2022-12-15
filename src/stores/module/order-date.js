import { defineStore } from 'pinia';

export const useDateStore = defineStore({
  id: 'order-date',
  state: () => ({
    date: null
  }),
});
