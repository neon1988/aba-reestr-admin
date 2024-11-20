<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-toolbar-title>Специалисты на проверке</q-toolbar-title>
    </q-toolbar>

    <!-- Список специалистов -->
    <q-list v-if="store.specialists.length > 0">
      <q-item v-for="specialist in store.specialists"
              @click="viewSpecialist(specialist)"
              :key="specialist.id" clickable>
        <q-item-section>
          <q-item-label>{{ specialist.firstname }}</q-item-label>
          <q-item-label caption>{{ specialist.firstname }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет специалистов на проверке
      </q-banner>
    </div>

    <div class="q-pa-lg flex flex-center">
      <!-- Пагинация -->
      <q-pagination
        v-if="store.meta"
        v-model="store.currentPage"
        :min="1"
        :max="store.meta.last_page"
        :max-pages="7"
        boundary-numbers
        @update:model-value="store.fetchSpecialists"
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
import type { Specialist } from 'src/models/Specialist';
import { useSpecialistsStore } from 'src/stores/specialistsStore';

const router = useRouter();
const store = useSpecialistsStore();

// Метод для просмотра специалиста
const viewSpecialist = (specialist: Specialist) => {
  router.push({ name: 'specialists.show', params: { id: specialist.id } }); // Переход на страницу с подробной информацией
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchSpecialists();
});
</script>
