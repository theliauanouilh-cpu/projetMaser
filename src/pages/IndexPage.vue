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

            <q-item clickable v-ripple @click="goToProduit">
              <q-item-section>Produit</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToPanier">
              <q-item-section>Panier</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goToClient">
              <q-item-section>Service client</q-item-section>
            </q-item>
          </q-list>

          <!-- Catégories -->
          <div class="q-pa-md">
            <div class="text-subtitle2 q-mb-sm">Catégories</div>

            <q-option-group
              v-model="group"
              :options="options"
              type="checkbox"
            />
          </div>
        </div>
      </div>

      <!-- Partie droite : affichage des produits -->
      <div class="col q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div
            v-for="produit in produitsPagines"
            :key="produit.id"
            class="col-12 col-md-6"
          >
            <q-card class="product-card">
              <q-carousel
                v-model="produit.slide"
                animated
                arrows
                navigation
                infinite
                height="250px"
                class="bg-grey-2"
              >
                <q-carousel-slide :name="0">
                  <q-img
                    :src="produit.images[0]"
                    fit="contain"
                    height="250px"
                  />
                </q-carousel-slide>

                <q-carousel-slide :name="1">
                  <q-img
                    :src="produit.images[1]"
                    fit="contain"
                    height="250px"
                  />
                </q-carousel-slide>
              </q-carousel>

              <q-card-section>
                <div class="text-h6">{{ produit.nom }}</div>
                <div class="text-caption text-grey-7">ID : {{ produit.id }}</div>

                <div v-if="produit.categorie" class="text-caption text-grey-7">
                  Catégorie : {{ produit.categorie }}
                </div>

                <div class="text-h5">{{ produit.prix.toFixed(2) }} €</div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  color="primary"
                  label="Ajouter au panier"
                  @click="userStore.addToPanier(produit)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <!-- Pagination -->
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
      </div>
    </div>
  </q-page>

   <footer class="bg-grey-3 q-px-md q-py-xl q-mt-md rounded-borders">
          <div class="row q-col-gutter-lg items-start">
            <div class="col-12 col-md-6">
              <div class="text-h6 text-primary text-weight-bold">SofaLand</div>
              <div class="text-body2 text-grey-7 q-mt-sm">
                © 2024 SofaLand. Qualité et confort pour votre maison.
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="column q-gutter-sm">
                <div class="text-body2">Téléphone : 01 23 45 67 89</div>
                <div class="text-body2">Email : support@sofaland.fr</div>
                <div class="text-body2">Horaires : Lun-Ven 9h-18h</div>
              </div>
            </div>
          </div>
        </footer>
        
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import dataSet from '../../data/data.json';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const produits = ref(dataSet);

const router = useRouter();
const userStore = useUserStore();

// Tableau des catégories cochées
const group = ref<string[]>([]);

// Options du q-option-group
const options = [
  { label: 'Noir', value: 'Noir' },
  { label: 'Vert', value: 'Vert' },
  { label: 'Marron', value: 'Marron' },
  { label: 'Blanc', value: 'Blanc' },
];

// Page actuelle
const current = ref(1);

// Nombre de produits affichés par page
const produitsParPage = 4;

 
async function goToPanier() {
  await router.push('/panier');
}

async function goToProduit() {
  await router.push('/');
}

async function goToClient() {
  await router.push('/client');
}

// Produits filtrés selon les catégories cochées
const produitsFiltres = computed(() => {
  if (group.value.length === 0) {
    return produits.value;
  }

  return produits.value.filter((produit) =>
    group.value.includes(produit.categorie)
  );
});

// Nombre total de pages
const nombrePages = computed(() => {
  return Math.ceil(produitsFiltres.value.length / produitsParPage) || 1;
});

// Produits affichés sur la page actuelle
const produitsPagines = computed(() => {
  const debut = (current.value - 1) * produitsParPage;
  const fin = debut + produitsParPage;
  return produitsFiltres.value.slice(debut, fin);
});
</script>

 