<template>
  <router-view />
</template>


<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useUserStore } from './stores/userStore';
import { LocalStorage } from 'quasar';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

// Then, inside App.vue's setup()
const userStore = useUserStore();

userStore.$subscribe((mutation, state) => {
  LocalStorage.set('user-data', state.data)
})

onBeforeMount(() => {
 locale.value = userStore.data.language
})

</script>
