<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="authStore.isAuthenticated"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ABA реестр - Админка
        </q-toolbar-title>

        <!-- Кнопка для переключения темного режима -->
        <q-btn
          flat
          dense
          round
          icon="brightness_4"
          aria-label="Toggle Dark Mode"
          @click="toggleDarkMode"
        />

        <user-photo v-if="authStore.user" :user="authStore.user" size="2rem"
                    @click="toggleRightDrawer" class="q-ml-md cursor-pointer" />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="authStore.isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Список функций
        </q-item-label>

        <q-item clickable v-ripple :to="{ name: 'centers.index' }">
          <q-item-section avatar>
            <q-icon name="apartment"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Центры</q-item-label>
            <q-item-label caption>
              Список центров
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'specialists.index' }">
          <q-item-section avatar>
            <q-icon name="badge"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Специалисты</q-item-label>
            <q-item-label caption>
              Список специалистов
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'users.index' }">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Пользователи</q-item-label>
            <q-item-label caption>
              Список пользователей
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-if="authStore.user"
      v-model="rightDrawerOpen"
      side="right"
      show-if-above
      bordered>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="authStore.user.photo?.url || 'https://cdn.quasar.dev/img/boy-avatar.png'">
          </q-avatar>
          <div class="text-weight-bold">{{ authStore.user.name }}</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>

      <q-scroll-area
        v-if="authStore.user"
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'users.edit', params: { id: authStore.user.id } }">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Настройки</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logoutHandler">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Выйти</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import UserPhoto from 'components/UserPhoto.vue';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

// Функция для переключения темного режима
function toggleDarkMode() {
  $q.dark.toggle(); // Переключает между светлым и темным режимом
}

const logoutHandler = async () => {
  await authStore.logout(); // Вызов действия logout из Pinia
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login' });
  }
};
</script>
