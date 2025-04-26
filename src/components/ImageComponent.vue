<template>
  <q-img
    :src="src"
    :srcset="srcsetString"
    :alt="altText"
    :style="imageStyles"
    :class="attrs.class"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  url: string
  altText?: string
  maxWidth: number
  maxHeight: number
}>();

const attrs = useAttrs(); // Получаем $attrs

const altText = props.altText ?? 'Image'; // Значение по умолчанию для altText

const sizeToUrl = (width: number, height: number, quality: number) => {
  const urlObj = new URL(props.url); // Используем props.url напрямую
  if (width) urlObj.searchParams.set('w', width.toString());
  if (height) urlObj.searchParams.set('h', height.toString());
  if (quality) urlObj.searchParams.set('q', quality.toString());
  return urlObj.toString();
};

const src = computed(() => sizeToUrl(props.maxWidth, props.maxHeight, 100));

const srcsetString = computed(() => [
  `${sizeToUrl(props.maxWidth, props.maxHeight, 100)}`,
  `${sizeToUrl(props.maxWidth * 2, props.maxHeight * 2, 100)} 2x`,
  `${sizeToUrl(props.maxWidth * 3, props.maxHeight * 3, 100)} 3x`,
  `${sizeToUrl(props.maxWidth * 4, props.maxHeight * 4, 100)} 4x`,
].join(', '));

const imageStyles = computed((): CSSProperties => ({
  maxWidth: `${props.maxWidth}px`,
  maxHeight: `${props.maxHeight}px`,
  ...(attrs.style as CSSProperties), // Восстанавливаем стили из attrs
}));
</script>
