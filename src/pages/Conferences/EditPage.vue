<template>
  <q-page padding>
    <!-- Заголовок страницы -->
    <q-toolbar>
      <q-toolbar-title>Редактирование мероприятия</q-toolbar-title>
    </q-toolbar>

    <q-banner v-if="conference && conference.deleted_at" inline-actions rounded
              class="bg-primary text-white">
      Мероприятие успешно удалено
      <template v-slot:action>
        <q-btn flat color="white" label="Восстановить" @click="deleteHandler" />
      </template>
    </q-banner>

    <!-- Форма редактирования -->
    <q-form v-else @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <!-- Обложка мероприятия -->
          <upload-file-component
            v-model="form.cover"
            label="Выбрать обложку"
            :error="form.invalid('cover')"
            :error-message="form.errors.cover"
            @change="form.validate('cover')"
          />

          <q-img
            v-if="form.cover"
            :src="form.cover.url"
            spinner-color="white"
            class="q-mb-sm"
            style="height: 10rem; max-width: 10rem"
          />

          <!-- Название мероприятия -->
          <q-input
            v-model="form.title"
            label="Название мероприятия"
            lazy-rules
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @blur="form.validate('title')"
          />

          <!-- Описание мероприятия -->
          <q-input
            v-model="form.description"
            label="Описание мероприятия"
            type="textarea"
            autogrow
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @blur="form.validate('description')"
          />

          <!-- Ссылка на трансляцию -->
          <q-input
            v-model="form.stream_url"
            label="Ссылка на трансляцию"
            :error="form.invalid('stream_url')"
            :error-message="form.errors.stream_url"
            @blur="form.validate('stream_url')"
          />

          <!-- Цена мероприятия -->
          <q-input
            v-model="form.price"
            label="Цена"
            type="number"
            prefix="₽"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @blur="form.validate('price')"
          />

          <!-- Даты мероприятия -->
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="form.start_at"
                label="Дата начала"
                type="datetime-local"
                :error="form.invalid('start_at')"
                :error-message="form.errors.start_at"
                @blur="form.validate('start_at')"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="form.end_at"
                label="Дата окончания"
                type="datetime-local"
                :error="form.invalid('end_at')"
                :error-message="form.errors.end_at"
                @blur="form.validate('end_at')"
              />
            </div>
          </div>

          <upload-file-component
            v-model="form.file"
            label="Выбрать обложку"
            :error="form.invalid('file')"
            :error-message="form.errors.file"
            @change="form.validate('file')"
          />
        </q-card-section>

        <!-- Действия -->
        <q-card-actions align="right">
          <q-btn
            label="Сохранить изменения"
            type="submit"
            color="primary"
            :loading="form.processing"
            icon="save"
          />
          <q-btn
            label="Отмена"
            color="grey-6"
            flat
            @click="cancel"
            icon="close"
          />
          <q-btn flat dense icon="delete" color="red" @click="deleteHandler" />
        </q-card-actions>
      </q-card>
    </q-form>

    <!-- Прелоадер -->
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import { deleteConference, getConferenceById } from 'src/services/conferences';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import type { Conference } from 'src/models/Conference';
import { useStatsStore } from 'stores/stat-store';

const statStore = useStatsStore();
const router = useRouter();
const props = defineProps<{
  id: number;
}>();
const conference = ref<Conference | null>(null);

// Инициализация формы
const form = useForm('patch', () => `/conferences/${props.id}`, {
  cover: undefined as FileModel | undefined,
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  stream_url: '',
  price: '',
  file: undefined as FileModel | undefined,
});

// Состояния
const loading = ref(true);

function formatDateForInput(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}

// Получение данных мероприятия при монтировании
const loadConferenceData = async () => {
  try {
    const { data } = await getConferenceById(props.id);
    if (data.data.start_at) {
      data.data.start_at = formatDateForInput(data.data.start_at);
    }
    if (data.data.end_at) {
      data.data.end_at = formatDateForInput(data.data.end_at);
    }
    conference.value = data.data;
  } catch (e) {
    useNotify('Не удалось загрузить данные мероприятия', 'negative');
    router.push('/conferences'); // Возврат на список вебинаров при ошибке
  } finally {
    loading.value = false;
  }
};

// Отправка формы
const submit = () => {
  loading.value = true;
  form
    .submit()
    .then(() => {
      useNotify('Мероприятие успешно обновлён', 'success');
      router.push('/conferences');
    })
    .catch((reason) => {
      const { response } = reason;
      if (response.status === 422) {
        const { opts } = useValidationNotification(response.data);
        Notify.create(opts.value);
      } else {
        useNotify(response.data.message, 'negative');
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteHandler = async () => {
  if (!conference.value) return;

  loading.value = true;
  try {
    const { data } = await deleteConference(conference.value.id);
    conference.value = data.data;
    await statStore.fetchStats();
  } catch (e) {
    useNotify('Не удалось удалить мероприятие', 'negative');
  } finally {
    loading.value = false;
  }
};

// Отмена редактирования
const cancel = () => {
  router.push('/conferences');
};

watch(conference, () => {
  if (conference.value) {
    form.setData(conference.value);
  }
});

// Загружаем данные при монтировании
onMounted(() => {
  loadConferenceData();
});
</script>
