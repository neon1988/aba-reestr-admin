import { defineStore } from 'pinia';
import type { User } from 'src/models/User';
import type { Meta } from 'src/models/Pagination';
import { getUsers } from 'src/services/users';
import { StatusEnum } from 'src/enums/StatusEnums';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    meta: {} as Meta,
    currentPage: 1,
    loading: false,
    status: StatusEnum.OnReview as StatusEnum,
    search: '' as string,
    // Добавляем контроллер для управления отменой запросов
    controller: null as AbortController | null,
  }),
  actions: {
    async fetchUsers() {
      // Отменяем предыдущий запрос, если он существует
      if (this.loading && this.controller) {
        this.controller.abort();
      }

      // Создаем новый AbortController для текущего запроса
      this.controller = new AbortController();
      this.loading = true;

      try {
        const response = await getUsers(this.search, this.currentPage, {
          signal: this.controller.signal,
        });
        this.users = response.data.data;
        this.meta = response.data.meta;
        this.currentPage = this.meta.current_page;
      } catch (error) {
        // Игнорируем ошибки, вызванные отменой запроса
        if (error instanceof Error && error.name === 'AbortError') {
          // console.log('Запрос был отменен');
          return;
        }

        // console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        // Сбрасываем контроллер и loading только если запрос не был отменен
        if (!this.controller.signal.aborted) {
          this.controller = null;
          this.loading = false;
        }
      }
    },
    // Метод для явной отмены запроса (если нужно)
    cancelFetch() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },
  },
});
