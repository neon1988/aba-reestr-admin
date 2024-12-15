import { defineStore } from 'pinia';
import { getStat } from 'src/services/stat';
import type { Stat } from 'src/models/Stat';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    specialistsCount: 0,
    specialistsOnReviewCount: 0,
    centersCount: 0,
    centersOnReviewCount: 0,
    usersCount: 0,
    bulletinsOnReviewCount: 0,
    bulletinsCount: 0,
  }),
  actions: {
    async fetchStats() {
      // Запрос к API для получения данных
      const response = await getStat();
      const data = response.data as Stat;
      this.specialistsCount = data.specialistsCount;
      this.specialistsOnReviewCount = data.specialistsOnReviewCount;
      this.centersCount = data.centersCount;
      this.centersOnReviewCount = data.centersOnReviewCount;
      this.usersCount = data.usersCount;
      this.bulletinsOnReviewCount = data.bulletinsOnReviewCount;
      this.bulletinsCount = data.bulletinsCount;
    },
  },
});
