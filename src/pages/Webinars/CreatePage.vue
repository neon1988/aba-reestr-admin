<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Создание нового вебинара</q-toolbar-title>
    </q-toolbar>

    <q-form @submit.prevent="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <!-- Название вебинара -->
          <q-input
            v-model="form.title"
            label="Название вебинара"
            required
            :error="form.invalid('title')"
            :error-message="form.errors.title"
            @change="form.validate('title')"
          />

          <!-- Описание вебинара -->
          <q-input
            v-model="form.description"
            label="Описание вебинара"
            type="textarea"
            required
            :error="form.invalid('description')"
            :error-message="form.errors.description"
            @change="form.validate('description')"
          />

          <!-- Дата начала -->
          <q-input
            v-model="form.start_at"
            label="Дата начала"
            type="datetime-local"
            required
            :error="form.invalid('start_at')"
            :error-message="form.errors.start_at"
            @change="form.validate('start_at')"
          />

          <!-- Дата окончания -->
          <q-input
            v-model="form.end_at"
            label="Дата окончания"
            type="datetime-local"
            required
            :error="form.invalid('end_at')"
            :error-message="form.errors.end_at"
            @change="form.validate('end_at')"
          />

          <!-- Обложка -->
          <q-file
            v-model="form.cover"
            label="Изображение обложки"
            filled
            accept="image/*"
            :error="form.invalid('cover')"
            :error-message="form.errors.cover"
            @change="form.validate('cover')"
            counter
          />
        </q-card-section>

        <q-card-actions>
          <!-- Кнопка отправки -->
          <q-btn label="Создать вебинар" color="primary" :disabled="form.processing" />
          <q-btn label="Отмена" color="secondary" @click="cancel" />
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
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
// import { useWebinarsStore } from 'stores/webinars-store';
import { useNotify } from 'src/composables/useNotify';

const router = useRouter();
// const store = useWebinarsStore();

// Инициализация формы с помощью useForm
const form = useForm('post', '/api/webinars', {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: null as File | null,
});

// Метод для отправки формы
const submit = () => {
  form.submit().then(() => {
    useNotify('Вебинар успешно создан', 'success');
    router.push('/webinars'); // Перенаправление на список вебинаров
  }).catch(() => {
    useNotify('Ошибка при создании вебинара', 'negative');
  });
};

// Отмена создания вебинара, возвращаемся к списку
const cancel = () => {
  router.push('/webinars');
};
</script>
