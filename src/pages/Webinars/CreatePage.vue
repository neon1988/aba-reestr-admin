<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового вебинара</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
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
            style="height: 140px; max-width: 150px"
          />

          <!-- Название вебинара -->
          <q-input
            v-model="form.title"
            label="Название вебинара"
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @change="form.validate('title')"
          />

          <!-- Описание вебинара -->
          <q-input
            v-model="form.description"
            label="Описание вебинара"
            type="textarea"
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @change="form.validate('description')"
          />

          <!-- Описание вебинара -->
          <q-input
            v-model="form.stream_url"
            label="Ссылка на трансляцию"
            :error="form.invalid('stream_url')"
            :error-message="form.errors.stream_url"
            @change="form.validate('stream_url')"
          />

          <!-- Описание вебинара -->
          <q-input
            v-model="form.price"
            label="Цена"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @change="form.validate('price')"
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
        </q-card-section>

        <q-card-actions>
          <!-- Кнопка отправки -->
          <q-btn label="Создать вебинар" type="submit" color="primary" :disabled="form.processing"/>
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

const router = useRouter();
// const store = useWebinarsStore();

// Инициализация формы с помощью useForm
const form = useForm('post', '/webinars', {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: '',
  stream_url: '',
  price: '',
});

const loading = ref(false);
const cover = ref<File | null>(null);
const previewCover = ref<{ 'path': string, 'url': string } | null>(null);

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

// Метод для отправки формы
const submit = () => {
  form.submit().then(() => {
    useNotify('Вебинар успешно создан', 'success');
    router.push('/webinars'); // Перенаправление на список вебинаров
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

// Отмена создания вебинара, возвращаемся к списку
const cancel = () => {
  router.push('/webinars');
};
</script>
