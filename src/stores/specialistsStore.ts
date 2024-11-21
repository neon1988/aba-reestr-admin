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
    status: StatusEnum.OnReview as StatusEnum,
  }),
  actions: {
    async fetchSpecialists() {
      this.loading = true;
      try {
        const response = await getSpecialists(this.status, this.currentPage);
        this.specialists = response.data.data;
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
