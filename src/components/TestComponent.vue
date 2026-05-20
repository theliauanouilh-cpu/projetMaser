<template>
    <div @click="emit('change', { msg: 'i was clicked'})">my test component: {{ props.msg }}</div>
    <q-avatar square>
      <img src="https://cdn.quasar.dev/img/avatar.png" />
    </q-avatar>    
</template>

<script setup lang="ts">
import { onMounted } from 'vue';


interface Props {
  msg? : string
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello'
})

const emit = defineEmits(['change'])

onMounted(() => {
  console.log('TestComponent mountezzzd');
});
</script>