<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Пользователи</q-toolbar-title>
    </q-toolbar>

    <!-- Список специалистов -->
    <q-list v-if="store.users.length > 0">
      <q-item v-for="user in store.users"
              @click="router.push({ name: 'users.edit', params: { id: user.id } })"
              :key="user.id" clickable>
        <!-- Секция с аватаром -->
        <q-item-section avatar>
          <user-photo :user="user" size="3rem" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Сообщение, если специалистов нет -->
    <div v-else class="q-mt-md text-center">
      <q-banner>
        Нет пользователей
      </q-banner>
    </div>

    <div v-if="store.meta.last_page > 1" class="q-pa-lg flex flex-center">
      <!-- Пагинация -->
      <q-pagination
        v-if="store.meta"
        v-model="store.currentPage"
        :min="1"
        :max="store.meta.last_page"
        :max-pages="7"
        boundary-numbers
        @update:model-value="handlePageChange"
      />
    </div>

    <!-- Показываем загрузку, пока данные загружаются -->
    <q-inner-loading :showing="store.loading">
      <q-spinner-gears size="5rem" color="primary" />
    </q-inner-loading>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from 'src/stores/usersStore';
import UserPhoto from 'components/UserPhoto.vue';

const router = useRouter();
const store = useUsersStore();

const handlePageChange = (page: number) => {
  store.currentPage = page; // Обновляем текущую страницу
  store.fetchUsers(); // Передаем фильтры
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchUsers();
});
</script>
