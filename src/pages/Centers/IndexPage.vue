<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Центры на проверке</q-toolbar-title>
    </q-toolbar>

    <!-- Список специалистов -->
    <q-list v-if="store.centers.length > 0">
      <q-item v-for="center in store.centers"
              @click="viewSpecialist(center)"
              :key="center.id" clickable>
        <q-item-section>
          <q-item-label>{{ center.name }}</q-item-label>
          <q-item-label caption>{{ center.legal_name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner class="bg-grey-3 text-grey-8">
        Нет специалистов на проверке
      </q-banner>
    </div>

    <div class="q-pa-lg flex flex-center">
      <!-- Пагинация -->
      <q-pagination
        v-if="store.meta && store.meta.last_page > 1"
        v-model="store.currentPage"
        :min="1"
        :max="store.meta.last_page"
        :max-pages="7"
        boundary-numbers
        @update:model-value="store.fetchCenters"
      />
    </div>

    <!-- Показываем загрузку, пока данные загружаются -->
    <div v-if="store.loading">
      <q-inner-loading :showing="store.loading">
        <q-spinner-gears size="5rem" color="primary" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Center } from 'src/models/Center';
import { useCentersStore } from 'src/stores/centersStore';

const router = useRouter();
const store = useCentersStore();

// Метод для просмотра специалиста
const viewSpecialist = (center: Center) => {
  router.push({ name: 'centers.show', params: { id: center.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchCenters();
});
</script>
