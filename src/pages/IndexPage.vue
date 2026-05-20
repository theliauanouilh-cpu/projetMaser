<template>
  <q-page class="page-menu flex flex-center">
    <div class="menu-box text-center">
      <h1 class="menu-title">Bienvenue</h1>
      <p class="menu-subtitle">
        Découvrez notre sélection de produits.
      </p>

      <div v-for="item in dataSet" :key="item.name" class="q-mt-md">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
  import dataSet from '../../data/data.json'
</script>
    