<template>
  <q-avatar
    :size="size"
    :color="avatarColor"
    text-color="white"
    @click="url && (showFullscreen = true)">
    <!-- Аватар или заглушка -->
    <img
      v-if="url"
      :src="url"
      :alt="`${modelValue.name || 'Пользователь'}'s avatar`"
      class="avatar-image"
    />
    <span v-else>{{ initials }}</span>

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
import { computed, ref } from 'vue';
import type { User } from 'src/models/User';
import ImageFullscreen from 'components/ImageFullscreen.vue';

// Пропсы
const props = defineProps({
  modelValue: {
    type: Object as () => User,
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

defineEmits(['update:modelValue']);

const showFullscreen = ref<boolean>(false);

// Генерация инициалов
const initials = computed(() => {
  if (!props.modelValue.name) return 'U';
  const nameParts = props.modelValue.name.split(' ');
  return nameParts.slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
});

// Цвет аватара
const avatarColor = computed(() => {
  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'teal'];
  const nameHash = Array.from(props.modelValue.name || 'U').reduce(
    (hash, char) => hash + char.charCodeAt(0),
    0,
  );
  return colors[nameHash % colors.length];
});

// Функция для добавления параметров w, h и q в URL изображения
const url = computed(() => {
  const photoUrl = props.modelValue.photo?.url;

  if (!photoUrl) return '';

  try {
    const urlObj = new URL(photoUrl);
    if (props.width) urlObj.searchParams.set('w', props.width.toString());
    if (props.height) urlObj.searchParams.set('h', props.height.toString());
    if (props.quality) urlObj.searchParams.set('q', props.quality.toString());
    return urlObj.toString();
  } catch (e) { /* empty */ }

  return photoUrl;
});

</script>

<style scoped>
.avatar-image {
  object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
  width: 100%;
  height: 100%;
}
</style>
