<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-purple-8 text-white">
      We can't find your saved recipes until you sign in.

      <template v-slot:action>
        <q-btn flat color="white" label="Continue as a Guest" />
        <q-btn flat color="white" label="Sign in" />
      </template>
    </q-banner>
  </div>
  <q-btn round>
    <q-avatar size="42px">
      <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
    </q-avatar>
  </q-btn>
  <q-page class="page-menu flex flex-center">
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
          <div class="q-mt-md text-center" @click="addProduct">
            {{ item.description }}
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="messages.map((item, index) => ({ label: `${index + 1}`, value: item.name }))"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import dataSet from '../../data/data.json';

const messages = ref(dataSet);
const slide = ref('Produit1');

function addProduct() {
  const newProduct = {
    name: `Produit${messages.value.length + 1}`,
    description: `Description du produit ${messages.value.length + 1}`,
  };
  messages.value.push(newProduct);
}
</script>
