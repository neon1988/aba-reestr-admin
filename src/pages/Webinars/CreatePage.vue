<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового вебинара</q-toolbar-title>
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
            fit="scale-down"
            allow-fullscreen
            quasar-component
            :max-width="200"
            :max-height="200" />

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
                v-model="startAt"
                label="Дата начала"
                type="datetime-local"
                :error="form.invalid('start_at')"
                :error-message="form.errors.start_at"
                @blur="form.validate('start_at')"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="endAt"
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import ImageComponent from 'components/ImageComponent.vue';

const router = useRouter();
// const store = useWebinarsStore();
const startAt = ref<string | null>(null);
const endAt = ref<string | null>(null);

// Инициализация формы с помощью useForm
const form = useForm('post', () => '/webinars', {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: undefined as FileModel | undefined,
  stream_url: '',
  price: '',
});

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

watch(startAt, (value) => {
  if (value) {
    form.start_at = new Date(value).toISOString();
  } else {
    form.start_at = '';
  }
});

watch(endAt, (value) => {
  if (value) {
    form.end_at = new Date(value).toISOString();
  } else {
    form.end_at = '';
  }
});

// Отмена создания вебинара, возвращаемся к списку
const cancel = () => {
  router.push('/webinars');
};
</script>
