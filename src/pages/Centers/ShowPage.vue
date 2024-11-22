<template>
  <q-page padding>

    <div v-if="center">
      <!-- Заголовок -->
      <q-toolbar class="q-mb-md">
        <q-btn flat icon="arrow_back" @click="goBack" class="q-mr-md"/>
        <q-toolbar-title>{{ center.name }} - Центр</q-toolbar-title>
      </q-toolbar>

      <!-- Фотография центра -->
      <div v-if="center.photo" class="q-mb-md text-center">
        <q-img :src="center.photo?.url" alt="Фото центра"
               class="q-mb-md"
               style="border-radius: 8px; max-height: 250px; object-fit: cover;"/>
      </div>

      <!-- Информация о центре -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
          <q-chip
            v-if="center.status === StatusEnum.Accepted"
            color="green"
            text-color="white"
            icon="check"
          >
            Подтверждён
          </q-chip>
          <q-chip
            v-else-if="center.status === StatusEnum.Rejected"
            color="red"
            text-color="white"
            icon="block"
          >
            Отклонён
          </q-chip>
          <q-chip
            v-else-if="center.status === StatusEnum.OnReview"
            color="orange"
            text-color="white"
            icon="hourglass_empty"
          >
            На проверке
          </q-chip>
          <div class="text-h6">Основная информация</div>
          <q-separator class="q-my-sm"/>
          <div><strong>Юридическое название:</strong> {{ center.legal_name }}</div>
          <div><strong>ИНН:</strong> {{ center.inn }}</div>
          <div v-if="center.kpp"><strong>КПП:</strong> {{ center.kpp }}</div>
          <div><strong>Страна:</strong> {{ center.country }}</div>
          <div v-if="center.region"><strong>Регион:</strong> {{ center.region }}</div>
          <div><strong>Город:</strong> {{ center.city }}</div>
        </q-card-section>
      </q-card>

      <!-- Контактные данные -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
          <div class="text-h6">Контактная информация</div>
          <q-separator class="q-my-sm"/>
          <div><strong>Телефон:</strong> {{ center.phone }}</div>
          <div v-if="center.services"><strong>Услуги:</strong> {{ center.services }}</div>
          <div v-if="center.intensives"><strong>Интенсивы:</strong> {{ center.intensives }}</div>
        </q-card-section>
      </q-card>

      <!-- Дата создания и обновления -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
          <div class="text-h6">Дата создания и обновления</div>
          <q-separator class="q-my-sm"/>
          <div><strong>Создано:</strong>&nbsp;
            <date-time :raw-date="center.created_at"/>
          </div>
          <div><strong>Обновлено:</strong>&nbsp;
            <date-time :raw-date="center.updated_at"/>
          </div>
        </q-card-section>
      </q-card>

      <div v-if="center.files" class="q-mt-sm">
        Документы:
        <files-list :files="center.files" />
      </div>

      <q-card-actions>
        <!-- Кнопка для подтверждения -->
        <q-btn
          label="Подтвердить"
          color="green"
          @click="approveCenterHandler"
          v-if="center.status != StatusEnum.Accepted && !loading"
        />
        <!-- Кнопка для отклонения -->
        <q-btn
          v-if="center.status != StatusEnum.Rejected && !loading"
          label="Отклонить"
          color="red"
          @click="rejectCenterHandler"
        />
      </q-card-actions>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import type { Center } from 'src/models/Center';
import { approveCenter, getCenterById, rejectCenter } from 'src/services/centers';
import { StatusEnum } from 'src/enums/StatusEnums';
import DateTime from 'components/DateTime.vue';
import { useStatsStore } from 'stores/stat-store';
import FilesList from 'components/FilesList.vue';

// Определение пропсов
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const router = useRouter();
const statStore = useStatsStore();

// Состояние для загрузки и данных
const loading = ref(false);
const center = ref<Center | null>(null);

// Функция для загрузки данных о центре
const fetchCenterHandler = async (id: string) => {
  loading.value = true;
  try {
    const response = await getCenterById(id);
    center.value = response.data.data as Center;
  } finally {
    loading.value = false;
  }
};

// Функция для подтверждения центра
const approveCenterHandler = async () => {
  if (!center.value) return;

  loading.value = true;
  try {
    const response = await approveCenter(center.value.id);
    center.value = response.data.center as Center;
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

// Функция для отклонения центра
const rejectCenterHandler = async () => {
  if (!center.value) return;

  loading.value = true;
  try {
    const response = await rejectCenter(center.value.id);
    center.value = response.data.center as Center;
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

// Возвращаемся на предыдущую страницу
const goBack = () => {
  router.go(-1);
};

// Загружаем данные центра при монтировании компонента
onMounted(() => {
  fetchCenterHandler(props.id);
});
</script>
