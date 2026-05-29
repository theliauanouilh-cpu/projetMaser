<template>
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <!-- Menu à gauche -->
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

      <!-- Contenu à droite -->
      <div class="col q-pa-md">
        <h1>Voici votre panier :</h1>

        <div class="q-mb-md">
          {{ counterStore.panier }}
          Total : {{ totalPanier() }} €
        </div>

        <div class="q-gutter-sm">
          <q-btn v-if="articleDansPanier(1)" color="red" label="SUPP 1" @click="counterStore.deleteFromPanier(1)" />
          <q-btn v-if="articleDansPanier(2)" color="red" label="SUPP 2" @click="counterStore.deleteFromPanier(2)" />
          <q-btn v-if="articleDansPanier(3)" color="red" label="SUPP 3" @click="counterStore.deleteFromPanier(3)" />
          <q-btn v-if="articleDansPanier(4)" color="red" label="SUPP 4" @click="counterStore.deleteFromPanier(4)" />
          <q-btn v-if="articleDansPanier(5)" color="red" label="SUPP 5" @click="counterStore.deleteFromPanier(5)" />
          <q-btn v-if="articleDansPanier(6)" color="red" label="SUPP 6" @click="counterStore.deleteFromPanier(6)" />
          <q-btn v-if="articleDansPanier(7)" color="red" label="SUPP 7" @click="counterStore.deleteFromPanier(7)" />
          <q-btn v-if="articleDansPanier(8)" color="red" label="SUPP 8" @click="counterStore.deleteFromPanier(8)" />
          <q-btn v-if="articleDansPanier(9)" color="red" label="SUPP 9" @click="counterStore.deleteFromPanier(9)" />
          <q-btn v-if="articleDansPanier(10)" color="red" label="SUPP 10" @click="counterStore.deleteFromPanier(10)" />
          <q-btn v-if="articleDansPanier(11)" color="red" label="SUPP 11" @click="counterStore.deleteFromPanier(11)" />
          <q-btn v-if="articleDansPanier(12)" color="red" label="SUPP 12" @click="counterStore.deleteFromPanier(12)" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/example-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const counterStore = useCounterStore();

async function goHome() {
  await router.push('/');
}

async function goToProduit() {
  await router.push('/produit');
}

async function goToPanier() {
  await router.push('/panier');
}

function totalPanier() {
  return counterStore.panier.reduce((total, item) => total + item.quantity * item.prix, 0);
}

function articleDansPanier(id: number) {
  return counterStore.panier.some(item => item.id === id);
}
</script>