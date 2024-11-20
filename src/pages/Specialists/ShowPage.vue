<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-toolbar-title>Информация о специалисте</q-toolbar-title>
    </q-toolbar>

    <div v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="5rem" color="primary" />
      </q-inner-loading>
    </div>

    <div v-else-if="specialist" class="q-pa-md">
      <q-chip
        v-if="specialist.status === 0"
        color="green"
        text-color="white"
        icon="check"
      >
        Подтверждён
      </q-chip>
      <q-chip
        v-else-if="specialist.status === 2"
        color="red"
        text-color="white"
        icon="block"
      >
        Отклонён
      </q-chip>
      <q-chip
        v-else-if="specialist.status === 1"
        color="orange"
        text-color="white"
        icon="hourglass_empty"
      >
        На модерации
      </q-chip>

      <q-card bordered>
        <q-card-section>
          <div class="text-h6">{{ specialist.firstname }} {{ specialist.lastname }}</div>
          <div class="q-mt-sm">Телефон: {{ specialist.phone }}</div>
          <div class="q-mt-sm">Статус: {{ specialist.status }}</div>
          <div class="q-mt-sm">Дата регистрации: {{ specialist.created_at }}</div>
        </q-card-section>

        <q-card-actions>
          <!-- Кнопка для подтверждения -->
          <q-btn
            label="Подтвердить"
            color="green"
            @click="approveSpecialistHandler"
            :disabled="specialist.status == 0 || loading"
          />
          <!-- Кнопка для отклонения -->
          <q-btn
            label="Отклонить"
            color="red"
            @click="rejectSpecialistHandler"
            :disabled="specialist.status == 1 || loading"
          />
          <q-btn flat label="Назад" @click="goBack" />
        </q-card-actions>
      </q-card>
    </div>

    <div v-else class="q-mt-md text-center">
      <q-banner class="bg-grey-3 text-grey-8">
        Специалист не найден
      </q-banner>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import type { Specialist } from 'src/models/Specialist';
import { approveSpecialist, getSpecialistById, rejectSpecialist } from 'src/services/specialists';

// Определение пропсов
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const router = useRouter();

// Состояние для загрузки и данных
const loading = ref(false);
const specialist = ref<Specialist | null>(null);

// Функция для загрузки данных о специалисте
const fetchSpecialistHandler = async (id: string) => {
  loading.value = true;
  try {
    const response = await getSpecialistById(id);
    specialist.value = response.data.data as Specialist; // Данные специалиста от Laravel Resource
  } finally {
    loading.value = false;
  }
};

// Функция для подтверждения специалиста
const approveSpecialistHandler = async () => {
  if (!specialist.value) return;

  loading.value = true;
  try {
    const response = await approveSpecialist(specialist.value.id);
    specialist.value = response.data.specialist;
    $q.notify({
      message: response.data.message,
      color: 'positive',
      position: 'top',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

// Функция для отклонения специалиста
const rejectSpecialistHandler = async () => {
  if (!specialist.value) return;

  loading.value = true;
  try {
    const response = await rejectSpecialist(specialist.value.id);
    specialist.value = response.data.specialist;
    $q.notify({
      message: response.data.message,
      color: 'positive',
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
  fetchSpecialistHandler(props.id); // Используем id из пропсов
});
</script>
