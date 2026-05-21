<template>
  <div ref="root">
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
      @click.stop
    >
      {{ counterStore.clickCount }}
    </div>

    <div class="row items-center q-gutter-sm">
      <div @click.stop>my test component: {{ props.msg }}</div>
      <q-avatar square>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCounterStore } from '../stores/example-store';

interface Props {
  msg?: string;
}
const props = withDefaults(defineProps<Props>(), { msg: 'hello' });

const emit = defineEmits<{ (e: 'change', payload: number): void }>();

const counterStore = useCounterStore();
const root = ref<HTMLElement | null>(null);

function onDocumentClick(e: MouseEvent) {
  const path = (e.composedPath && e.composedPath()) as EventTarget[] | undefined;
  if (root.value && path && path.includes(root.value)) {
    return;
  }
  counterStore.incrementClick();
  emit('change', counterStore.clickCount);
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>