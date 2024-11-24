<template>
  <q-page padding>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.go(-1)"/>
      <q-toolbar-title>Редактировать профиль</q-toolbar-title>
    </q-toolbar>

    <q-card-section v-if="user">
      <q-item-section avatar class="q-mb-lg">
        <user-photo
          :user="user"
          :fullscreen="true"
          size="5rem"
          class="cursor-pointer"
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

    <q-card-section v-if="user">
      <q-form @submit="saveChangesHandler" ref="form">
        <!-- Имя -->
        <q-input
          v-model="user.name"
          outlined
          label="Имя"
          class="q-mb-md"
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
import { getUserById, updateUser, updateUserPhoto } from 'src/services/users';
import type { User } from 'src/models/User';
import {
  QAvatar, QBtn, QFile, useQuasar,
} from 'quasar';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import UserPhoto from 'components/UserPhoto.vue';

export default defineComponent({
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

    // Функция для загрузки данных о специалисте
    const fetchUserHandler = async (id: number) => {
      loading.value = true;
      try {
        const response = await getUserById(id);
        user.value = response.data.data as User; // Данные специалиста от Laravel Resource
      } finally {
        loading.value = false;
      }
    };

    const saveChangesHandler = async () => {
      if (!user.value) return;
      loading.value = true;
      try {
        const response = await updateUser(props.id, user.value);
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
    };

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
    };
  },
});
</script>
