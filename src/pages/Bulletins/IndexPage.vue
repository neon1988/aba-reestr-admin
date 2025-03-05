<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Объявления</q-toolbar-title>
    </q-toolbar>

    <!-- Фильтр по статусу -->
    <q-card-section class="q-mb-md">
      <q-radio v-if="statStore.bulletinsOnReviewCount > 0" v-model="store.status"
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

    <!-- Список объявлений -->
    <q-list v-if="store.bulletins.length > 0">
      <q-item
        v-for="bulletin in store.bulletins"
        @click="viewBulletin(bulletin)"
        :key="bulletin.id"
        clickable
      >
        <!-- Секция с аватаром -->
        <q-item-section avatar top>
          <user-photo
            v-model="bulletin.creator"
            size="4rem"
            :fullscreen="false"
            :width="256"
            :height="256"
          />
        </q-item-section>

        <!-- Секция с информацией -->
        <q-item-section>
          <q-item-label>
            {{ bulletin.creator.name }} {{ bulletin.creator.lastname }}
            {{ bulletin.creator.middlename }}
          </q-item-label>
          <q-item-label>
            <span v-html="bulletin.text.replace(/\n/g, '<br>')"></span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет объявлений
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
import type { Bulletin } from 'src/models/Bulletin';
import { useBulletinsStore } from 'stores/bulletins-store';
import { StatusEnum } from 'src/enums/StatusEnums';
import { useStatsStore } from 'stores/stat-store';
import UserPhoto from 'components/UserPhoto.vue';

const router = useRouter();
const store = useBulletinsStore();
const statStore = useStatsStore();

// Метод для обновления данных при смене фильтра
const applyFilter = () => {
  store.currentPage = 1;
  store.fetchBulletins();
};

const handlePageChange = (page: number) => {
  store.currentPage = page; // Обновляем текущую страницу
  store.fetchBulletins(); // Передаем фильтры
};

// Метод для просмотра специалиста
const viewBulletin = (bulletin: Bulletin) => {
  router.push({ name: 'bulletins.show', params: { id: bulletin.id } });
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  if (store.bulletins.length === 0) {
    if (statStore.bulletinsOnReviewCount > 0) {
      store.status = StatusEnum.OnReview;
    } else {
      store.status = StatusEnum.Accepted;
    }
  }
  store.fetchBulletins();
});
</script>
