<script setup lang="ts">
import { defineProps } from 'vue';

// Определение props, которые будут переданы родительским компонентом
const props = defineProps({
  loading: Boolean,
  message: String,
});
</script>

<template>
  <q-inner-loading :showing="props.loading">
    <q-spinner size="5rem" color="primary" />
    <p>{{ props.message }}</p>
  </q-inner-loading>
</template>
