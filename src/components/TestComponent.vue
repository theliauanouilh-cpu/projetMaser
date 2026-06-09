<template>
  <div class="bg-white text-primary shadow-2 flex items-center justify-center">
     <q-badge color="red" text-color="black" @click="userStore.incrementClick()" />
    
      {{ userStore.data.clickCount }}
  </div>
</template>
<script setup lang="ts">
//import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '../stores/userStore';


//const emit = defineEmits<{ (e: 'change', payload: number): void }>();

const userStore = useUserStore();


</script>