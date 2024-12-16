import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') || 'false'), // Загружаем состояние из localStorage
  }),

  getters: {
    // Геттер для получения текущего состояния темного режима
    darkModeStatus: (state) => state.isDarkMode,
  },

  actions: {
    // Метод для переключения темного режима
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.saveDarkMode(); // Сохраняем в localStorage
    },

    // Метод для явного задания режима
    setDarkMode(value: boolean) {
      this.isDarkMode = value;
      this.saveDarkMode(); // Сохраняем в localStorage
    },

    // Метод для сохранения состояния в localStorage
    saveDarkMode() {
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    },
  },
});
