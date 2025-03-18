<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового мероприятия</q-toolbar-title>
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
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @change="form.validate('title')"
          />

          <!-- Описание мероприятия -->
          <q-input
            v-model="form.description"
            label="Описание мероприятия"
            type="textarea"
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @change="form.validate('description')"
          />

          <!-- Описание мероприятия -->
          <q-input
            v-model="form.registration_url"
            label="Ссылка на регистрацию"
            :error="form.invalid('registration_url')"
            :error-message="form.errors.registration_url"
            @change="form.validate('registration_url')"
          />

          <!-- Описание мероприятия -->
          <q-input
            v-model="form.price"
            label="Цена"
            :error="form.invalid('price')"
            :error-message="form.errors.price"
            @change="form.validate('price')"
          />

          <!-- Даты мероприятия -->
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
          <q-btn label="Создать мероприятие" type="submit" color="primary"
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';

const router = useRouter();
// const store = useWebinarsStore();
const startAt = ref<string | null>(null);
const endAt = ref<string | null>(null);

// Инициализация формы с помощью useForm
const form = useForm('post', () => '/conferences', {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: undefined as FileModel | undefined,
  registration_url: '',
  price: '',
});

// Метод для отправки формы
const submit = () => {
  form.submit().then(() => {
    useNotify('Мероприятие успешно создано', 'success');
    router.push('/conferences'); // Перенаправление на список вебинаров
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

// Отмена создания мероприятия, возвращаемся к списку
const cancel = () => {
  router.push('/conferences');
};
</script>
