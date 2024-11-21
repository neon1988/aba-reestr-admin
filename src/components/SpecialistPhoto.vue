<template>
  <q-avatar :size="size">
    <img
      :src="avatarUrl"
         :alt="`${specialist.firstname || 'Пользователь'}'s avatar`"
      class="avatar-image" />
  </q-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Specialist } from 'src/models/Specialist';

const props = defineProps({
  specialist: {
    type: Object as () => Specialist,
    required: true,
  },
  size: {
    type: String,
    default: '3rem',
  },
});

const defaultAvatar = 'https://cdn.quasar.dev/img/boy-avatar.png';

const avatarUrl = computed(() => props.specialist.photo?.url || defaultAvatar);
</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
