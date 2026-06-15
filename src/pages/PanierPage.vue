<template>
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <!-- Menu à gauche -->
      
 
      <!-- Contenu à droite -->
      <div class="col q-pa-md">
        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6">Panier ({{ userStore.panierCount }})</div>
            </q-card-section>

            <q-separator />

            <q-list>
              <q-item v-for="item in userStore.data.panier" :key="item.id" clickable>
                <q-item-section avatar>
                  <q-img :src="getImageForItem(item.id)" style="width: 70px; height: 70px" fit="contain"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ item.nom }}</q-item-label>
                  <q-item-label caption
                    >{{ item.prix.toFixed(2) }} € x {{ item.quantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side class="row items-center">
                  <q-input filled 
                    v-model="item.quantity" 
                    type="number"
                    style="width:130px"
                    dense
                     min="1"
                     max="10"
                  >
                    <template v-slot:before>
                      <q-btn
                      dense
                      round
                      icon="remove"
                      size="9px"
                      @click="userStore.decreaseQuantity(item.id)"
                      />
                    </template>
                    <template v-slot:after>
                      <q-btn
                      dense
                      round
                      icon="add"
                      size="9px"                     
                      @click="userStore.increaseQuantity(item.id)"
                      />
                    </template>
                  </q-input>
                </q-item-section>
                <q-item-section side class="row items-center">
                  <q-btn
                    dense
                    round
                    color="negative"
                    icon="delete"
                    @click="userStore.deleteFromPanier(item.id)"
                    class="q-ml-sm"
                  />
                </q-item-section>
              </q-item>
              
              <q-item v-if="userStore.data.panier.length === 0">
                <q-item-section>Aucun article dans le panier.</q-item-section>
              </q-item>
            </q-list>

            <q-separator />

            <q-card-section>
              <div class="text-subtitle1">Total: {{ userStore.panierTotal.toFixed(2) }} €</div>
              <div class="q-mt-sm">
                <q-btn color="secondary" label="Acheter" @click="goToPayment" v-if="userStore.panierTotal > 0"/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import productList from '../../data/products.json';


const router = useRouter();
const userStore = useUserStore();

const produits = ref(productList);


async function goToPayment() {
  await router.push('/pay');
}


function getImageForItem(id: number) {
  const p = produits.value.find((prod) => prod.id === id);
  if (!p || !p.images || p.images.length === 0) return '';
  return p.images[0];
}
</script>
