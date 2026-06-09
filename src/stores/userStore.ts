import { defineStore, acceptHMRUpdate } from 'pinia';
import { LocalStorage } from 'quasar';


export interface State {
  clickCount : number;
  panier     : PanierItem[];
  products   : Produit[];
}

interface PanierItem {
  id          : number;
  quantity    : number;
  nom         : string;
  prix        : number;
  categorie   : string;
  description : string;
}

export interface Produit {
  id           : number;
  nom          : string;
  prix         : number;
  slide        : number;
  images       : string[];
  categorie?   : string;
  description? : string;
}


export const useUserStore = defineStore('user', {
  state: () => ({
    data: LocalStorage.getItem('user-data') ?? {
      clickCount : 0,
      panier     : [],
      products   : [],
    } as State,
  }),

  getters: {
    panierCount: (state) =>
      state.data.panier.reduce((total: number, item: PanierItem) => total + item.quantity, 0),
    panierTotal: (state) =>
      state.data.panier.reduce((total: number, item: PanierItem) => total + item.prix * item.quantity, 0),
  },

  actions: {
    incrementClick(addToPanier?: Produit) {
      this.data.clickCount++;

      if (addToPanier) {
        this.addToPanier(addToPanier);
      }
    },

    resetClick() {
        this.data.clickCount = 0;
    },

    addToPanier(produit: Produit) {
      const existingItem = this.data.panier.find((item: PanierItem) => item.id === produit.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.data.panier.push({
          id          : produit.id,
          nom         : produit.nom,
          prix        : produit.prix ?? 0,
          quantity    : 1,
          categorie   : produit.categorie ?? '',
          description : produit.description ?? '',
        });
      }
    },

    deleteFromPanier(id: number) {
      const index = this.data.panier.findIndex((item: PanierItem) => item.id === id);

      if (index > -1) {
        this.data.panier.splice(index, 1);
      }
    },

    decreaseQuantity(id: number) {
      const item = this.data.panier.find((item: PanierItem) => item.id === id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.deleteFromPanier(id);
      }
    },

    increaseQuantity(id: number) {
      const item = this.data.panier.find((item: PanierItem) => item.id === id);

      if (!item) return;

      if (item.quantity > 0) {
        item.quantity++;
      } else {
        this.deleteFromPanier(id);
      }
    },



    clearPanier() {
      this.data.panier = [] as PanierItem[];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}