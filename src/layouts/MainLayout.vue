<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> SofaLand </q-toolbar-title>
         

    
        
        <q-btn dense round flat icon="shopping_cart" @click="goToPanier">
          <q-badge color="red" floating transparent>{{ userStore.panierCount }}</q-badge>
        </q-btn>        
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        
        <q-item-label header > <div class="col-auto q-pa-md" >
        <div
          class="q-pa-md rounded-borders"
          style="min-width: 220px; max-width: 260px;"
        >
          <div class="text-h6 text-center q-mb-lg" >Menu</div>


          <q-list bordered padding class="rounded-borders bg-white">


            <q-item clickable v-ripple @click="goToProduit" >
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
                v-model="userStore.selectedCategories"
                :options="options"
                type="checkbox"
              />
          </div>
        </div>
      </div>

       <div class="col q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div
            v-for="produit in produitsPagines"
            :key="produit.id"
            class="col-12 col-md-6"
          >

          
          </div>
        </div>
        </div>
        
 </q-item-label>
   


        
      </q-list>
      <q-btn v-if="!userStore.data.customer" flat color="grey" label="S'inscrire" @click = 'goToInsciption()'/>
        <q-btn v-if="!userStore.data.customer" flat color="grey" label="Se connecter" @click = 'goToConnection()'/>

        
        <q-btn v-if="userStore.data.customer" flat color="red" label="Se déconnecter" @click="logout"/>
    </q-drawer>
 
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import productList from '../../data/products.json';

const router = useRouter();
const userStore = useUserStore();
const produits = ref(productList);
const produitsParPage = 4;
const current = ref(1);



function goToPanier() {
  void router.push('/panier');
}


function goToConnection() {
  void router.push('/connection');
}

function goToInsciption(){
  void router.push('/inscription');
}

function logout(){
  userStore.disconnect();
  void router.push('/');
}

async function goToProduit() {
  await router.push('/');
}


async function goToClient() {
  await router.push('/client');
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}


const options = [
  { label: 'Noir', value: 'Noir' },
  { label: 'Vert', value: 'Vert' },
  { label: 'Marron', value: 'Marron' },
  { label: 'Blanc', value: 'Blanc' },
];

const produitsFiltres = computed(() => {
  if (userStore.selectedCategories.length === 0) {
    return produits.value;
  }

  return produits.value.filter((produit) =>
    userStore.selectedCategories.includes(produit.categorie)
  );
});


const produitsPagines = computed(() => {
  const debut = (current.value - 1) * produitsParPage;
  const fin = debut + produitsParPage;
  return produitsFiltres.value.slice(debut, fin);
});



</script>
