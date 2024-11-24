<template>
  <q-avatar :size="size" @click="url && (showFullscreen = true)">
    <img v-if="url"
      :src="url"
         :alt="`${specialist.firstname || 'Пользователь'}'s avatar`"
      class="avatar-image" />

    <!-- Полноэкранное изображение -->
    <image-fullscreen v-if="fullscreen && url" v-model:show="showFullscreen">
      <q-img
        :src="url"
        spinner-color="primary"
        spinner-size="82px"
        width="100%"
        height="100%"
        fit="scale-down">
      </q-img>
    </image-fullscreen>
  </q-avatar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Specialist } from 'src/models/Specialist';
import ImageFullscreen from 'components/ImageFullscreen.vue';

const props = defineProps({
  specialist: {
    type: Object as () => Specialist,
    required: true,
  },
  size: {
    type: String,
    default: '3rem',
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
});

const showFullscreen = ref<boolean>(false);

const url = ref<string | null>(props.specialist.photo?.url || null);
</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
