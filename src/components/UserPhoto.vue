<template>
  <q-avatar :size="size" :color="avatarColor" text-color="white">
    <!-- Если аватар есть, показываем его -->
    <img
      v-if="avatarUrl !== ''"
      :src="avatarUrl"
      :alt="`${user.name || 'Пользователь'}'s avatar`"
      class="avatar-image"
    />
    <!-- Если аватара нет, показываем заглушку с инициалами -->
    <span v-else>{{ initials }}</span>
  </q-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { User } from 'src/models/User';

// Пропсы
const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
  size: {
    type: String,
    default: '3rem',
  },
});

// Аватар пользователя
const avatarUrl = computed(() => props.user.photo?.url || '');

// Генерация инициалов
const initials = computed(() => {
  if (!props.user.name) return 'U'; // Заглушка по умолчанию
  const nameParts = props.user.name.split(' ');
  return nameParts
    .slice(0, 2) // Берем только первые два слова
    .map((part) => part.charAt(0).toUpperCase()) // Берем первую букву каждого
    .join(''); // Объединяем их
});

// Цвет для аватара-заглушки
const avatarColor = computed(() => {
  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'teal'];
  const nameHash = Array.from(props.user.name || 'U').reduce(
    (hash, char) => hash + char.charCodeAt(0),
    0,
  );
  return colors[nameHash % colors.length];
});
</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
