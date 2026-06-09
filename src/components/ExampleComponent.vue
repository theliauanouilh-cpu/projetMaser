<template>
  <div>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';






const clickCount = ref(0);



</script>
