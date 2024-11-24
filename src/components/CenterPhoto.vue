<template>
  <q-avatar :size="size" rounded @click="url && (showFullscreen = true)">
    <img
      v-if="url"
      :src="url"
      :alt="center.name"
      class="avatar-image"
    />

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
import type { Center } from 'src/models/Center';
import ImageFullscreen from 'components/ImageFullscreen.vue';

const props = defineProps({
  center: {
    type: Object as () => Center,
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
const url = ref<string | null>(props.center.photo?.url || null);
</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
