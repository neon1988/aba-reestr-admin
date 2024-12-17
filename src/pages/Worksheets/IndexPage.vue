<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Библиотека</q-toolbar-title>
    </q-toolbar>

    <q-card-section>
      <q-btn label="Создать материал" color="green"
             :to="{ name: 'worksheets.create' }" />
    </q-card-section>

    <!-- Список материалов -->
    <q-list v-if="store.worksheets.length > 0">
      <q-item
        v-for="worksheet in store.worksheets"
        @click="viewWorksheet(worksheet)"
        :key="worksheet.id"
        clickable
      >
        <!-- Секция с аватаром -->
        <q-item-section avatar>
          <q-img v-if="worksheet.cover"
                 :src="worksheet.cover.url" alt="cover" width="50px" height="50px"/>
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label class="text-h6" lines="1">
            {{ worksheet.title }}
          </q-item-label>
          <q-item-label caption></q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если вебинаров нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет вебинаров
      </q-banner>
    </div>

    <div v-if="store.meta.last_page > 1" class="q-pa-lg flex flex-center">
      <!-- Пагинация -->
      <q-pagination
        v-if="store.meta"
        v-model="store.currentPage"
        :min="1"
        :max="store.meta.last_page"
        :max-pages="7"
        boundary-numbers
        @update:model-value="handlePageChange"
      />
    </div>

    <!-- Показываем загрузку, пока данные загружаются -->
    <q-inner-loading :showing="store.loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Worksheet } from 'src/models/Worksheet';
import { useWorksheetsStore } from 'stores/worksheets-store';

const router = useRouter();
const store = useWorksheetsStore();

const handlePageChange = (page: number) => {
  store.currentPage = page;
  store.fetchWorksheets();
};

// Метод для просмотра вебинара
const viewWorksheet = (worksheet: Worksheet) => {
  router.push({ name: 'worksheets.edit', params: { id: worksheet.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchWorksheets(); // Загрузка данных
});
</script>
