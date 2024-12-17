<template>
  <q-page padding>
    <!-- Заголовок страницы -->
    <q-toolbar>
      <q-toolbar-title>Редактирование материала</q-toolbar-title>
    </q-toolbar>

    <!-- Форма редактирования -->
    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <!-- Обложка материала -->
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
            class="q-mb-sm"
            style="height: 10rem; max-width: 10rem;"
          />

          <!-- Название материала -->
          <q-input
            v-model="form.title"
            label="Название материала"
            lazy-rules
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @blur="form.validate('title')"
          />

          <!-- Описание материала -->
          <q-input
            v-model="form.description"
            label="Описание материала"
            type="textarea"
            autogrow
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @blur="form.validate('description')"
          />

          <!-- Цена материала -->
          <q-input
            v-model="form.price"
            label="Цена"
            type="number"
            prefix="₽"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @blur="form.validate('price')"
          />

          <q-file
            label="Выберите файл"
            v-model="file"
            @update:model-value="uploadRecordFile"
            filled
            color="primary"
            :error="form.invalid('file')"
            :error-message="form.errors.file"
            @change="form.validate('file')"
          />

          <q-video v-if="previewFile"
                   spinner-color="white"
                   :src="previewFile.url"
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
import { getWorksheetById } from 'src/services/worksheets';
import { createFile } from 'src/services/files';

const router = useRouter();
const props = defineProps<{
  id: number;
}>();

// Инициализация формы
const form = useForm('patch', `/worksheets/${props.id}`, {
  cover: '',
  title: '',
  description: '',
  price: '',
  file: '',
});

// Состояния
const loading = ref(true);
const cover = ref<File | null>(null);
const previewCover = ref<{ path: string; url: string } | null>(null);
const file = ref<File | null>(null);
const previewFile = ref<{ path: string; url: string } | null>(null);

// Получение данных материала при монтировании
const loadWorksheetData = async () => {
  try {
    const { data } = await getWorksheetById(props.id);
    if (data.data.cover) {
      previewCover.value = data.data.cover;
      data.data.cover = null;
    }
    if (data.data.file) {
      previewFile.value = data.data.file;
      data.data.file = null;
    }
    form.setData(data.data);
  } catch (e) {
    useNotify('Не удалось загрузить данные материала', 'negative');
    router.push('/worksheets'); // Возврат на список материалов при ошибке
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
  if (!file.value) return;
  loading.value = true;
  try {
    const response = await createFile(file.value);
    previewFile.value = response.data;
    form.file = response.data.path;
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
      useNotify('Материал успешно обновлён', 'success');
      router.push('/worksheets');
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
  router.push('/worksheets');
};

// Загружаем данные при монтировании
onMounted(() => {
  loadWorksheetData();
});
</script>
