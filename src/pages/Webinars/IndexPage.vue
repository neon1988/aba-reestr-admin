<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Вебинары</q-toolbar-title>
    </q-toolbar>

    <q-card-section class="q-mb-md">
      <q-btn label="Создать вебинар" color="green" flat
             :to="{ name: 'webinars.create' }" />
    </q-card-section>

    <!-- Фильтр по статусу (предстоящие и завершенные) -->
    <q-card-section class="q-mb-md">
      <q-radio v-model="status"
               val="Upcoming"
               label="Предстоящие"
               @update:model-value="applyFilter"/>
      <q-radio v-model="status"
               val="Ended"
               label="Завершенные"
               @update:model-value="applyFilter"/>
    </q-card-section>

    <!-- Список вебинаров -->
    <q-list v-if="store.webinars.length > 0">
      <q-item
        v-for="webinar in store.webinars"
        @click="viewWebinar(webinar)"
        :key="webinar.id"
        clickable
      >
        <!-- Секция с аватаром -->
        <q-item-section avatar>
          <q-img v-if="webinar.cover"
                 :src="webinar.cover.url" alt="cover" width="50px" height="50px"/>
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label class="text-h6" lines="1">
            {{ webinar.title }}
          </q-item-label>
          <q-item-label caption>
            {{ webinar.start_at }}
          </q-item-label>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Webinar } from 'src/models/Webinar';
import { useWebinarsStore } from 'stores/webinars-store'; // Используем store для вебинаров

const router = useRouter();
const store = useWebinarsStore();
const status = ref('Upcoming');

const fetchWebinars = () => {
  if (status.value === 'Upcoming') {
    store.fetchUpcomingWebinars();
  } else if (status.value === 'Ended') {
    store.fetchEndedWebinars();
  }
};

// Метод для обновления данных при смене фильтра
const applyFilter = () => {
  store.currentPage = 1;
  fetchWebinars();
};

const handlePageChange = (page: number) => {
  store.currentPage = page;
  fetchWebinars();
};

// Метод для просмотра вебинара
const viewWebinar = (webinar: Webinar) => {
  router.push({ name: 'webinars.show', params: { id: webinar.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchWebinars(); // Загрузка данных
});
</script>
