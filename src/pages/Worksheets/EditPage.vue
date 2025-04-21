<template>
  <q-page padding>

    <!-- Заголовок страницы -->
    <q-toolbar>
      <q-toolbar-title>Редактирование материала</q-toolbar-title>
    </q-toolbar>

    <q-banner v-if="worksheet && worksheet.deleted_at" inline-actions rounded
              class="bg-primary text-white">
      Материал удален
      <template v-slot:action>
        <q-btn flat color="white" label="Восстановить" @click="deleteHandler" />
      </template>
    </q-banner>

    <!-- Форма редактирования -->
    <q-form v-else @submit="submit" :valid="form.valid">
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
          <q-btn flat dense icon="delete" color="red" @click="deleteHandler" />
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
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import { Notify } from 'quasar';
import { deleteWorksheet, getWorksheetById } from 'src/services/worksheets';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import type { Worksheet } from 'src/models/Worksheet';
import { useStatsStore } from 'stores/stat-store';
import type { Tag } from 'src/models/Tag';
import TagInput from 'components/TagInput.vue';

const statStore = useStatsStore();
const router = useRouter();
const props = defineProps<{
  id: number;
}>();
const worksheet = ref<Worksheet | null>(null);

// Инициализация формы
const form = useForm('patch', () => `/worksheets/${props.id}`, {
  cover: undefined as FileModel | undefined,
  title: '',
  description: '',
  price: '',
  file: undefined as FileModel | undefined,
  tags: [] as string[], // Поле для тегов
});

// Состояния
const loading = ref(true);

// Получение данных материала при монтировании
const deleteHandler = async () => {
  loading.value = true;
  try {
    const { data } = await deleteWorksheet(props.id);
    worksheet.value = data.data;
  } catch (e) {
    useNotify('Не удалось удалить материал', 'negative');
  } finally {
    loading.value = false;
  }
};

const loadWorksheetData = async () => {
  loading.value = true;
  try {
    const { data } = await getWorksheetById(props.id);
    worksheet.value = data.data;
  } catch (e) {
    useNotify('Не удалось загрузить данные материала', 'negative');
    router.push('/worksheets'); // Возврат на список материалов при ошибке
    await statStore.fetchStats();
  } finally {
    loading.value = false;
  }
};

// Отправка формы
const submit = () => {
  loading.value = true;
  form
    .submit()
    .then(() => {
      useNotify('Данные материала успешно сохранены', 'success');
    })
    .catch((reason) => {
      const { response } = reason;
      if (response.status === 422) {
        const { opts } = useValidationNotification(response.data);
        Notify.create(opts.value);
      } else {
        useNotify(response.data.message, 'negative');
      }
    }).finally(() => {
      loading.value = false;
    });
};

// Отмена редактирования
const cancel = () => {
  router.push('/worksheets');
};

watch(worksheet, () => {
  if (worksheet.value) {
    form.setData({
      ...worksheet.value,
      tags: worksheet.value.tags ? worksheet.value.tags.map((tag: Tag) => tag.name) : [],
    });
  }
});

// Загружаем данные при монтировании
onMounted(() => {
  loadWorksheetData();
});
</script>
