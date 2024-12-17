<template>
  <q-page padding>
    <!-- Заголовок страницы -->
    <q-toolbar>
      <q-toolbar-title>Редактирование вебинара</q-toolbar-title>
    </q-toolbar>

    <!-- Форма редактирования -->
    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <!-- Обложка вебинара -->
          <q-file
            label="Выберите файл обложки"
            v-model="cover"
            @update:model-value="uploadFile"
            filled
            color="primary"
            :error="form.invalid('cover')"
            :error-message="form.errors.cover"
            @change="form.validate('cover')"
          />

          <q-img
            v-if="previewCover"
            :src="previewCover.url"
            spinner-color="white"
            class="q-mt-md"
            style="height: 140px; max-width: 150px; border: 1px solid #ddd;"
          />

          <!-- Название вебинара -->
          <q-input
            v-model="form.title"
            label="Название вебинара"
            lazy-rules
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @blur="form.validate('title')"
          />

          <!-- Описание вебинара -->
          <q-input
            v-model="form.description"
            label="Описание вебинара"
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

          <!-- Цена вебинара -->
          <q-input
            v-model="form.price"
            label="Цена"
            type="number"
            prefix="₽"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @blur="form.validate('price')"
          />

          <!-- Даты вебинара -->
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

          <q-file
            label="Выберите файл записи"
            v-model="record"
            @update:model-value="uploadRecordFile"
            filled
            color="primary"
            :error="form.invalid('record_file')"
            :error-message="form.errors.record_file"
            @change="form.validate('record_file')"
          />

          <q-video v-if="previewRecordFile"
                   spinner-color="white"
                   class="q-mt-md"
                   :src="previewRecordFile.url"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import { createImage } from 'src/services/images';
import { getWebinarById } from 'src/services/webinars';
import { createFile } from 'src/services/files';

const router = useRouter();
const props = defineProps<{
  id: number;
}>();

// Инициализация формы
const form = useForm('patch', `/webinars/${props.id}`, {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: '',
  stream_url: '',
  price: '',
  record_file: '',
});

// Состояния
const loading = ref(true);
const cover = ref<File | null>(null);
const previewCover = ref<{ path: string; url: string } | null>(null);
const record = ref<File | null>(null);
const previewRecordFile = ref<{ path: string; url: string } | null>(null);

function formatDateForInput(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}

// Получение данных вебинара при монтировании
const loadWebinarData = async () => {
  try {
    const { data } = await getWebinarById(props.id);
    if (data.data.start_at) {
      data.data.start_at = formatDateForInput(data.data.start_at);
    }
    if (data.data.end_at) {
      data.data.end_at = formatDateForInput(data.data.end_at);
    }
    if (data.data.cover) {
      previewCover.value = data.data.cover;
      data.data.cover = null;
    }
    if (data.data.record_file) {
      previewRecordFile.value = data.data.record_file;
      data.data.record_file = null;
    }
    form.setData(data.data);
  } catch (e) {
    useNotify('Не удалось загрузить данные вебинара', 'negative');
    router.push('/webinars'); // Возврат на список вебинаров при ошибке
  } finally {
    loading.value = false;
  }
};

// Загрузка обложки
const uploadFile = async () => {
  if (!cover.value) return;
  loading.value = true;
  try {
    const response = await createImage(cover.value);
    previewCover.value = response.data;
    form.cover = response.data.path;
    useNotify('Обложка успешно загружена', 'success');
  } finally {
    loading.value = false;
  }
};

const uploadRecordFile = async () => {
  if (!record.value) return;
  loading.value = true;
  try {
    const response = await createFile(record.value);
    previewRecordFile.value = response.data;
    form.record_file = response.data.path;
    useNotify('Файл записи успешно загружен', 'success');
  } finally {
    loading.value = false;
  }
};

// Отправка формы
const submit = () => {
  form
    .submit()
    .then(() => {
      useNotify('Вебинар успешно обновлён', 'success');
      router.push('/webinars');
    })
    .catch((reason) => {
      const { response } = reason;
      if (response.status === 422) {
        const { opts } = useValidationNotification(response.data);
        Notify.create(opts.value);
      } else {
        useNotify(response.data.message, 'negative');
      }
    });
};

// Отмена редактирования
const cancel = () => {
  router.push('/webinars');
};

// Загружаем данные при монтировании
onMounted(() => {
  loadWebinarData();
});
</script>
