<template>
  <q-page class="page-menu flex flex-center">
    <div class="menu-box text-center">
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
  </q-page>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

async function goToProduit() {
  await router.push('/produit');
}
</script>
    