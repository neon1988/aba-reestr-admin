<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового материала</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <upload-file-component
            v-model="form.cover"
            label="Выбрать обложку"
            :error="form.invalid('cover')"
            :error-message="form.errors.cover"
            @change="form.validate('cover')"
          />

          <image-component
            v-if="form.cover"
            :url="form.cover.url"
            spinner-color="white"
            class="q-mb-sm"
            :max-width="200"
            :max-height="200" />

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

          <tag-input
            v-model="form.tags"
            label="Выберите теги"
          />

          <upload-file-component
            v-model="form.file"
            label="Выбрать файл"
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
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import TagInput from 'components/TagInput.vue';
import ImageComponent from 'components/ImageComponent.vue';

const router = useRouter();
// const store = useWebinarsStore();

// Инициализация формы с помощью useForm
const form = useForm('post', () => '/worksheets', {
  title: '',
  description: '',
  cover: undefined as FileModel | undefined,
  price: '',
  file: undefined as FileModel | undefined,
  tags: [] as string[], // Поле для тегов
});

const previewFile = ref<{ 'path': string, 'url': string } | null>(null);

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
