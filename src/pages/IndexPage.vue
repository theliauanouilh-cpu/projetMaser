<template>
  <q-page class="page-menu" style="min-height: 100vh">

    <button @click="getUsers()">get</button>
    {{ users }}



    <div class="row no-wrap" style="min-height: 100vh">
      
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


              <q-card-section>
                <q-separators color="grey-6" />
                
                <div class="row text-h6" >
                    <div class="col"> {{ produit.nom }} </div>
                    <div class="col text-right" > {{ produit.prix.toFixed(2) }} € </div>
                </div>


                <div v-if="produit.categorie" class="text-caption text-grey-7">
                  Catégorie : {{ produit.categorie }}
                </div>


                <div v-if="produit.categorie" class="text-caption text-grey-7">
                  Dimension : {{ produit.taille }}
                </div>


                <div v-if="produit.categorie" class="text-caption text-grey-7">
                 {{ produit.description }}
                </div>


                
              </q-card-section>


              <q-card-actions align="right">
                 <q-input filled 
                  v-model.number="userStore.quantity" 
                  type="number"
                  style="width:70px"
                  dense
                  min="1"
                  max="10"
                  ></q-input> 
                <q-btn
                  color="primary"
                  label="Ajouter au panier"
                  @click="userStore.addToPanier(produit, userStore.quantity), showNotif()"
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
import productList from '../../data/products.json';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useQuasar} from 'quasar';


import { getApiUsers } from '../api/api';

const $q        = useQuasar();
const produits  = ref(productList);
const router    = useRouter();
const userStore = useUserStore();

// Page actuelle
const current = ref(1);

// Nombre de produits affichés par page
const produitsParPage = 4;





// Produits filtrés selon les catégories cochées
const produitsFiltres = computed(() => {
  if (userStore.selectedCategories.length === 0) {
    return produits.value;
  }

  return produits.value.filter((produit) =>
    userStore.selectedCategories.includes(produit.categorie)
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


function showNotif() {
  $q.notify({
    message: `Vous avez ${userStore.panierCount} articles dans le panier`,
    position: 'top',
    color: 'primary',
    actions: [
      {
        label: 'Aller au panier',
        color: 'white',
        handler: () => {
          void router.push('/panier');
        }
      },
      {
        label: 'Continuer mes achats',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  });
}

const users = ref()
//#region database
async function getUsers() {
  users.value = await getApiUsers()
}

//#endregion

</script>    