import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    clickCount: 0,
  }),

  getters: {
    doubleCount: (state) => state.clickCount * 2,
  },

  actions: {
    incrementClick() {
      this.clickCount++;
    },
    resetClick() {
      this.clickCount = 0;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}