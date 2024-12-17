<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового материала</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <q-file
            label="Выберите файл обложки"
            v-model="cover"
            @update:model-value="uploadCover"
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
            style="height: 10rem; max-width: 10rem"
          />

          <!-- Название материала -->
          <q-input
            v-model="form.title"
            label="Название материала"
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @change="form.validate('title')"
          />

          <!-- Описание материала -->
          <q-input
            v-model="form.description"
            label="Описание материала"
            type="textarea"
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @change="form.validate('description')"
          />

          <!-- Описание материала -->
          <q-input
            v-model="form.price"
            label="Цена"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @change="form.validate('price')"
          />

          <q-file
            label="Выберите файл записи"
            v-model="file"
            @update:model-value="uploadFile"
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

        <q-card-actions>
          <!-- Кнопка отправки -->
          <q-btn label="Создать материал" type="submit" color="primary"
                 :disabled="form.processing"/>
          <q-btn label="Отмена" color="secondary" @click="cancel"/>
        </q-card-actions>
      </q-card>
    </q-form>

    <!-- Показываем загрузку -->
    <q-inner-loading :showing="form.processing">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import { createImage } from 'src/services/images';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import { createFile } from 'src/services/files';

const router = useRouter();
// const store = useWebinarsStore();

// Инициализация формы с помощью useForm
const form = useForm('post', '/worksheets', {
  title: '',
  description: '',
  cover: '',
  price: '',
  file: '',
});

const loading = ref(false);
const cover = ref<File | null>(null);
const file = ref<File | null>(null);
const previewCover = ref<{ 'path': string, 'url': string } | null>(null);
const previewFile = ref<{ 'path': string, 'url': string } | null>(null);

const uploadCover = async () => {
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

const uploadFile = async () => {
  if (!file.value) return;
  loading.value = true;
  try {
    const response = await createFile(file.value);
    previewFile.value = response.data;
    form.file = response.data.path;
    useNotify('Файл успешно загружен', 'success');
  } finally {
    loading.value = false;
  }
};

// Метод для отправки формы
const submit = () => {
  form.submit().then(() => {
    useNotify('Материал успешно создан', 'success');
    router.push('/worksheets'); // Перенаправление на список материалов
  }).catch((reason) => {
    const { response } = reason;
    if (response.status === 422) {
      const { opts } = useValidationNotification(response.data);
      Notify.create(opts.value);
    } else {
      useNotify(response.data.message, 'negative');
    }
  });
};

// Отмена создания материала, возвращаемся к списку
const cancel = () => {
  router.push('/worksheets');
};
</script>
