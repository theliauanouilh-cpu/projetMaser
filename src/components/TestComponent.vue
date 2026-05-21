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
      {{ clickCount }}
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

interface Props {
  msg?: string;
}
const props = withDefaults(defineProps<Props>(), { msg: 'hello' });

const emit = defineEmits<{ (e: 'change', payload: number): void }>();

const root = ref<HTMLElement | null>(null);
const clickCount = ref(0);

function onDocumentClick(e: MouseEvent) {
  const path = (e.composedPath && e.composedPath()) as EventTarget[] | undefined;
  if (root.value && path && path.includes(root.value)) {
    return;
  }
  clickCount.value++;
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});

watch(clickCount, (newVal, oldVal) => {
  console.log('clickCount changed', oldVal, '->', newVal);
  emit('change', newVal);
});
</script>