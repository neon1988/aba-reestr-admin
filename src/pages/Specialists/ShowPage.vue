<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)" />
      <q-toolbar-title>Информация о специалисте</q-toolbar-title>
    </q-toolbar>

    <div v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="5rem" color="primary" />
      </q-inner-loading>
    </div>

    <div v-else-if="specialist" class="q-pa-md">

      <q-card bordered>
        <q-card-section avatar v-if="specialist.photo">
          <specialist-photo :specialist="specialist" size="10rem" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">{{ specialist.firstname }} {{ specialist.lastname }}</div>
          <q-chip
            v-if="specialist.status === StatusEnum.Accepted"
            color="green"
            text-color="white"
            icon="check"
          >
            Подтверждён
          </q-chip>
          <q-chip
            v-else-if="specialist.status === StatusEnum.Rejected"
            color="red"
            text-color="white"
            icon="block"
          >
            Отклонён
          </q-chip>
          <q-chip
            v-else-if="specialist.status === StatusEnum.OnReview"
            color="orange"
            text-color="white"
            icon="hourglass_empty"
          >
            На проверке
          </q-chip>
          <div class="q-mt-sm">Телефон: {{ specialist.phone }}</div>
          <div class="q-mt-sm">Дата регистрации: {{ specialist.created_at }}</div>
        </q-card-section>

        <q-card-actions>
          <!-- Кнопка для подтверждения -->
          <q-btn
            label="Подтвердить"
            color="green"
            @click="approveSpecialistHandler"
            v-if="specialist.status != StatusEnum.Accepted && !loading"
          />
          <!-- Кнопка для отклонения -->
          <q-btn
            v-if="specialist.status != StatusEnum.Rejected && !loading"
            label="Отклонить"
            color="red"
            @click="rejectSpecialistHandler"
          />
        </q-card-actions>
      </q-card>
    </div>

    <div v-else class="q-mt-md text-center">
      <q-banner class="bg-negative" rounded>
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
import { StatusEnum } from 'src/enums/StatusEnums';
import SpecialistPhoto from 'components/SpecialistPhoto.vue';

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

// Загружаем данные специалиста при монтировании компонента
onMounted(() => {
  fetchSpecialistHandler(props.id); // Используем id из пропсов
});
</script>
