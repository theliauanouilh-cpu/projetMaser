<template>
  <!-- #region Page -->
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <div class="col q-pa-md">
        <div class="col-12 col-md-4">
          <!-- #region Basket -->
          <q-card>
            <!-- #region Basket header -->
            <q-card-section>
              <div class="text-h6">
                {{ t('cart.title') }} ({{ userStore.cartCount }})
              </div>
            </q-card-section>
            <!-- #endregion Basket header -->

            <q-separator />

            <!-- #region Basket list -->
            <q-list>
              <q-item
                v-for="item in userStore.data.cart"
                :key="item.id"
                clickable
              >
                <!-- #region Item image -->
                <q-item-section avatar>
                  <q-img
                    :src="getImageForItem(item.id)"
                    style="width: 70px; height: 70px"
                    fit="contain"
                  />
                </q-item-section>
                <!-- #endregion Item image -->

                <!-- #region Item details -->
                <q-item-section>
                  <q-item-label>{{ item.nom }}</q-item-label>
                  <q-item-label caption>
                    {{ formatPrice(item.price) }} x {{ item.quantity }}
                  </q-item-label>
                </q-item-section>
                <!-- #endregion Item details -->

                <!-- #region Item quantity -->
                <q-item-section side class="row items-center">
                  <q-input
                    v-model="item.quantity"
                    filled
                    type="number"
                    style="width:130px"
                    dense
                    min="1"
                    max="10"
                    :label="t('cart.quantity')"
                  >
                    <template #before>
                      <q-btn
                        dense
                        round
                        icon="remove"
                        size="9px"
                        @click="userStore.decreaseQuantity(item.id)"
                      />
                    </template>

                    <template #after>
                      <q-btn
                        dense
                        round
                        icon="add"
                        size="9px"
                        @click="userStore.increaseQuantity(item.id)"
                      />
                    </template>
                  </q-input>
                </q-item-section>
                <!-- #endregion Item quantity -->

                <!-- #region Item delete -->
                <q-item-section side class="row items-center">
                  <q-btn
                    dense
                    round
                    color="negative"
                    icon="delete"
                    :aria-label="t('cart.deleteItem')"
                    @click="userStore.deleteFromCart(item.id)"
                    class="q-ml-sm"
                  />
                </q-item-section>
                <!-- #endregion Item delete -->
              </q-item>

              <!-- #region Empty basket -->
              <q-item v-if="userStore.data.cart.length === 0">
                <q-item-section>
                  {{ t('cart.empty') }}
                </q-item-section>
              </q-item>
              <!-- #endregion Empty basket -->
            </q-list>
            <!-- #endregion Basket list -->

            <q-separator />

            <!-- #region Basket footer -->
            <q-card-section>
              <div class="text-subtitle1">
                {{ t('cart.total') }} : {{ formatPrice(userStore.cartTotal) }}
              </div>

              <div class="q-mt-sm">
                <q-btn
                  v-if="userStore.cartTotal > 0"
                  color="secondary"
                  :label="t('cart.buy')"
                  @click="goToPayment"
                />
              </div>
            </q-card-section>
            <!-- #endregion Basket footer -->
          </q-card>
          <!-- #endregion Basket -->
        </div>
      </div>
    </div>
  </q-page>
  <!-- #endregion Page -->
</template>

<script setup lang="ts">
//#region Imports
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import productList from '../../data/products.json'
import { useI18n } from 'vue-i18n'
//#endregion

//# region Init
const router = useRouter()
const userStore = useUserStore()
const products = ref(productList)

const { t, n } = useI18n()
//# endregion


//#region Function
/**
 * Go to payment page
 */
async function goToPayment() {
  await router.push('/pay')
}

/**
 * Get the first image of an item
 */
function getImageForItem(id: number) {
  const p = products.value.find((prod) => prod.id === id)
  if (!p || !p.images || p.images.length === 0) return ''
  return p.images[0]
}

/**
 * Format price in euro
 */
function formatPrice(value: number): string {
  try {
    return n(value, {
      style: 'currency',
      currency: 'EUR'
    })
  } catch {
    return `${value.toFixed(2)} €`
  }
}
//#endregion
</script>
