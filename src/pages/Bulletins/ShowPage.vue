<template>
  <q-page v-if="bulletin" padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)" />
      <q-toolbar-title>Объявление</q-toolbar-title>
    </q-toolbar>

      <user-photo
        :user="bulletin.creator"
        :fullscreen="true"
        size="6rem"
        :width="224"
        :height="224"
        class="q-mb-md cursor-pointer"
      />

      <q-card bordered>

        <q-card-section>
          <q-chip
            v-if="bulletin.status === StatusEnum.Accepted"
            color="green"
            text-color="white"
            icon="check"
          >
            Подтверждёно
          </q-chip>
          <q-chip
            v-else-if="bulletin.status === StatusEnum.Rejected"
            color="red"
            text-color="white"
            icon="block"
          >
            Отклонёно
          </q-chip>
          <q-chip
            v-else-if="bulletin.status === StatusEnum.OnReview"
            color="orange"
            text-color="white"
            icon="hourglass_empty"
          >
            На проверке
          </q-chip>
        </q-card-section>

        <q-card-section>
          <div v-html="bulletin.text.replace(/\n/g, '<br>')"></div>
        </q-card-section>

        <q-card-actions>
          <!-- Кнопка для подтверждения -->
          <q-btn
            label="Подтвердить"
            color="green"
            @click="approveBulletinHandler"
            v-if="bulletin.status != StatusEnum.Accepted && !loading"
          />
          <!-- Кнопка для отклонения -->
          <q-btn
            v-if="bulletin.status != StatusEnum.Rejected && !loading"
            label="Отклонить"
            color="red"
            @click="rejectBulletinHandler"
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

import type { Bulletin } from 'src/models/Bulletin';
import { approveBulletin, getBulletinById, rejectBulletin } from 'src/services/bulletins';
import { StatusEnum } from 'src/enums/StatusEnums';
import { useStatsStore } from 'stores/stat-store';
import UserPhoto from 'components/UserPhoto.vue';

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
const bulletin = ref<Bulletin | null>(null);

// Функция для загрузки данных о специалисте
const fetchBulletinHandler = async (id: string) => {
  loading.value = true;
  try {
    const response = await getBulletinById(id);
    bulletin.value = response.data.data as Bulletin; // Данные специалиста от Laravel Resource
  } finally {
    loading.value = false;
  }
};

// Функция для подтверждения специалиста
const approveBulletinHandler = async () => {
  if (!bulletin.value) return;

  loading.value = true;
  try {
    const response = await approveBulletin(bulletin.value.id);
    bulletin.value = response.data.bulletin;
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
const rejectBulletinHandler = async () => {
  if (!bulletin.value) return;

  loading.value = true;
  try {
    const response = await rejectBulletin(bulletin.value.id);
    bulletin.value = response.data.bulletin;
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
  fetchBulletinHandler(props.id); // Используем id из пропсов
});
</script>
