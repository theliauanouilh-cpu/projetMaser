<template>
  <!-- #region Page -->
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <div class="col q-pa-lg">
        <!-- #region Product list -->
        <div class="row q-col-gutter-lg">
          <div
            v-for="produit in produitsPagines"
            :key="produit.id"
            class="col-12 col-md-6"
          >
            <q-card class="product-card">
              <!-- #region Product images -->
              <q-carousel
                v-model="produit.slide"
                animated
                arrows
                navigation
                infinite
                height="250px"
                class="bg-white-2"
                control-color="grey"
              >
                <template v-for="(image, index) in produit.images" :key="index">
                  <q-carousel-slide :name="index" style="overflow: hidden;">
                    <q-img
                      :src="image"
                      fit="contain"
                      height="250px"
                    />
                  </q-carousel-slide>
                </template>
              </q-carousel>
              <!-- #endregion Product images -->

              <!-- #region Product details -->
              <q-card-section>
                <q-separator color="grey-6" />

                <div class="row text-h6">
                  <div class="col">{{ produit.nom }}</div>
                  <div class="col text-right">
                    {{ formatPrice(produit.prix) }}
                  </div>
                </div>

                <div v-if="produit.categorie" class="text-caption text-grey-7">
                  {{ t('menu.product.category') }} : {{ produit.categorie }}
                </div>

                <div v-if="produit.taille" class="text-caption text-grey-7">
                  {{ t('menu.product.dimension') }} : {{ produit.taille }}
                </div>

                <div class="text-caption text-grey-7">
                  {{ t(`menu.products[${produit.id}].description`) }}
                </div>
              </q-card-section>
              <!-- #endregion Product details -->

              <!-- #region Product actions -->
              <q-card-actions align="right">
                <q-input
                  v-model.number="userStore.quantity"
                  filled
                  type="number"
                  style="width: 70px"
                  dense
                  min="1"
                  max="10"
                  :label="t('menu.product.quantity')"
                />

                <q-btn
                  color="primary"
                  :label="t('menu.product.addToCart')"
                  @click="handleAddToCart(produit)"
                />
              </q-card-actions>
              <!-- #endregion Product actions -->
            </q-card>
          </div>
        </div>
        <!-- #endregion Product list -->

        <!-- #region Pagination -->
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            :max="nombrePages"
            color="primary"
            direction-links
            boundary-links
            :max-pages="6"
          />
        </div>
        <!-- #endregion Pagination -->
      </div>
    </div>
  </q-page>
  <!-- #endregion Page -->

  <!-- #region Footer -->
  <footer class="bg-grey-3 q-px-md q-py-xl q-mt-md rounded-borders">
    <div class="row q-col-gutter-lg items-start">
      <div class="col-12 col-md-6">
        <div class="text-h6 text-primary text-weight-bold">SofaLand</div>
        <div class="text-body2 text-grey-7 q-mt-sm">
          {{ t('footer.brandText') }}
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="column q-gutter-sm">
          <div class="text-body2">
            {{ t('footer.phone') }} : 01 23 45 67 89
          </div>
          <div class="text-body2">
            {{ t('footer.email') }} : [support@sofaland.fr](mailto:support@sofaland.fr)
          </div>
          <div class="text-body2">
            {{ t('footer.hours') }} : {{ t('footer.hoursValue') }}
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- #endregion Footer -->
</template>

<script setup lang="ts">
//#region Import
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useQuasar } from 'quasar'
import { InitProduit } from '../dal/db'
import { type Produit } from '../interfaces'
import * as bll from '../bll/bll'
import { useI18n } from 'vue-i18n'
//#endregion

//#region Init
const produits = ref<Produit[]>([])
const current = ref(1)

const router = useRouter()

const userStore = useUserStore()

const $q = useQuasar()

const produitsParPage = 4

const { t, n } = useI18n()


/**
 * Filter products by selected categories
 */
const produitsFiltres = computed(() => {
  if (userStore.selectedCategories.length === 0) {
    return produits.value
  }

  return produits.value.filter((produit) =>
    userStore.selectedCategories.includes(produit.categorie ?? '')
  )
})

/**
 * Calculate total number of pages
 */
const nombrePages = computed(() => {
  return Math.ceil(produitsFiltres.value.length / produitsParPage) || 1
})

/**
 * Get products for the current page
 */
const produitsPagines = computed(() => {
  const debut = (current.value - 1) * produitsParPage
  const fin = debut + produitsParPage
  return produitsFiltres.value.slice(debut, fin)
})
//#endregion


//#region Function
/**
 * Format the price in euro
 */
function formatPrice(prix: number): string {
  try {
    return n(prix, {
      style: 'currency',
      currency: 'EUR'
    })
  } catch {
    return `${prix.toFixed(2)} €`
  }
}

/**
 * Show a notification when an article is added to the cart
 */
function showNotif() {
  $q.notify({
    message: t('notifications.cartCount', { count: userStore.panierCount }),
    position: 'top',
    color: 'primary',
    actions: [
      {
        label: t('notifications.goToCart'),
        color: 'white',
        handler: () => {
          void router.push('/panier')
        }
      },
      {
        label: t('notifications.continueShopping'),
        color: 'white'
      }
    ]
  })
}

/**
 * Add a product to the cart
 */
function handleAddToCart(produit: Produit) {
  userStore.addToPanier(produit, userStore.quantity)
  showNotif()
}

/**
 * Load all products
 */
async function chargerProduits() {
  await InitProduit()
  produits.value = await bll.getProduits()
}
//#endregion

onMounted(() => {
  void chargerProduits()
})
</script>
