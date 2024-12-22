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

          <upload-file-component
            v-model="form.file"
            label="Выбрать файл"
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
import { getWorksheetById } from 'src/services/worksheets';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';

const router = useRouter();
const props = defineProps<{
  id: number;
}>();

// Инициализация формы
const form = useForm('patch', `/worksheets/${props.id}`, {
  cover: undefined as FileModel | undefined,
  title: '',
  description: '',
  price: '',
  file: undefined as FileModel | undefined,
});

// Состояния
const loading = ref(true);

// Получение данных материала при монтировании
const loadWorksheetData = async () => {
  try {
    const { data } = await getWorksheetById(props.id);
    form.setData(data.data);
  } catch (e) {
    useNotify('Не удалось загрузить данные материала', 'negative');
    router.push('/worksheets'); // Возврат на список материалов при ошибке
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
