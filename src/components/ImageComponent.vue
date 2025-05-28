<template>

  <q-img v-if="props.quasarComponent"
    :src="src"
    :srcset="srcsetString"
    :alt="props.altText"
    :style="imageStyles"
    :class="attrs.class"
    :fit="props.fit"
    @click="props.allowFullscreen && src && (showFullscreen = true)"
  />
  <img v-else
       :src="src"
       :srcset="srcsetString || ''"
       :alt="props.altText"
       :style="imageStyles"
       :class="attrs.class"
       @click="props.allowFullscreen && src && (showFullscreen = true)" />
  <image-fullscreen v-if="props.allowFullscreen && src" v-model:show="showFullscreen">
    <q-img
      :src="src"
      spinner-color="primary"
      spinner-size="82px"
      width="100%"
      height="100%"
      fit="scale-down"
    />
  </image-fullscreen>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import {
  computed, defineProps, ref, useAttrs,
} from 'vue';
import ImageFullscreen from 'components/ImageFullscreen.vue';

type FitType = 'fill' | 'cover' | 'contain' | 'none' | 'scale-down';

interface Props {
  url: string;
  altText?: string;
  maxWidth?: number | null;
  maxHeight?: number | null;
  fit?: FitType | undefined; // <-- добавил | undefined
  allowFullscreen?: boolean;
  quasarComponent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  altText: '',
  maxWidth: null,
  maxHeight: null,
  allowFullscreen: false,
  quasarComponent: false,
});

const showFullscreen = ref(false);

const attrs = useAttrs();

const sizeToUrl = (width?: number | null, height?: number | null, quality = 100) => {
  const urlObj = new URL(props.url);
  if (width != null) urlObj.searchParams.set('w', width.toString());
  if (height != null) urlObj.searchParams.set('h', height.toString());
  if (quality != null) urlObj.searchParams.set('q', quality.toString());
  return urlObj.toString();
};

const src = computed(() => sizeToUrl(props.maxWidth, props.maxHeight, 100));

const srcsetString = computed(() => {
  if (props.maxWidth == null || props.maxHeight == null) return undefined;
  return [
    `${sizeToUrl(props.maxWidth, props.maxHeight, 100)}`,
    `${sizeToUrl(props.maxWidth * 2, props.maxHeight * 2, 100)} 2x`,
    `${sizeToUrl(props.maxWidth * 3, props.maxHeight * 3, 100)} 3x`,
    `${sizeToUrl(props.maxWidth * 4, props.maxHeight * 4, 100)} 4x`,
  ].join(', ');
});

const imageStyles = computed((): CSSProperties => ({
  maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
  maxHeight: props.maxHeight ? `${props.maxHeight}px` : undefined,
  ...(attrs.style as CSSProperties),
}));
</script>
