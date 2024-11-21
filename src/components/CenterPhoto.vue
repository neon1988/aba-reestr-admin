<template>
  <q-avatar :size="size" class="q-mb-sm">
    <img
      :src="avatarUrl" :alt="center.name"
      class="avatar-image" />
  </q-avatar>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { Center } from 'src/models/Center';

const props = defineProps({
  center: {
    type: Object as () => Center,
    required: true,
  },
  size: {
    type: String,
    default: '3rem',
  },
});

const defaultAvatar = 'https://cdn.quasar.dev/img/boy-avatar.png';

const avatarUrl = computed(() => props.center.photo?.url || defaultAvatar);
</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
