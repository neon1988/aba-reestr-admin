<template>
  {{ formattedDate }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { date as dateUtils } from 'quasar';

// Пропсы для передачи даты в компонент
const props = defineProps({
  rawDate: {
    type: String,
    required: true, // Ожидается строка даты в ISO-формате
  },
  format: {
    type: String,
    default: 'DD MMMM YYYY, HH:mm:ss', // Формат даты (по умолчанию)
  },
});

// Форматируем дату
const formattedDate = computed(() => dateUtils.formatDate(props.rawDate, props.format));
</script>
