<template>
  <q-dialog
    v-model="show"
    maximized
    full-width
    full-height
    @keydown.esc="closeFullscreen"
  >
    <div
      class="fullscreen"
      style="width: 100%; height: 100%; position: relative"
      @click="closeFullscreen"
    >
      <!-- Слот с основным контентом -->
      <slot></slot>

      <!-- Кнопка "Закрыть" в верхнем правом углу -->
      <slot name="top-right">
        <div class="q-pa-lg absolute-top-right">
          <q-btn
            icon="close"
            color="white"
            round
            text-color="black"
            @click="closeFullscreen"
          />
        </div>
      </slot>

      <!-- Слот для контента в правом нижнем углу -->
      <div class="q-pa-lg absolute-bottom-right">
        <slot name="right-bottom"></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Пропсы для передачи даты в компонент
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const show = computed(() => props.show);

const emit = defineEmits(['update:show']);

function closeFullscreen() {
  emit('update:show', false); // Notify the parent to update the "show" value
}

</script>
