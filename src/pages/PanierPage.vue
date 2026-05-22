<template>
  <div>
    <h1>Voici votre panier :</h1>
    {{ counterStore.panier }}
    <div class="q-pa-md q-gutter-sm" @click="counterStore.deleteFromPanier(1)">
      <q-btn color="red" label="SUPP" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/example-store';
const counterStore = useCounterStore();
</script>
