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

          <upload-file-component
            v-model="form.record_file"
            label="Выбрать файл"
            :error="form.invalid('record_file')"
            :error-message="form.errors.record_file"
            @change="form.validate('record_file')"
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
import { getWebinarById } from 'src/services/webinars';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';

const router = useRouter();
const props = defineProps<{
  id: number;
}>();

// Инициализация формы
const form = useForm('patch', () => `/webinars/${props.id}`, {
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  cover: undefined as FileModel | undefined,
  stream_url: '',
  price: '',
  record_file: undefined as FileModel | undefined,
});

// Состояния
const loading = ref(true);

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
    form.setData(data.data);
  } catch (e) {
    useNotify('Не удалось загрузить данные вебинара', 'negative');
    router.push('/webinars'); // Возврат на список вебинаров при ошибке
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
