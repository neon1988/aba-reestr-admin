<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Мероприятия</q-toolbar-title>
    </q-toolbar>

    <q-card-section>
      <q-btn label="Создать мероприятие" color="green"
             :to="{ name: 'conferences.create' }" />
    </q-card-section>

    <!-- Фильтр по статусу (предстоящие и завершенные) -->
    <q-card-section>
      <q-radio v-model="status"
               val="Upcoming"
               label="Предстоящие"
               @update:model-value="applyFilter"/>
      <q-radio v-model="status"
               val="Ended"
               label="Завершенные"
               @update:model-value="applyFilter"/>
    </q-card-section>

    <!-- Список мероприятий -->
    <q-list v-if="store.conferences.length > 0">
      <q-item
        v-for="conference in store.conferences"
        @click="viewConference(conference)"
        :key="conference.id"
        clickable
      >
        <q-item-section avatar>
          <image-component
            v-if="conference.cover"
            :url="conference.cover.url"
            alt="cover"
            :max-width="50"
            :max-height="50" />
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label class="text-h6" lines="1">
            {{ conference.title }}
          </q-item-label>
          <q-item-label v-if="conference.start_at" caption>
            Дата начала: <date-time :raw-date="conference.start_at" />
          </q-item-label>
          <q-item-label v-if="conference.end_at" caption>
            Дата окончания: <date-time :raw-date="conference.end_at" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если мероприятий нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет мероприятий
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
import type { Conference } from 'src/models/Conference';
import { useConferencesStore } from 'stores/conferences-store';
import DateTime from 'components/DateTime.vue';
import ImageComponent from 'components/ImageComponent.vue'; // Используем store для мероприятий

const router = useRouter();
const store = useConferencesStore();
const status = ref('Upcoming');

const fetchConferences = () => {
  if (status.value === 'Upcoming') {
    store.fetchUpcomingConferences();
  } else if (status.value === 'Ended') {
    store.fetchEndedConferences();
  }
};

// Метод для обновления данных при смене фильтра
const applyFilter = () => {
  store.currentPage = 1;
  fetchConferences();
};

const handlePageChange = (page: number) => {
  store.currentPage = page;
  fetchConferences();
};

// Метод для просмотра мероприятий
const viewConference = (conference: Conference) => {
  router.push({ name: 'conferences.edit', params: { id: conference.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchConferences(); // Загрузка данных
});
</script>
