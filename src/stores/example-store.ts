import { defineStore, acceptHMRUpdate } from 'pinia';

interface PanierItem {
  id: number;
  quantity: number;
  nom: string;
  prix: number;
  categorie: string;
  description: string;
}

export interface Produit {
  id: number;
  nom: string;
  prix: number;
  slide: number;
  images: string[];
  categorie?: string;
  description?: string;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    clickCount: 0,
    panier: [] as PanierItem[],
    products: [] as Produit[],
  }),

  getters: {
    doubleCount: (state) => state.clickCount * 2,
    panierCount: (state) =>
      state.panier.reduce((total, item) => total + item.quantity, 0),
    panierTotal: (state) =>
      state.panier.reduce((total, item) => total + item.prix * item.quantity, 0),
  },

  actions: {
    incrementClick() {
      this.clickCount++;
    },

    resetClick() {
      this.clickCount = 0;
    },

    addToPanier(produit: Produit) {
      const existingItem = this.panier.find((item) => item.id === produit.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.panier.push({
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix ?? 0,
          quantity: 1,
          categorie: produit.categorie ?? '',
          description: produit.description ?? '',
        });
      }
    },

    deleteFromPanier(id: number) {
      const index = this.panier.findIndex((item) => item.id === id);

      if (index > -1) {
        this.panier.splice(index, 1);
      }
    },

    decreaseQuantity(id: number) {
      const item = this.panier.find((item) => item.id === id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.deleteFromPanier(id);
      }
    },

    clearPanier() {
      this.panier = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}