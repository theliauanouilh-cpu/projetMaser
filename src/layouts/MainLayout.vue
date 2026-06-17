<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="t('layout.header.menuAriaLabel')"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-center"> SofaLand </q-toolbar-title>


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
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list padding class="text-center">
          <q-item-label header class="text-center">
            {{ t('layout.drawer.title') }}
          </q-item-label>

          <q-item clickable v-ripple @click="goToProduit" class="justify-center">
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

          <q-separator class="q-my-md" />

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

          <q-separator class="q-my-md" />

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
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import langFr from 'quasar/lang/fr';
import langEnUS from 'quasar/lang/en-US';

const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();
const { t, locale } = useI18n({ useScope: 'global' });

const leftDrawerOpen = ref(false);

const localeOptions = [
  { label: 'Français', value: 'fr-FR' },
  { label: 'English', value: 'en-US' },
];

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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToPanier() {
  void router.push('/panier');
  leftDrawerOpen.value = false;
}

function goToConnection() {
  void router.push('/connection');
  leftDrawerOpen.value = false;
}

function goToInscription() {
  void router.push('/inscription');
  leftDrawerOpen.value = false;
}

function logout() {
  userStore.disconnect();
  void router.push('/');
  leftDrawerOpen.value = false;
}

function goToProduit() {
  void router.push('/');
  leftDrawerOpen.value = false;
}

function goToClient() {
  void router.push('/client');
  leftDrawerOpen.value = false;
}

const categoryOptions = computed(() => [
  { label: t('categories.black'), value: 'Noir' },
  { label: t('categories.green'), value: 'Vert' },
  { label: t('categories.brown'), value: 'Marron' },
  { label: t('categories.white'), value: 'Blanc' },
]);
</script>
