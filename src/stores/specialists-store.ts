// stores/specialistsStore.ts
import { defineStore } from 'pinia';
import type { Specialist } from 'src/models/Specialist';
import type { Meta } from 'src/models/Pagination';
import { getSpecialists } from 'src/services/specialists';
import { StatusEnum } from 'src/enums/StatusEnums';

export const useSpecialistsStore = defineStore('specialists', {
  state: () => ({
    specialists: [] as Specialist[],
    meta: {} as Meta,
    currentPage: 1,
    loading: false,
    search: '' as string,
    status: StatusEnum.OnReview as StatusEnum,
    controller: null as AbortController | null,
  }),
  actions: {
    async fetchSpecialists() {
      // Отменяем предыдущий запрос, если он существует
      if (this.loading && this.controller) {
        this.controller.abort();
      }

      // Создаем новый AbortController для текущего запроса
      this.controller = new AbortController();
      this.loading = true;

      try {
        const response = await getSpecialists(this.search, this.status, this.currentPage);
        this.specialists = response.data.data;
        this.meta = response.data.meta;
        this.currentPage = this.meta.current_page;
      } catch (error) {
        // Игнорируем ошибки, вызванные отменой запроса
        if (error instanceof Error && error.name === 'AbortError') {
          // console.log('Запрос был отменен');
          return;
        }
      } finally {
        // Сбрасываем контроллер и loading только если запрос не был отменен
        if (!this.controller.signal.aborted) {
          this.controller = null;
          this.loading = false;
        }
      }
    },
  },
});
