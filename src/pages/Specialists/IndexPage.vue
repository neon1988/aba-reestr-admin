<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Специалисты</q-toolbar-title>
    </q-toolbar>

    <!-- Фильтр по статусу -->
    <q-card-section class="q-mb-md">
      <q-radio v-if="statStore.specialistsOnReviewCount > 0" v-model="store.status"
               :val="StatusEnum.OnReview"
               label="На проверке"
               @update:model-value="applyFilter"/>
      <q-radio v-model="store.status" :val="StatusEnum.Accepted"
               label="Проверенные"
               @update:model-value="applyFilter"/>
      <q-radio v-model="store.status" :val="StatusEnum.Rejected"
               label="Отклоненные"
               @update:model-value="applyFilter"/>
    </q-card-section>

    <!-- Список специалистов -->
    <q-list v-if="store.specialists.length > 0">
      <q-item
        v-for="specialist in store.specialists"
        @click="viewSpecialist(specialist)"
        :key="specialist.id"
        clickable
      >
        <!-- Секция с аватаром -->
        <q-item-section avatar>
          <q-avatar size="3rem">
            <image-component
              v-if="specialist.photo?.url"
              :alt="`${specialist.name || 'Пользователь'}'s avatar`"
              :url="specialist.photo?.url"
              :max-width="200"
              :max-height="200"
            />
          </q-avatar>
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label class="text-h6" lines="1">
            {{ specialist.name }} {{ specialist.lastname }}
          </q-item-label>
          <q-item-label caption>
            {{ specialist.middlename }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет специалистов
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
import type { Specialist } from 'src/models/Specialist';
import { useSpecialistsStore } from 'stores/specialists-store';
import { StatusEnum } from 'src/enums/StatusEnums';
import { useStatsStore } from 'stores/stat-store';
import ImageComponent from 'components/ImageComponent.vue';

const router = useRouter();
const store = useSpecialistsStore();
const statStore = useStatsStore();

// Метод для обновления данных при смене фильтра
const applyFilter = () => {
  store.currentPage = 1;
  store.fetchSpecialists();
};

const handlePageChange = (page: number) => {
  store.currentPage = page; // Обновляем текущую страницу
  store.fetchSpecialists(); // Передаем фильтры
};

// Метод для просмотра специалиста
const viewSpecialist = (specialist: Specialist) => {
  router.push({ name: 'specialists.edit', params: { id: specialist.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  if (store.specialists.length === 0) {
    if (statStore.specialistsOnReviewCount > 0) {
      store.status = StatusEnum.OnReview;
    } else {
      store.status = StatusEnum.Accepted;
    }
  }
  store.fetchSpecialists();
});
</script>
