<template>
  <!-- #region Layout -->
  <q-layout view="hHh Lpr lFf">
    <!-- #region Header -->
    <q-header elevated>
      <q-toolbar class="q-px-md">
        <!-- #region Menu button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="t('layout.header.menuAriaLabel')"
          @click="toggleLeftDrawer"
        />
        <!-- #endregion Menu button -->

        <q-toolbar-title class="text-center"> SofaLand </q-toolbar-title>

        <!-- #region Language select -->
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          standout="text-primary"
          rounded
          borderless
          emit-value
          map-options
          options-dense
          dropdown-icon="translate"
          style="min-width: 140px"
          class="language-select q-mr-md"
        />
        <!-- #endregion Language select -->

        <!-- #region Cart button -->
        <q-btn
          dense
          round
          flat
          icon="shopping_cart"
          :aria-label="t('layout.drawer.cart')"
          @click="goToPanier"
        >
          <q-badge v-if="userStore.panierCount > 0" color="red" floating>
            {{ userStore.panierCount }}
          </q-badge>
        </q-btn>
        <!-- #endregion Cart button -->
      </q-toolbar>
    </q-header>
    <!-- #endregion Header -->

    <!-- #region Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list padding class="text-center">
          <!-- #region Drawer title -->
          <q-item-label header class="text-center">
            {{ t('layout.drawer.title') }}
          </q-item-label>
          <!-- #endregion Drawer title -->

          <!-- #region Navigation -->
          <q-item clickable v-ripple @click="goToproduct" class="justify-center">
            <q-item-section class="text-center">
              {{ t('layout.drawer.products') }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="goToPanier" class="justify-center">
            <q-item-section class="text-center">
              {{ t('layout.drawer.cart') }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="goToClient" class="justify-center">
            <q-item-section class="text-center">
              {{ t('layout.drawer.customerService') }}
            </q-item-section>
          </q-item>
          <!-- #endregion Navigation -->

          <q-separator class="q-my-md" />

          <!-- #region Categories -->
          <div class="q-px-md q-pb-md flex column items-center">
            <div class="text-subtitle2 q-mb-sm text-center">
              {{ t('layout.drawer.categories') }}
            </div>

            <q-option-group
              v-model="userStore.selectedCategories"
              :options="categoryOptions"
              type="checkbox"
              class="text-left"
            />
          </div>
          <!-- #endregion Categories -->

          <q-separator class="q-my-md" />

          <!-- #region Auth buttons -->
          <div class="q-px-md column items-center q-gutter-sm">
            <q-btn
              v-if="!userStore.data.customer"
              flat
              color="grey"
              :label="t('auth.register')"
              @click="goToInscription"
              style="width: 180px"
            />

            <q-btn
              v-if="!userStore.data.customer"
              flat
              color="grey"
              :label="t('auth.login')"
              @click="goToConnection"
              style="width: 180px"
            />

            <q-btn
              v-if="userStore.data.customer"
              flat
              color="red"
              :label="t('auth.logout')"
              @click="logout"
              style="width: 180px"
            />
          </div>
          <!-- #endregion Auth buttons -->
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- #endregion Drawer -->

    <!-- #region Page container -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- #endregion Page container -->
  </q-layout>
  <!-- #endregion Layout -->
</template>

<script setup lang="ts">
//#region import
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import langFr from 'quasar/lang/fr';
import langEnUS from 'quasar/lang/en-US';
//#endregion

//#region Init
const leftDrawerOpen = ref(false);

/**
 * Get category filter options
 */
const categoryOptions = computed(() => [
  { label: t('categories.black'), value: 'Black' },
  { label: t('categories.green'), value: 'Green' },
  { label: t('categories.brown'), value: 'Brown' },
  { label: t('categories.white'), value: 'White' },
]);

const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();
const { t, locale } = useI18n({ useScope: 'global' });

/**
 * Available language options
 */
const localeOptions = [
  { label: 'Français', value: 'fr-FR' },
  { label: 'English', value: 'en-US' },
];

/**
 * Update Quasar language when locale changes
 */
watch(
  locale,
  (val) => {
    if (val === 'fr-FR') {
      $q.lang.set(langFr);
    } else if (val === 'en-US') {
      $q.lang.set(langEnUS);
    }
  },
  { immediate: true },
);
//#endregion


//#region Function
/**
 * Toggle drawer state
 */
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

/**
 * Go to cart page
 */
function goToPanier() {
  void router.push('/panier');
  leftDrawerOpen.value = false;
}

/**
 * Go to login page
 */
function goToConnection() {
  void router.push('/connection');
  leftDrawerOpen.value = false;
}

/**
 * Go to register page
 */
function goToInscription() {
  void router.push('/inscription');
  leftDrawerOpen.value = false;
}

/**
 * Logout current user
 */
function logout() {
  userStore.disconnect();
  void router.push('/');
  leftDrawerOpen.value = false;
}

/**
 * Go to products page
 */
function goToproduct() {
  void router.push('/');
  leftDrawerOpen.value = false;
}

/**
 * Go to customer service page
 */
function goToClient() {
  void router.push('/client');
  leftDrawerOpen.value = false;
}
//#endregion

</script>
