// stores/usersStore.ts
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
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await getUsers(this.search, this.currentPage);
        this.users = response.data.data;
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
