//#region Import
import { defineStore, acceptHMRUpdate } from 'pinia';
import { LocalStorage } from 'quasar';
import { type Customer, type Produit } from '../interfaces';
//#endregion

export interface State {
  panier: PanierItem[];
  products: Produit[];
  customer: Customer | null;
  language: string;
}

interface PanierItem {
  id          : number;
  quantity    : number;
  nom         : string;
  prix        : number;
  categorie   : string;
  description : string;
  taille      : string;
}

/**
 * User state management with local storage
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    data: (LocalStorage.getItem('user-data') as State) ?? {
      panier: [],
      products: [],
      connected: null,
      language: 'fr-FR',
    },
    quantity: 1,
    selectedCategories: [] as string[],
  }),

//#region Getters
  getters: {

    /**
     *  Count the number of items in the cart.
     */
    panierCount: (state) =>
      state.data.panier.reduce((total: number, item: PanierItem) => total + item.quantity, 0),

    /**
     * Calculate the total price of the shopping cart.
     */
    panierTotal: (state) =>
      state.data.panier.reduce(
        (total: number, item: PanierItem) => total + item.prix * item.quantity,
        0,
      ),
  },
//#endregion

//#region Action
  actions: {

    /**
     * Push a product and the data in the cart
     */
    addToPanier(produit: Produit, quantity: number = 1) {
      const existingItem = this.data.panier.find((item: PanierItem) => item.id === produit.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.data.panier.push({
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix ?? 0,
          quantity: quantity,
          categorie: produit.categorie ?? '',
          description: produit.description ?? '',
          taille: produit.taille ?? '',
        });
      }
      this.quantity = 1;
    },

    /**
     * Delete a product a of the cart
     */
    deleteFromPanier(id: number) {
      const index = this.data.panier.findIndex((item: PanierItem) => item.id === id);

      if (index > -1) {
        this.data.panier.splice(index, 1);
      }
    },

    /**
     * Decrease quantity of a product in cart
     */
    decreaseQuantity(id: number) {
      const item = this.data.panier.find((item: PanierItem) => item.id === id);

      if (!item) return;

      if (item.quantity > 0) {
        item.quantity--;
      }
    },

    /**
     * Increase quantity of a product in cart
     */
    increaseQuantity(id: number) {
      const item = this.data.panier.find((item: PanierItem) => item.id === id);

      if (!item) return;

      if (item.quantity >= 0) {
        item.quantity++;
      }
    },

    /**
     * Clear all the cart of this product(s)
     */
    clearPanier() {
      this.data.panier = [] as PanierItem[];
    },

    /**
     * Disconnect the user out of their session
     */
    disconnect() {
      this.data.customer = null;
      LocalStorage.setItem('user-data', this.data);
    },

    /**
     * Updates the user's language in the store
     */
    setLanguage(lang: string) {
      this.data.language = lang;
    },
  },
});
//#endregion

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
