<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> SofaLand </q-toolbar-title>
        <q-btn color="primary" label="S'inscrire" @click = 'goToRegistration()'/>
        <q-btn dense round flat icon="shopping_cart" @click="goToPanier">
          <q-badge color="red" floating transparent>{{ userStore.panierCount }}</q-badge>
        </q-btn>        
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

function goToPanier() {
  void router.push('/panier');
}


function goToRegistration() {
  void router.push('/inscription');
}
</script>
