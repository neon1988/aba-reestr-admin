<template>
  <div>
    <q-file
      :model-value="files"
      @update:model-value="updateFiles"
      :label="label"
      :outlined="false"
      :error="error"
      :error-message="errorMessage"
      :multiple="multiple"
    >
      <template v-slot:file="{ index, file }">
        <q-chip
          v-if="uploadProgress[index]"
          class="full-width"
          removable
          square
          size="xl"
          @remove="cancelFile(index)"
        >
          <div v-if="uploadedFiles[index]">
            <q-avatar v-if="isImage(uploadedFiles[index].name)"
                      @click="openFile(uploadedFiles[index].url)">
              <img :src="uploadedFiles[index].url">
            </q-avatar>
            <q-avatar v-else-if="isVideo(uploadedFiles[index].name)"
                      @click="openFile(uploadedFiles[index].url)"
                      icon="videocam" />
            <q-avatar v-else
                      @click="openFile(uploadedFiles[index].url)"
                      icon="description" />
          </div>

          <q-linear-progress
            rounded
            :value="uploadProgress[index].percent / 100"
            class="ellipsis"
            size="2rem"
          >
            <div class="absolute-full flex flex-center">
              <q-badge v-if="uploadProgress[index].percent >= 100"
                       color="white" text-color="primary"
                       :label="file.name"/>
              <q-badge v-if="uploadProgress[index].percent < 100"
                       color="white" text-color="primary"
                       :label="uploadProgress[index].percent.toFixed(1)"/>
            </div>
          </q-linear-progress>
        </q-chip>
      </template>
    </q-file>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import {
  defineEmits, defineProps, onBeforeUnmount, ref, watch,
} from 'vue';
import { useNotify } from 'src/composables/useNotify';
import { createFile } from 'src/services/files';
import type { AxiosProgressEvent } from 'axios';
import { CanceledError } from 'axios';
import type { File as FileModel } from 'src/models/File';

interface UploadProgress {
  percent: number;
  error: boolean;
  controller?: AbortController;
}

// Props
const props = defineProps({
  modelValue: {
    type: [Array, Object] as PropType<FileModel[] | FileModel | undefined>,
    default: undefined,
  },
  label: {
    type: String,
    default: 'Выбрать файл',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

// Emit
const emit = defineEmits(['update:modelValue', 'change']);

const files = ref<File[] | null>(null);
const uploadProgress = ref<UploadProgress[]>([]);
const uploading = ref<ReturnType<typeof setTimeout> | null>(null);
const uploadedFiles = ref<FileModel[]>([]);

watch(
  () => props.modelValue,
  (newUploadedFiles) => {
    if (newUploadedFiles) {
      // Если newUploadedFiles — объект, преобразуем его в массив
      const filesArray = Array.isArray(newUploadedFiles)
        ? newUploadedFiles
        : [newUploadedFiles];

      // Добавляем новые загруженные файлы в локальный массив
      uploadedFiles.value = [...filesArray];

      // Обновляем прогресс загрузки (если требуется)
      uploadProgress.value = filesArray.map(() => ({
        error: false,
        percent: 100, // Считаем, что внешние файлы уже загружены
      }));

      // eslint-disable-next-line no-console
      console.log(filesArray);

      // Заменяем current files на новые файлы, создавая объекты File
      files.value = filesArray.map((
        uploadedFile: FileModel,
      ) => new File([uploadedFile.url], uploadedFile.name));
    }
  },
  { immediate: true }, // Синхронизируем при монтировании
);

// Проверка, является ли файл изображением
const isImage = (file: string) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  return imageExtensions.some((ext) => file.toLowerCase().endsWith(ext));
};

// Проверка, является ли файл видео
const isVideo = (file: string) => {
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];
  return videoExtensions.some((ext) => file.toLowerCase().endsWith(ext));
};

function cleanUp() {
  if (uploading.value !== null) {
    clearTimeout(uploading.value);
  }
  files.value = null;
  uploadProgress.value = [];
  uploadedFiles.value = [];
}

function onChange() {
  // Эмитим данные в зависимости от props.multiple
  const emittedValue = props.multiple
    ? uploadedFiles.value
    : uploadedFiles.value[0] || null;

  emit('update:modelValue', emittedValue); // Связываем с v-model
  emit('change', emittedValue); // Вызываем @change
}

const openFile = (fileUrl: string) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.target = '_blank';
  link.click();
};

function cancelFile(index: number) {
  if (uploadProgress.value[index]?.controller) {
    // Отменяем запрос, если есть контроллер
    uploadProgress.value[index].controller.abort();
  }

  if (files.value !== null) files.value.splice(index, 1);
  uploadProgress.value.splice(index, 1);
  uploadedFiles.value.splice(index, 1);

  onChange();
}

async function upload() {
  if (!files.value || files.value.length === 0) return;

  // Последовательная обработка файлов с использованием reduce
  await files.value.reduce(async (previousPromise, file, index) => {
    await previousPromise; // Ждем завершения предыдущей операции

    // Проверка на существование прогресса для этого индекса
    if (uploadProgress.value[index] === undefined) {
      uploadProgress.value[index] = {
        error: false,
        percent: 0,
        controller: new AbortController(),
      } as UploadProgress;
    }

    const controller = uploadProgress.value[index].controller!;
    const { signal } = controller; // Получаем сигнал для отмены

    if (uploadProgress.value[index].percent <= 0) {
      try {
        const response = await createFile(file, (event: AxiosProgressEvent) => {
          if (event.lengthComputable && event.total && event.loaded) {
            if (uploadProgress.value[index] !== undefined) {
              uploadProgress.value[index].percent = (event.loaded / event.total) * 100;
            }
          }
        }, signal);

        uploadedFiles.value[index] = response.data.data as FileModel;
        uploadProgress.value[index].percent = 100;
      } catch (error) {
        if (error instanceof CanceledError) { // Проверяем, является ли ошибка отмененной
          useNotify('Загрузка отменена', 'info'); // Уведомляем об отмене
        }
        cancelFile(index);
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        // Завершаем загрузку
        uploading.value = null;
      }
    }
  }, Promise.resolve()); // Начинаем с уже разрешенного промиса

  onChange();

  useNotify('Файлы успешно загружены', 'success'); // Уведомление об успешной загрузке
}

function updateFiles(newFiles: File[] | File | null) {
  if (newFiles instanceof File) {
    cleanUp();
    newFiles = [newFiles];
  }

  if (newFiles) {
    // Добавляем новые файлы в существующий список, не заменяя его
    files.value = [...(files.value || []), ...newFiles];

    // Обновляем прогресс для новых файлов
    uploadProgress.value = [...(uploadProgress.value || []), ...newFiles.map((file) => ({
      error: false,
      percent: 0,
      controller: new AbortController(),
      icon: file.type.startsWith('video/')
        ? 'movie'
        : file.type.startsWith('image/')
          ? 'photo'
          : file.type.startsWith('audio/')
            ? 'audiotrack'
            : 'insert_drive_file',
    }))];

    // Вызываем функцию для загрузки
    upload();
  }
}

onBeforeUnmount(cleanUp);
</script>
