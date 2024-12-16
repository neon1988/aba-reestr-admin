<template>
  <q-page v-if="bulletin" padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)"/>
      <q-toolbar-title>Объявление</q-toolbar-title>
    </q-toolbar>

    <q-card bordered>
      <q-card-section>
        <user-photo
          :user="bulletin.creator"
          :fullscreen="true"
          size="6rem"
          :width="224"
          :height="224"
          class="cursor-pointer"
        />
      </q-card-section>
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
        <q-input filled v-model="bulletin.text"
                 :readonly="!isEditing"
                 autogrow
                 type="textarea"/>
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="Подтвердить"
          color="green"
          @click="approveBulletinHandler"
          v-if="bulletin.status != StatusEnum.Accepted && !loading && !isEditing"
        />
        <q-btn
          v-if="bulletin.status != StatusEnum.Rejected && !loading && !isEditing"
          label="Отклонить"
          color="red"
          @click="rejectBulletinHandler"
        />
        <q-btn
          v-if="!loading && !isEditing"
          label="Редактировать"
          color="blue"
          @click="isEditing = true"
        />
        <q-btn
          v-if="!loading && isEditing"
          label="Сохранить"
          color="blue"
          @click="saveEditedBulletin"
        />
      </q-card-actions>
    </q-card>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import type { Bulletin } from 'src/models/Bulletin';
import {
  approveBulletin,
  getBulletinById,
  rejectBulletin,
  updateBulletin,
} from 'src/services/bulletins';
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

const loading = ref(false);
const bulletin = ref<Bulletin | null>(null);
const isEditing = ref(false); // Для управления модальным окном

const saveEditedBulletin = async () => {
  if (!bulletin.value) return;

  loading.value = true;
  try {
    const response = await updateBulletin(bulletin.value.id, { text: bulletin.value.text });
    bulletin.value = response.data.bulletin;
    isEditing.value = false;

    $q.notify({
      message: 'Объявление успешно обновлено!',
      color: 'positive',
      position: 'top',
      timeout: 3000,
    });
  } catch (error) {
    $q.notify({
      message: 'Ошибка при обновлении объявления!',
      color: 'negative',
      position: 'top',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

// Загрузка объявления
const fetchBulletinHandler = async (id: string) => {
  loading.value = true;
  try {
    const response = await getBulletinById(id);
    bulletin.value = response.data.data as Bulletin;
  } finally {
    loading.value = false;
  }
};

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

onMounted(() => {
  fetchBulletinHandler(props.id);
});
</script>
