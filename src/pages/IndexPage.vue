 <template>
  <!-- #region Page -->
  <q-page class="page-menu" style="min-height: 100vh">
        {{ userStore.selectedCategories }}
    <div class="row no-wrap" style="min-height: 100vh">
      <div class="col q-pa-lg">
        <!-- #region Product list -->
        <div class="row q-col-gutter-lg">
          <div
            v-for="product in products"
            :key="product.id"
            class="col-12 col-md-6"
          >


            <q-card class="product-card">
              <!-- #region Product images -->
              <q-carousel
                v-model="product.slide"
                animated
                arrows
                navigation
                infinite
                height="250px"
                class="bg-white-2"
                control-color="grey"
              >
                <template v-for="(image, index) in product.images" :key="index">
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
                  <div class="col">{{ product.nom }}</div>
                  <div class="col text-right">
                    {{ formatPrice(product.price) }}
                  </div>
                </div>


                <div v-if="product.category" class="text-caption text-grey-7">
                  {{ t('menu.product.category') }} : {{ product.category }}
                </div>


                <div v-if="product.size" class="text-caption text-grey-7">
                  {{ t('menu.product.dimension') }} : {{ product.size }}
                </div>


                <div class="text-caption text-grey-7">
                  {{ t(`menu.products[${product.id}].description`) }}
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
                  @click="handleAddToCart(product)"
                />
              </q-card-actions>
              <!-- #endregion Product actions -->
            </q-card>
          </div>
        </div>
        <!-- #endregion Product list -->


        <!-- #region Pagination -->
        <div class="q-pa-lg flex flex-center">
          <!-- max = number of last page :: totalProducts / productsPerPage -->
          <q-pagination
            v-model="currentPage"
            :max="Math.ceil(totalProducts/productsByPage)"
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
            {{ t('footer.email') }} : support@sofaland.fr
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useQuasar } from 'quasar'
import { Initproduct } from '../dal/db'
import { type product } from '../interfaces'
import * as bll from '../bll/bll'
import { useI18n } from 'vue-i18n'
//#endregion


//#region Init
const products       = ref<product[]>([])
const currentPage    = ref(1)
const totalProducts  = ref(0)
const router         = useRouter()
const userStore      = useUserStore()
const $q             = useQuasar()
const productsByPage = 3
const { t, n }       = useI18n()




//#endregion



//#region Function




/**
 * Format the price in euro
 */
function formatPrice(price: number): string {
  try {
    return n(price, {
      style    : 'currency',
      currency : 'EUR'
    })
  } catch {
    return `${price.toFixed(2)} €`
  }
}


/**
 * Show a notification when an article is added to the cart
 */
function showNotif() {
  $q.notify({
    message  : t('notifications.cartCount', { count: userStore.cartCount }),
    position : 'top',
    color    : 'primary',
    actions: [
      {
        label : t('notifications.goToCart'),
        color : 'white',
        handler: () => {
          void router.push('/panier')
        }
      },
      {
        label : t('notifications.continueShopping'),
        color : 'white'
      }
    ]
  })
}


/**
 * Add a product to the cart
 */
function handleAddToCart(product: product) {
  userStore.addToCart(product, userStore.quantity)
  showNotif()
}


/**
 * Load all products
 */

async function loadproducts() {
  await Initproduct()

  const offset = ( currentPage.value - 1 ) * productsByPage
  const result =  await bll.getProducts(userStore.selectedCategories, offset , productsByPage)
  products.value      = result.products;
  totalProducts.value = result.totalProducts
}
//#endregion

watch(
  currentPage,
    async (selectedPage) => {
    const offset = ( selectedPage - 1 ) * productsByPage
    const result =  await bll.getProducts(userStore.selectedCategories, offset , productsByPage)
    products.value      = result.products;
    totalProducts.value = result.totalProducts
  }
)


watch(
  () => userStore.selectedCategories,
  async () => {
    const offset = ( currentPage.value - 1 ) * productsByPage
    const result =  await bll.getProducts(userStore.selectedCategories, offset , productsByPage)
    products.value      = result.products;
    totalProducts.value = result.totalProducts
  },
)

onMounted(() => {
  void loadproducts()
})
</script>:
