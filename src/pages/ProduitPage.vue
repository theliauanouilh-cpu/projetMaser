<template>
  <!-- Page principale Quasar, prend toute la hauteur de l'écran -->
  <q-page class="page-menu" style="min-height: 100vh">
    <!-- Ligne principale : sidebar à gauche + produits à droite -->
    <div class="row no-wrap" style="min-height: 100vh">
      <!-- Sidebar -->
      <div class="col-auto q-pa-md">
        <div
          class="q-pa-md bg-grey-2 rounded-borders"
          style="min-width: 220px; max-width: 260px; height: calc(100vh - 2rem)"
        >
          <!-- Titre du menu latéral -->
          <div class="text-h6 text-center q-mb-lg">Menu</div>

          <!-- Liste de navigation -->
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

          <!-- Menu déroulant pour filtrer les produits par catégorie -->
          <div class="q-pa-md">
            <q-btn-dropdown color="primary" label="Catégories">
              <q-list>
                <q-item clickable v-close-popup @click="filtrerParCategorie('Noir')">
                  <q-item-section>
                    <q-item-label>Noir</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="filtrerParCategorie('Vert')">
                  <q-item-section>
                    <q-item-label>Vert</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="filtrerParCategorie('Marron')">
                  <q-item-section>
                    <q-item-label>Marron</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="filtrerParCategorie('Blanc')">
                  <q-item-section>
                    <q-item-label>Blanc</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="filtrerParCategorie('Toutes')">
                  <q-item-section>
                    <q-item-label>Toutes</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <!-- Affiche la catégorie actuellement sélectionnée -->
          <div class="q-mt-md text-caption">
            Catégorie sélectionnée : {{ selectedCategorie }}
          </div>

          <!-- Zone contenant un composant de test -->
          <div class="q-mt-lg">
            <div class="menu-box text-center">
              <test-component msg="Hello from ProduitPage" @change="testClicked" />
            </div>
          </div>
        </div>
      </div>

      <!-- Partie droite : affichage des produits -->
      <div class="col q-pa-lg">
        <div class="row q-col-gutter-lg">
          <!-- On boucle sur les produits paginés -->
          <div
            v-for="produit in produitsPagines"
            :key="produit.id"
            class="col-12 col-md-6"
          >
            <q-card class="product-card">
              <!-- Carrousel d'images -->
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

              <!-- Infos produit -->
              <q-card-section>
                <div class="text-h6">{{ produit.nom }}</div>
                <div class="text-caption text-grey-7">ID : {{ produit.id }}</div>

                <div v-if="produit.categorie" class="text-caption text-grey-7">
                  Catégorie : {{ produit.categorie }}
                </div>

                <div class="text-h5">{{ produit.prix.toFixed(2) }} €</div>
              </q-card-section>

              <!-- Bouton panier -->
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import dataSet from '../../data/data.json';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/example-store';

const produits = ref(dataSet);

const router = useRouter();
const counterStore = useCounterStore();

// Fonction appelée quand le composant enfant émet l'événement "change"
function testClicked(count: number) {
  console.log('New clickCount:', count);
}

// Catégorie sélectionnée par défaut
const selectedCategorie = ref('Toutes');

// Page actuelle
const current = ref(1);

// Nombre de produits affichés par page
const produitsParPage = 4;

async function goHome() {
  await router.push('/');
}

async function goToPanier() {
  await router.push('/panier');
}

// Fonction qui change la catégorie sélectionnée
function filtrerParCategorie(categorie: string) {
  selectedCategorie.value = categorie;
  current.value = 1;
}

// Liste filtrée selon la catégorie choisie
const produitsFiltres = computed(() => {
  if (selectedCategorie.value === 'Toutes') {
    return produits.value;
  }

  return produits.value.filter((produit) => produit.categorie === selectedCategorie.value);
});

// Nombre total de pages
const nombrePages = computed(() => {
  return Math.ceil(produitsFiltres.value.length / produitsParPage);
});

// Produits affichés sur la page actuelle
const produitsPagines = computed(() => {
  const debut = (current.value - 1) * produitsParPage;
  const fin = debut + produitsParPage;
  return produitsFiltres.value.slice(debut, fin);
});
</script>
