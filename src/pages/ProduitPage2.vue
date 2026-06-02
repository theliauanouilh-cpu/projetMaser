<template>
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <!-- Sidebar -->
      <div class="col-auto q-pa-md">
        <div
          class="q-pa-md bg-grey-2 rounded-borders"
          style="min-width: 220px; max-width: 260px; height: calc(100vh - 2rem)"
        >
          <div class="text-h6 text-center q-mb-lg">Menu</div>

          <q-list bordered padding class="rounded-borders bg-white">
            <q-item clickable v-ripple @click="goHome">
              <q-item-section>Accueil</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToPanier">
              <q-item-section>Panier</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Service client</q-item-section>
            </q-item>
          </q-list>

          <div class="q-pa-md">
            <q-btn-dropdown color="primary" label="categories">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Noir</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Vert</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Marron</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Blanc</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="q-mt-lg">
            <div class="menu-box text-center">
              <test-component msg="Hello from ProduitPage" @change="testClicked" />
            </div>
          </div>
        </div>
      </div>

      <!-- Produits à droite -->
      <div class="col q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div v-for="produit in produits" :key="produit.id" class="col-12 col-md-6">
            <q-card class="product-card">
              <q-carousel
                v-model="produit.slide"
                animated
                arrows
                navigation
                infinite
                height="180px"
                class="bg-grey-3"
              >
                <q-carousel-slide :name="0">
                  <q-img :src="produit.images[0]" fit="cover" height="180px" />
                </q-carousel-slide>

                <q-carousel-slide :name="1">
                  <q-img :src="produit.images[1]" fit="cover" height="180px" />
                </q-carousel-slide>
              </q-carousel>

              <q-card-section>
                <div class="text-h6">{{ produit.nom }}</div>
                <div class="text-caption text-grey-7">ID : {{ produit.id }}</div>
                <div class="text-h5">{{ produit.prix.toFixed(2) }} €</div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  color="primary"
                  label="Ajouter au panier"
                  @click="counterStore.addToPanier(produit)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md flex flex-center">
      <q-btn color="primary" label="1" @click="goToProduit" />
      <q-btn color="primary" label="2" @click="goToPage2" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TestComponent from '../components/TestComponent.vue';
import { useCounterStore } from '../stores/example-store';
import type { Produit } from '../stores/example-store';


const counterStore = useCounterStore();
const router = useRouter();

function testClicked(count: number) {
  console.log('New clickCount:', count);
}

// Utilise les produits du store
const produits = computed(() => counterStore.products) as unknown as Produit[];

function onItemClick() {
  console.log('Menu item clicked');
}

async function goHome() {
  await router.push('/');
}

async function goToPanier() {
  await router.push('/panier');
}

async function goToProduit() {
  await router.push('/produit');
}

async function goToPage2() {
  await router.push('/page2');
}
</script>