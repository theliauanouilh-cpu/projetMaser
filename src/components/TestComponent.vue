<template>

    <div
      class="bg-white text-primary shadow-2 flex items-center justify-center"
      style="
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        font-weight: 600;
        cursor: default;
      "
      @click="counterStore.incrementClick()"
    >
      {{ counterStore.clickCount }}
    </div>
</template>

<script setup lang="ts">
//import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCounterStore } from '../stores/example-store';


//const emit = defineEmits<{ (e: 'change', payload: number): void }>();

const counterStore = useCounterStore();


</script>