<template>
  <q-page padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)"/>
      <q-toolbar-title>Редактировать профиль</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="submit" :valid="form.valid">
      <upload-file-component
        v-model="form.photo"
        label="Выбрать фото"
        :error="form.invalid('photo')"
        :error-message="form.errors.photo"
        @change="form.validate('photo')"
      />

      <q-img
        v-if="form.photo"
        :src="form.photo.url"
        spinner-color="white"
        class="q-mb-md"
        style="height: 10rem; max-width: 10rem"
      />

      <!-- Имя -->
      <q-input
        v-model="form.name"
        outlined
        lazy-rules
        label="Имя"
        :error="form.invalid('name')"
        :error-message="form.errors.name"
        @blur="form.validate('name')"
      />

      <q-input
        v-model="form.lastname"
        outlined
        lazy-rules
        label="Фамилия"
        :error="form.invalid('lastname')"
        :error-message="form.errors.lastname"
        @blur="form.validate('lastname')"
      />

      <q-input
        v-model="form.middlename"
        outlined
        lazy-rules
        label="Отчество"
        :error="form.invalid('middlename')"
        :error-message="form.errors.middlename"
        @blur="form.validate('middlename')"
      />

      <q-select
        v-model="form.subscription_level"
        :options="options"
        label="Тип подписки"
        lazy-rules
        :error="form.invalid('subscription_level')"
        :error-message="form.errors.subscription_level"
        @blur="form.validate('subscription_level')"
        emit-value
        map-options
      />

      <q-input
        v-model="subscriptionEndsAt"
        label="Дата окончания подписки"
        type="datetime-local"
        lazy-rules
        :error="form.invalid('subscription_ends_at')"
        :error-message="form.errors.subscription_ends_at"
        @blur="form.validate('subscription_ends_at')"
      />

      <q-btn
        type="submit"
        label="Сохранить изменения"
        color="primary"
        class="full-width q-mt-md"
      />
    </q-form>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import {
  defineProps, onMounted, ref, watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { getUserById } from 'src/services/users';
import { date as dateUtils, Notify } from 'quasar';
import { SubscriptionLevelEnums } from 'src/enums/SubscriptionLevelEnums';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import { useAuthStore } from 'stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const subscriptionEndsAt = ref<string | null>(null);

const props = defineProps<{
  id: number;
}>();

const form = useForm('patch', () => `/users/${props.id}`, {
  photo: undefined as FileModel | undefined,
  name: '',
  lastname: '',
  middlename: '',
  subscription_level: '',
  subscription_ends_at: '',
});

const loading = ref(true);

// Получение данных материала при монтировании
const loadUserData = async () => {
  try {
    const { data } = await getUserById(props.id);
    if (data.data.subscription_ends_at) {
      subscriptionEndsAt.value = dateUtils.formatDate(data.data.subscription_ends_at, 'YYYY-MM-DDTHH:mm');
    }
    form.setData(data.data);
  } catch (e) {
    useNotify('Не удалось загрузить пользователя', 'negative');
    router.push('/users'); // Возврат на список материалов при ошибке
  } finally {
    loading.value = false;
  }
};

// Отправка формы
const submit = () => {
  form
    .submit()
    .then(() => {
      useNotify('Пользователь успешно обновлён', 'success');
      // router.push('/users');
      if (authStore.user && props.id === authStore.user.id) {
        authStore.fetchUser();
      }
    })
    .catch((reason) => {
      const { response } = reason;
      if (response.status === 422) {
        const { opts } = useValidationNotification(response.data);
        Notify.create(opts.value);
      } else {
        useNotify(response.data.message, 'negative');
      }
    });
};

// Функция для преобразования Enum в массив опций
function enumToOptions(enums: typeof SubscriptionLevelEnums) {
  return Object.keys(enums)
    .filter((key) => Number.isNaN(Number(key))) // Убираем числовые ключи (обратные маппинги)
    .map((label) => {
      const value = enums[label as keyof typeof SubscriptionLevelEnums];
      if (label === 'Free') label = 'Без подписки';
      if (label === 'ParentsAndRelated') label = 'Подписка A';
      if (label === 'Specialists') label = 'Подписка B';
      if (label === 'Centers') label = 'Подписка C';
      return {
        label: `${label}`,
        value,
      };
    });
}

const options = enumToOptions(SubscriptionLevelEnums);

watch(
  () => props.id, // отслеживаем prop
  () => {
    loadUserData();
  },
);

watch(subscriptionEndsAt, (value) => {
  if (value) {
    form.subscription_ends_at = new Date(value).toISOString();
  } else {
    form.subscription_ends_at = '';
  }
});

// Загружаем данные при монтировании компонента
onMounted(() => {
  loadUserData();
});

</script>
