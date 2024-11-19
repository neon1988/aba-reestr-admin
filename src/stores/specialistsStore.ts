// stores/specialistsStore.ts
import { defineStore } from 'pinia';
import type { Specialist } from 'src/models/Specialist';
import type { Meta } from 'src/models/Pagination';
import { getSpecialists } from 'src/services/specialists';

export const useSpecialistsStore = defineStore('specialists', {
  state: () => ({
    specialists: [] as Specialist[],
    meta: null as Meta | null,
    currentPage: 1,
    loading: false,
  }),
  actions: {
    async fetchSpecialists(page: number = 1) {
      this.loading = true;
      try {
        const response = await getSpecialists(page);
        this.specialists = response.data.data;
        this.meta = response.data.meta;
        this.currentPage = page;
      } catch (error) {
        // console.error('Ошибка при загрузке специалистов:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
