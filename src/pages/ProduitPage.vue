<template>
  <q-page class="page-menu" style="min-height: 100vh">
    <div class="row no-wrap" style="min-height: 100vh">
      <!-- Sidebar -->
      <div class="col-auto q-pa-md">
        <div
          class="q-pa-sm bg-grey-2 rounded-borders"
          style="min-width: 120px; max-width: 160px; height: calc(100vh - 2rem)"
        >
          <div class="text-subtitle2 text-center q-mb-md">Menu</div>

          <q-list bordered padding>
            <q-item clickable v-ripple @click="goHome">
              <q-item-section>Accueil</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Panier</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Service client</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <test-component msg="Hello from ProduitPage" @change="testClicked" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import TestComponent from '../components/TestComponent.vue';

const router = useRouter();


/* const props = defineProps({
  id: Number,
});*/

function testClicked(count: number) {
  console.log('New clickCount:', count);
}

async function goHome() {
  await router.push('/');
}
</script>
