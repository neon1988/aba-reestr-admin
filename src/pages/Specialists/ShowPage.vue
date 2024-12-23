<template>
  <q-page v-if="specialist" padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)" />
      <q-toolbar-title>Информация о специалисте</q-toolbar-title>
    </q-toolbar>

      <specialist-photo
        :specialist="specialist"
        :fullscreen="true"
        size="14rem"
        :width="224"
        :height="224"
        class="q-mb-md cursor-pointer"
      />

      <q-card bordered>

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
          <div class="q-mt-sm">
            Дата регистрации:
            <date-time :raw-date="specialist.created_at" />
          </div>
          <div v-if="specialist.files" class="q-mt-sm">
            Документы:
            <files-list :files="specialist.files" />
          </div>
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

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary" />
    </q-inner-loading>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import type { Specialist } from 'src/models/Specialist';
import { approveSpecialist, getSpecialistById, rejectSpecialist } from 'src/services/specialists';
import { StatusEnum } from 'src/enums/StatusEnums';
import SpecialistPhoto from 'components/SpecialistPhoto.vue';
import DateTime from 'components/DateTime.vue';
import { useStatsStore } from 'stores/stat-store';
import FilesList from 'components/FilesList.vue';

// Определение пропсов
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const $q = useQuasar();
const router = useRouter();
const statStore = useStatsStore();

// Состояние для загрузки и данных
const loading = ref(false);
const specialist = ref<Specialist | null>(null);

// Функция для загрузки данных о специалисте
const fetchSpecialistHandler = async () => {
  loading.value = true;
  try {
    const response = await getSpecialistById(props.id);
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
    await statStore.fetchStats();
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
    await statStore.fetchStats();
  } finally {
    loading.value = false;
  }
};

// Загружаем данные специалиста при монтировании компонента
onMounted(() => {
  fetchSpecialistHandler(); // Используем id из пропсов
});
</script>
