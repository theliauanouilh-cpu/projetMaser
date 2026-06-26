//#region Import
import { defineStore, acceptHMRUpdate } from 'pinia';
import { LocalStorage } from 'quasar';
import { type Customer, type product } from '../interfaces';
//#endregion

export interface State {
  cart: CartItem[];
  products: product[];
  customer: Customer | null;
  language: string;
}

interface CartItem {
  id          : number;
  quantity    : number;
  nom         : string;
  price        : number;
  category   : string;
  description : string;
  size      : string;
}

/**
 * User state management with local storage
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    data: (LocalStorage.getItem('user-data') as State) ?? {
      cart: [],
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
    cartCount: (state) =>
      state.data.cart.reduce((total: number, item: CartItem) => total + item.quantity, 0),

    /**
     * Calculate the total price of the shopping cart.
     */
    cartTotal: (state) =>
      state.data.cart.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0,
      ),
  },
//#endregion

//#region Action
  actions: {

    /**
     * Push a product and the data in the cart
     */
    addToCart(product: product, quantity: number = 1) {
      const existingItem = this.data.cart.find((item: CartItem) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.data.cart.push({
          id: product.id,
          nom: product.nom,
          price: product.price ?? 0,
          quantity: quantity,
          category: product.category ?? '',
          description: product.description ?? '',
          size: product.size ?? '',
        });
      }
      this.quantity = 1;
    },

    /**
     * Delete a product a of the cart
     */
    deleteFromCart(id: number) {
      const index = this.data.cart.findIndex((item: CartItem) => item.id === id);

      if (index > -1) {
        this.data.cart.splice(index, 1);
      }
    },

    /**
     * Decrease quantity of a product in cart
     */
    decreaseQuantity(id: number) {
      const item = this.data.cart.find((item: CartItem) => item.id === id);

      if (!item) return;

      if (item.quantity > 0) {
        item.quantity--;
      }
    },

    /**
     * Increase quantity of a product in cart
     */
    increaseQuantity(id: number) {
      const item = this.data.cart.find((item: CartItem) => item.id === id);

      if (!item) return;

      if (item.quantity >= 0) {
        item.quantity++;
      }
    },

    /**
     * Clear all the cart of this product(s)
     */
    clearCart() {
      this.data.cart = [] as CartItem[];
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
