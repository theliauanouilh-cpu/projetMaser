<template>
  <q-page class="page-menu q-pa-md" style="position: relative; min-height: 100vh;" @click="incrementCounter">
    <!-- petit compteur en haut à droite  -->
    <div
      class="bg-white text-primary shadow-2 flex items-center justify-center"
      style="position: absolute; top: 1rem; right: 1rem; width: 42px; height: 42px; border-radius: 50%; font-weight: 600;"
    >
      {{ clickCount }}
    </div>

    <div class="row items-start no-wrap">
      <!-- barre latérale gauche + liste -->
      <div class="col-auto">
        <div class="q-pa-sm bg-grey-2 rounded-borders" style="min-width: 120px; max-width: 160px; height: calc(100vh - 4rem);">
          <div class="text-subtitle2 text-center q-mb-md">Menu</div>
          <q-list bordered padding>
            <q-item clickable v-ripple @click="goHome">
              <q-item-section>
                Accueil 
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Panier
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Service client
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <test-component
                  msg="Hello from ProduitPage"
                  @change="testClicked"
                />
              </q-item-section>
            </q-item>            
          </q-list>
        </div>
      </div>

      <!-- zone principale du carousel -->
      <div class="col">
        <div class="row justify-center">
          <div class="col-12 col-lg-10">
            <div class="menu-box text-center">
              <q-carousel
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                animated
                control-color="primary"
                class="rounded-borders"
              >
                <q-carousel-slide
                  v-for="item in messages"
                  :key="item.name"
                  :name="item.name"
                  class="column no-wrap flex-center"
                >
                  <q-icon name="style" color="primary" size="56px" />
                  <div class="q-mt-md text-center">
                    {{ item.description }}
                  </div>
                </q-carousel-slide>
              </q-carousel>

              <div class="row justify-center q-mt-md">
                <!-- pagination du carousel sous le contenu -->
                <q-btn-toggle
                  glossy
                  v-model="slide"
                  :options="messages.map((item, index) => ({ label: `${index + 1}`, value: item.name }))"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import dataSet from '../../data/data.json';
import TestComponent from '../components/TestComponent.vue';

const router = useRouter();

// données du carousel
const messages = ref(dataSet);
// slide actif
const slide = ref('Produit1');

// compteur de clics 
const clickCount = ref(0);

function incrementCounter() {
  clickCount.value++;
}

function testClicked(payload: unknown) {
  console.log('Event from TestComponent:', payload);
}

async function goHome() {
  await router.push('/');
}
</script>