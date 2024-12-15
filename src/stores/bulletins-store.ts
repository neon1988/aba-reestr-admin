// stores/bulletinStore.ts
import { defineStore } from 'pinia';
import type { Bulletin } from 'src/models/Bulletin';
import type { Meta } from 'src/models/Pagination';
import { getBulletins } from 'src/services/bulletins';
import { StatusEnum } from 'src/enums/StatusEnums';

export const useBulletinsStore = defineStore('bulletins', {
  state: () => ({
    bulletins: [] as Bulletin[],
    meta: {} as Meta,
    currentPage: 1,
    loading: false,
    status: StatusEnum.OnReview as StatusEnum,

  }),
  actions: {
    async fetchBulletins() {
      this.loading = true;
      try {
        const response = await getBulletins(this.status, this.currentPage);
        this.bulletins = response.data.data;
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
