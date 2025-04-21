<template>
  <q-select
    v-model="selectedTags"
    ref="tagSelect"
    use-input
    use-chips
    multiple
    input-debounce="300"
    :options="filteredTags"
    :loading="tagStore.loading"
    :label="label"
    @filter="filterTags"
    @add="onAddTag"
    clearable
    new-value-mode="add-unique"
  >
    <template v-slot:no-option="scope">
      <q-item v-if="!tagSelect.loading" clickable @click="addNewTag(scope.inputValue)">
        <q-item-section>
          <q-item-label class="text-primary">
            Добавить новый тег "{{ scope.inputValue }}"?
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-close-popup>
        <q-item-section>
          <q-item-label>{{ scope.opt }}</q-item-label> <!-- opt — строка -->
        </q-item-section>
      </q-item>
    </template>

  </q-select>
</template>

<script setup>
/* eslint-disable no-console */
import {
  ref, watch, defineEmits,
} from 'vue';
import { useTagStore } from 'stores/tag-store';

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'Теги',
  },
});

// Emits
const emit = defineEmits(['update:modelValue']);
const tagStore = useTagStore();

// Data
const selectedTags = ref([]);
const filteredTags = ref([]);
const tagSelect = ref(null);

// Sync modelValue with selectedTags (convert string IDs to Tag objects)
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedTags.value = newValue;
    } else {
      selectedTags.value = [];
    }
  },
  { immediate: true },
);

// Emit changes to parent (emit only IDs as strings)
watch(
  () => selectedTags.value,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
);

// Filter tags based on input
const filterTags = (val, update) => {
  update(async () => {
    tagStore.search = val;
    await tagStore.fetchTags();
    filteredTags.value = tagStore.tags.map((tag) => tag.name);
  });
};

const onAddTag = () => {
  tagSelect.value.updateInputValue('');
};

const addNewTag = (name) => {
  selectedTags.value.push(name);
  tagSelect.value.hidePopup();
  tagSelect.value.updateInputValue('');
};

</script>
