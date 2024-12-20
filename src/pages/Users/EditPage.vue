<template>
  <q-page v-if="user" padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)"/>
      <q-toolbar-title>Редактировать профиль</q-toolbar-title>
    </q-toolbar>

    <q-card-section>
      <q-item-section avatar class="q-mb-lg">
        <user-photo
          :user="user"
          :fullscreen="true"
          size="5rem"
          class="cursor-pointer"
          :width="100"
          :height="100"
        />
      </q-item-section>

      <!-- Форма выбора изображения -->
      <q-file
        filled
        v-model="photo"
        label="Выберите изображение"
        @added="handleFileChange"
        accept="image/*"
        class="q-mb-md"
      />

      <!-- Предварительный просмотр изображения -->
      <div v-if="imagePreview" class="q-mb-md text-center">
        <q-avatar size="150px" class="q-mb-md">
          <img :src="imagePreview" alt="Предварительный просмотр"/>
        </q-avatar>
      </div>

      <!-- Кнопка для загрузки изображения -->
      <q-btn
        label="Загрузить изображение"
        color="primary"
        @click="uploadImage(user.id)"
        :disabled="!photo"
      />
    </q-card-section>

    <q-card-section>
      <q-form @submit="saveChangesHandler" :valid="form.valid">
        <!-- Имя -->
        <q-input
          v-model="form.name"
          outlined
          lazy-rules
          label="Имя"
          class="q-mb-md"
          :error="form.invalid('name')"
          :error-message="form.errors.name"
          @blur="form.validate('name')"
        />

        <q-input
          v-model="form.lastname"
          outlined
          lazy-rules
          label="Фамилия"
          class="q-mb-md"
          :error="form.invalid('lastname')"
          :error-message="form.errors.lastname"
          @blur="form.validate('lastname')"
        />

        <q-input
          v-model="form.middlename"
          outlined
          lazy-rules
          label="Отчество"
          class="q-mb-md"
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
          v-model="form.subscription_ends_at"
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
    </q-card-section>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary"/>
    </q-inner-loading>
  </q-page>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, ref } from 'vue';
import { getUserById, updateUserPhoto } from 'src/services/users';
import type { User } from 'src/models/User';
import {
  Notify, QAvatar, QBtn, QFile, useQuasar,
} from 'quasar';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import UserPhoto from 'components/UserPhoto.vue';
import { SubscriptionLevelEnums } from 'src/enums/SubscriptionLevelEnums';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';

export default defineComponent({
  computed: {
    SubscriptionLevelEnums() {
      return SubscriptionLevelEnums;
    },
  },
  props: {
    id: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  components: {
    UserPhoto,
    QFile,
    QBtn,
    QAvatar,
  },
  setup(props) {
    const router = useRouter();
    const authStore = useAuthStore();
    const $q = useQuasar();
    const loading = ref(false);
    const user = ref<User | null>(null);

    const photo = ref<File | null>(null); // Переменная для хранения выбранного файла
    const imagePreview = ref<string | null>(null);

    const form = useForm('patch', `/users/${props.id}`, {
      name: '',
      lastname: '',
      middlename: '',
      subscription_level: '',
      subscription_ends_at: '',
    });

    // Обработчик изменения файла
    const handleFileChange = (file: File) => {
      const reader = new FileReader();

      // Когда файл считан, установим его как источник для предварительного просмотра
      reader.onloadend = () => {
        if (reader.result) {
          imagePreview.value = reader.result as string;
        }
      };

      // Чтение файла
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    // Функция для загрузки изображения
    const uploadImage = async (id: number) => {
      if (photo.value) {
        loading.value = true;
        try {
          const response = await updateUserPhoto(id, photo.value);
          user.value = response.data.user as User;
          $q.notify({
            message: response.data.message,
            color: 'positive',
            position: 'top',
            timeout: 3000,
          });

          if (props.id && authStore.user) {
            if (authStore.user.id === props.id) {
              await authStore.fetchUser();
            }
          }
        } finally {
          loading.value = false;
        }
      }
    };

    function formatDateForInput(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    }

    // Функция для загрузки данных о специалисте
    const fetchUserHandler = async (id: number) => {
      loading.value = true;
      try {
        const response = await getUserById(id);
        if (response.data.data.subscription_ends_at) {
          response.data.data.subscription_ends_at = formatDateForInput(
            response.data.data.subscription_ends_at,
          );
        }
        user.value = response.data.data;
        form.setData(response.data.data);
      } finally {
        loading.value = false;
      }
    };

    // Отправка формы
    const saveChangesHandler = () => {
      loading.value = true;
      form
        .submit()
        .then(() => {
          useNotify('Пользователь успешно обновлён', 'success');
          loading.value = false;
          if (props.id && authStore.user) {
            if (authStore.user.id === props.id) {
              authStore.fetchUser();
            }
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
          loading.value = false;
        });
    };

    // Функция для преобразования Enum в массив опций
    function enumToOptions(enums: typeof SubscriptionLevelEnums) {
      return Object.keys(enums)
        .filter((key) => Number.isNaN(Number(key))) // Убираем числовые ключи (обратные маппинги)
        .map((label) => {
          const value = enums[label as keyof typeof SubscriptionLevelEnums];
          if (label === 'Free') label = 'Без подписки';
          if (label === 'ParentsAndRelated') label = 'Родители и смежники';
          if (label === 'Specialists') label = 'Специалисты';
          if (label === 'Centers') label = 'Центры';
          return {
            label: `${label}`,
            value,
          };
        });
    }

    const options = enumToOptions(SubscriptionLevelEnums);

    // Загружаем данные при монтировании компонента
    onMounted(() => {
      if (props.id) {
        fetchUserHandler(props.id);
      }
    });

    return {
      loading,
      user,
      photo,
      saveChangesHandler,
      imagePreview,
      handleFileChange,
      uploadImage,
      router,
      options,
      form,
    };
  },
});
</script>
