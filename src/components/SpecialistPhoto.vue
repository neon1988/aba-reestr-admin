<template>
  <q-avatar :size="size" @click="url && (showFullscreen = true)">
    <img v-if="url"
      :src="computedImageUrl"
         :alt="`${specialist.name || 'Пользователь'}'s avatar`"
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
import { ref, computed } from 'vue';
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
  width: {
    type: Number || null,
    default: null,
  },
  height: {
    type: Number || null,
    default: null,
  },
  quality: {
    type: Number || null,
    default: null,
  },
});

const showFullscreen = ref<boolean>(false);

const url = ref<string | null>(props.specialist.photo?.url || null);

// Функция для добавления параметров w, h и q в URL изображения
const computedImageUrl = computed(() => {
  if (!url.value) return '';

  try {
    const urlObj = new URL(url.value);
    if (props.width) urlObj.searchParams.set('w', props.width.toString());
    if (props.height) urlObj.searchParams.set('h', props.height.toString());
    if (props.quality) urlObj.searchParams.set('q', props.quality.toString());
    return urlObj.toString();
  } catch (e) { /* empty */ }

  return url.value;
});

</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
