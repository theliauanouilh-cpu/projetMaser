import { defineStore, acceptHMRUpdate } from 'pinia';
interface PanierItem {
  id : number;
  quantity : number;
}
export const useCounterStore = defineStore('counter', {
  state: () => ({
    clickCount: 0,
    panier: [] as PanierItem[],
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
    addToPanier(item: number) {
      const existingItem = this.panier.find(i => i.id === item);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.panier.push({ id: item, quantity: 1 });
      }
    },
    deleteFromPanier(item: number) {
      const index = this.panier.findIndex(i => i.id === item);
      if (index > -1) {
        this.panier.splice(index, 1);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}