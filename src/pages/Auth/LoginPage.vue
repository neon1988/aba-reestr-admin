<template>
  <div class="q-pa-md">
    <div class="q-mb-md" style="max-width: 400px; margin: 0 auto;">
      <q-card>
        <q-card-section>
          <div class="text-h6">Вход в систему</div>
        </q-card-section>

        <!-- Error message -->
        <q-card-section v-if="authStore.error" class="q-mt-md">
          <q-banner inline-actions rounded class="text-white bg-red">
            {{ authStore.error }}
          </q-banner>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="loginHandler">
            <!-- Email input -->
            <q-input
              v-model="email"
              type="email"
              label="Email"
              filled
              hint="Введите ваш email"
              :rules="[val => val && val.length > 0 || 'Email обязателен']"
              class="q-mb-md"
            />

            <!-- Password input -->
            <q-input
              v-model="password"
              type="password"
              label="Пароль"
              filled
              hint="Введите ваш пароль"
              :rules="[val => val && val.length > 0 || 'Пароль обязателен']"
              class="q-mb-md"
            />

            <!-- Submit button -->
            <q-btn
              :loading="authStore.loading"
              label="Войти"
              color="primary"
              type="submit"
              class="full-width"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const loginHandler = async () => {
  await authStore.login({ email: email.value, password: password.value });
  if (authStore.isAuthenticated) {
    router.push({ name: 'home' });
  }
};
</script>
