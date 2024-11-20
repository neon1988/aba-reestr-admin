<template>
  <q-page class="q-pa-md">
    <div v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="5rem" color="primary" />
      </q-inner-loading>
    </div>

    <div v-else-if="center">
      <!-- Заголовок -->
      <q-toolbar>
        <q-toolbar-title>{{ center.name }} - Центр</q-toolbar-title>
      </q-toolbar>

      <!-- Фотография центра -->
      <div v-if="center.photo" class="q-mb-md">
        <q-img :src="center.photo.url" alt="Фото центра" class="q-mb-md"/>
      </div>

      <!-- Информация о центре -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
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

      <!-- Статус и дата изменения статуса -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
          <div class="text-h6">Статус центра</div>
          <q-separator class="q-my-sm"/>
          <div v-if="center.status !== null"><strong>Статус:</strong> {{ center.status }}</div>
          <div v-if="center.status_changed_at">
            <strong>Дата изменения статуса:</strong> {{ center.status_changed_at }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Дата создания и обновления -->
      <q-card class="q-mb-md" bordered>
        <q-card-section>
          <div class="text-h6">Дата создания и обновления</div>
          <q-separator class="q-my-sm"/>
          <div><strong>Создано:</strong> {{ center?.created_at }}</div>
          <div><strong>Обновлено:</strong> {{ center?.updated_at }}</div>
        </q-card-section>
      </q-card>

      <q-card-actions>
        <!-- Кнопка для подтверждения -->
        <q-btn
          label="Подтвердить"
          color="green"
          @click="approveCenterHandler"
          :disabled="center.status == 0 || loading"
        />
        <!-- Кнопка для отклонения -->
        <q-btn
          label="Отклонить"
          color="red"
          @click="rejectCenterHandler"
          :disabled="center.status == 1 || loading"
        />
        <q-btn flat label="Назад" @click="goBack"/>
      </q-card-actions>
    </div>

    <div v-else class="q-mt-md text-center">
      <q-banner class="bg-grey-3 text-grey-8">
        Центр не найден
      </q-banner>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import type { Center } from 'src/models/Center';
import { approveCenter, getCenterById, rejectCenter } from 'src/services/centers';

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
const center = ref<Center | null>(null);

// Функция для загрузки данных о специалисте
const fetchCenterHandler = async (id: string) => {
  loading.value = true;
  try {
    const response = await getCenterById(id);
    center.value = response.data.data as Center; // Данные специалиста от Laravel Resource
  } finally {
    loading.value = false;
  }
};

// Функция для подтверждения специалиста
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
  } finally {
    loading.value = false;
  }
};

// Функция для отклонения специалиста
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
  fetchCenterHandler(props.id);
});
</script>
