<template>
  <q-page class="page-menu">
    <div class="row no-wrap full-height">
      <div class="col-auto q-pa-md">
        <div
          class="q-pa-sm bg-grey-2 rounded-borders"
          style="min-width: 120px; max-width: 160px; height: calc(100vh - 2rem)"
        >
          <div class="text-subtitle2 text-center q-mb-md">Menu</div>

          <q-list bordered padding>
            <q-item clickable v-ripple @click="goHome">
              <q-item-section>Accueil</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToProduit">
              <q-item-section>Produit</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToPanier">
              <q-item-section>Panier</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Service client</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="col flex flex-center">
        <div class="menu-box text-center">
          <test-component msg="Hello from IndexPage" @change="testClicked" />
          <h1 class="menu-title">Bienvenue</h1>
          <h2>Découvrez notre sélection de produits</h2>

          <q-btn
            label="Visiter la boutique"
            color="primary"
            flat
            class="full-width q-mb-sm"
            @click="goToProduit"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TestComponent from '../components/TestComponent.vue';

const router = useRouter();

function testClicked(count: number) {
  console.log('New clickCount:', count);
}

async function goHome() {
  await router.push('/');
}

async function goToProduit() {
  await router.push('/produit');
}

async function goToPanier() {
  await router.push('/panier');
}
</script>