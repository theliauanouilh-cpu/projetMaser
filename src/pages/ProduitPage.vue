<template>
  <q-page class="page-menu q-pa-md" style="position: relative; min-height: 100vh;">
    <!-- logo en haut à droite -->
    <img
      src="https://cdn.quasar.dev/img/avatar2.jpg"
      alt="logo"
      style="position: absolute; top: 1rem; right: 1rem; width: 50px; height: 50px; border-radius: 50%;"
    />

    <div class="row items-start no-wrap">
      <!-- barre latérale gauche -->
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

const router = useRouter();

// données du carousel
const messages = ref(dataSet);
// slide actif
const slide = ref('Produit1');

async function goHome() {
  await router.push('/');
}
</script>
