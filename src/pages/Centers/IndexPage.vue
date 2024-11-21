<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Центры</q-toolbar-title>
    </q-toolbar>

    <!-- Фильтр по статусу -->
    <q-card-section class="q-mb-md">
      <q-radio v-model="store.status" :val="StatusEnum.OnReview"
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
    <q-list v-if="store.centers.length > 0">
      <q-item
        v-for="center in store.centers"
        @click="viewCenter(center)"
        :key="center.id"
        clickable
      >
        <!-- Секция с аватаром -->
        <q-item-section avatar>
          <center-photo :center="center" size="4rem"/>
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label class="text-h6" lines="1">
            {{ center.name }}
          </q-item-label>
          <q-item-label caption>
            {{ center.legal_name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет центров
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
    <q-inner-loading v-if="store.loading" :showing="store.loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Center } from 'src/models/Center';
import { useCentersStore } from 'src/stores/centersStore';
import { StatusEnum } from 'src/enums/StatusEnums';
import CenterPhoto from 'components/CenterPhoto.vue';

const router = useRouter();
const store = useCentersStore();

// Метод для обновления данных при смене фильтра
const applyFilter = () => {
  store.currentPage = 1;
  store.fetchCenters();
};

const handlePageChange = (page: number) => {
  store.currentPage = page; // Обновляем текущую страницу
  store.fetchCenters(); // Передаем фильтры
};

// Метод для просмотра специалиста
const viewCenter = (center: Center) => {
  router.push({ name: 'centers.show', params: { id: center.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchCenters();
});
</script>
