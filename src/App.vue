<template>
  <router-view />
</template>


<script setup lang="ts">
import { useUserStore } from './stores/userStore';
import { LocalStorage } from 'quasar';  
// Then, inside App.vue's setup()
const userStore = useUserStore();

userStore.$subscribe((mutation, state) => {
  LocalStorage.set('user-data', state.data)
})
</script>