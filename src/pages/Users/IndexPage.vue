<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Пользователи</q-toolbar-title>
    </q-toolbar>

    <div class="q-gutter-sm q-mb-md q-mx-sm">
      <q-input v-model="store.search" debounce="500" :loading="store.loading" />
    </div>

    <div class="relative-position">
      <!-- Список специалистов -->
      <q-list v-if="store.users.length > 0" separator>
        <q-item v-for="user in store.users"
                @click="router.push({ name: 'users.edit', params: { id: user.id } })"
                :key="user.id" clickable >
          <!-- Секция с аватаром -->
          <q-item-section avatar>
            <user-photo
              :modelValue="user"
              size="3rem"
              :width="256"
              :height="256"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }} {{ user.lastname }} {{ user.middlename }}</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
            <q-item-label>
              <q-badge v-if="user.subscription_level == SubscriptionLevelEnums.ParentsAndRelated"
                       label="Подписка A"/>
              <q-badge v-if="user.subscription_level == SubscriptionLevelEnums.Specialists"
                       label="Подписка B"/>
              <q-badge v-if="user.subscription_level == SubscriptionLevelEnums.Centers"
                       label="Подписка C"/>
            </q-item-label>
            <q-item-label v-if="user.subscription_level != SubscriptionLevelEnums.Free">
              Продлена до <date-time :raw-date="user.subscription_ends_at" />
            </q-item-label>
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
        <q-spinner-gears size="5rem" color="primary"/>
      </q-inner-loading>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from 'stores/users-store';
import UserPhoto from 'components/UserPhoto.vue';
import { SubscriptionLevelEnums } from 'src/enums/SubscriptionLevelEnums';
import DateTime from 'components/DateTime.vue';

const router = useRouter();
const store = useUsersStore();

const handlePageChange = (page: number) => {
  store.currentPage = page; // Обновляем текущую страницу
  store.fetchUsers(); // Передаем фильтры
};

watch(() => store.search, () => {
  store.fetchUsers();
});

// Загружаем данные при монтировании компонента
onMounted(() => {
  store.fetchUsers();
});
</script>
