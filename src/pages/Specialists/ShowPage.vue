<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Информация о специалисте</q-toolbar-title>
    </q-toolbar>

    <div v-if="loading" class="q-mt-md text-center">
      <q-spinner color="primary" />
    </div>

    <div v-else-if="specialist" class="q-pa-md">
      <q-card bordered>
        <q-card-section>
          <div class="text-h6">{{ specialist.firstname }} {{ specialist.lastname }}</div>
          <div class="q-mt-sm">Телефон: {{ specialist.phone }}</div>
          <div class="q-mt-sm">Статус: {{ specialist.status }}</div>
          <div class="q-mt-sm">Дата регистрации: {{ specialist.created_at }}</div>
          <div class="q-mt-sm">Страна: {{ specialist.country }}</div>
          <div class="q-mt-sm">Город: {{ specialist.city }}</div>
          <div class="q-mt-sm">Образование: {{ specialist.education }}</div>
          <div class="q-mt-sm">Регион: {{ specialist.region || 'Не указан' }}</div>
          <div class="q-mt-sm">Доступность: {{ specialist.is_available }}</div>
          <div v-if="specialist.center_id" class="q-mt-sm">Центр: {{ specialist.center_id }}</div>

        </q-card-section>

        <q-card-actions>
          <q-btn flat label="Назад" @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Если специалист не найден -->
    <div v-else class="q-mt-md text-center">
      <q-banner class="bg-grey-3 text-grey-8">
        Специалист не найден
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import type { Specialist } from 'src/models/Specialist';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Состояние для загрузки и данных
const loading = ref(true);
const specialist = ref<Specialist | null>(null);

// Функция для загрузки данных о специалисте
const fetchSpecialist = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost/specialists/${id}`); // Путь к вашему API
    specialist.value = response.data.data; // Данные специалиста от Laravel Resource
  } catch (error) {
    $q.notify({
      message: `Ошибка при загрузке данных специалиста: ${error}`,
      color: 'negative',
      position: 'top',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

// Возвращаемся на предыдущую страницу
const goBack = () => {
  router.go(-1);
};

// Загружаем данные специалиста при монтировании компонента
onMounted(() => {
  const specialistId = route.params.id as string;
  fetchSpecialist(specialistId);
});
</script>
