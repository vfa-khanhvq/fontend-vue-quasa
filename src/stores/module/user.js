import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: 'John',
    age: '20',
    pageId: null,
  }),

  getters: {
    getUserName: (state) => {
      return () => state.user.name;
    },
  },

  actions: {
    async fetchProfile() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ name: 'John' });
        }, 2000);
      });
    },
    setPageIdForUser(payload) {
      this.pageId = payload;
    },
  },
});
