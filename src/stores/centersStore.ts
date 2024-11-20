// stores/specialistsStore.ts
import { defineStore } from 'pinia';
import type { Meta } from 'src/models/Pagination';
import { getCenters } from 'src/services/centers';
import type { Center } from 'src/models/Center';

export const useCentersStore = defineStore('centers', {
  state: () => ({
    centers: [] as Center[],
    meta: null as Meta | null,
    currentPage: 1,
    loading: false,
  }),
  actions: {
    async fetchCenters(page: number = 1) {
      this.loading = true;
      try {
        const response = await getCenters(page);
        this.centers = response.data.data;
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
