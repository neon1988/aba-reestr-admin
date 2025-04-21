// stores/tagStore.ts
import { defineStore } from 'pinia';
import type { Tag } from 'src/models/Tag';
import { getTags } from 'src/services/tag';
import type { Meta } from 'src/models/Pagination'; // Интерфейс Webinar из модели

export const useTagStore = defineStore('tags', {
  state: () => ({
    loading: false, // Статус загрузки
    tags: [] as Tag[],
    meta: {} as Meta,
    currentPage: 1,
    search: '' as string,
  }),

  actions: {
    // Загрузка вебинаров
    async fetchTags() {
      this.loading = true;
      try {
        const response = await getTags(this.search, this.currentPage);
        this.tags = response.data.data;
        this.meta = response.data.meta;
        this.currentPage = this.meta.current_page;
      } catch (error) {
        // Обработка ошибок
      } finally {
        this.loading = false;
      }
    },
  },
});
