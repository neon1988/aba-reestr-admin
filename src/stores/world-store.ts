// stores/worldStore.ts
import { defineStore } from 'pinia';
import type { Country } from 'src/models/Country';
import { getCountries } from 'src/services/countries'; // Интерфейс Webinar из модели

export const useWorldStore = defineStore('world', {
  state: () => ({
    loading: false, // Статус загрузки
    countries: [] as Country[],
  }),

  actions: {
    // Загрузка вебинаров
    async fetchCountries() {
      this.loading = true;
      try {
        const response = await getCountries();
        this.countries = response.data.data;
      } catch (error) {
        // Обработка ошибок
      } finally {
        this.loading = false;
      }
    },
  },
});
