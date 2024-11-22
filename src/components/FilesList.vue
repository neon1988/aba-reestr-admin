<template>
  <q-list v-if="files.length > 0">
    <q-item v-for="file in files" :key="file.id" clickable
            @click.stop="downloadFile(file)">
      <!-- Иконка файла -->
      <q-item-section avatar>
        <q-icon :name="getFileIcon(file.extension)" size="md" />
      </q-item-section>

      <!-- Информация о файле -->
      <q-item-section>
        <q-item-label>{{ file.name }}</q-item-label>
        <q-item-label caption>
          {{ formatSize(file.size) }} • {{ file.extension.toUpperCase() }}
        </q-item-label>
      </q-item-section>

      <!-- Действия с файлом -->
      <q-item-section side v-if="file.url">
        <q-btn flat round icon="download" />
      </q-item-section>
    </q-item>
  </q-list>
  <q-banner v-else>
    Ни одного файла не найдено
  </q-banner>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { File } from 'src/models/File';

// Пример данных
const props = defineProps({
  files: {
    type: Array as () => File[],
    required: true,
  },
});

const files = ref<File[]>([...props.files]);

// Форматирование размера файла
const formatSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1048576).toFixed(1)} MB`;
};

// Скачивание файла
const downloadFile = (file: File) => {
  // Создаём скрытую ссылку
  const link = document.createElement('a');
  link.href = file.url;
  link.download = file.name; // Укажите имя файла при скачивании
  link.setAttribute('target', '_blank');
  // Инициализация клика на ссылку для скачивания
  link.click();
};

// Получение иконки на основе расширения
const getFileIcon = (extension: string): string => {
  const icons: Record<string, string> = {
    pdf: 'picture_as_pdf',
    jpg: 'image',
    png: 'image',
    jpeg: 'image',
    doc: 'description',
    docx: 'description',
    xls: 'table_chart',
    xlsx: 'table_chart',
    zip: 'folder_zip',
    rar: 'folder_zip',
    txt: 'text_snippet',
  };
  return icons[extension.toLowerCase()] || 'insert_drive_file';
};

</script>
