// stores/centersStore.ts
import { defineStore } from 'pinia';
import type { Center } from 'src/models/Center';
import type { Meta } from 'src/models/Pagination';
import { getCenters } from 'src/services/centers';
import { StatusEnum } from 'src/enums/StatusEnums';

export const useCentersStore = defineStore('centers', {
  state: () => ({
    centers: [] as Center[],
    meta: {} as Meta,
    currentPage: 1,
    loading: false,
    status: StatusEnum.OnReview as StatusEnum,
  }),
  actions: {
    async fetchCenters() {
      this.loading = true;
      try {
        const response = await getCenters(this.status, this.currentPage);
        this.centers = response.data.data;
        this.meta = response.data.meta;
        this.currentPage = this.meta.current_page;
      } catch (error) {
        // console.error('Ошибка при загрузке специалистов:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
