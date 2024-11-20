<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-toolbar-title>Редактировать профиль</q-toolbar-title>
    </q-toolbar>

    <div v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="5rem" color="primary"/>
      </q-inner-loading>
    </div>

    <q-card-section v-if="message !== ''">
      <q-banner inline-actions rounded class="bg-positive">
        {{ message }}
      </q-banner>
    </q-card-section>

    <q-card-section v-if="user">
      <q-avatar size="56px" class="q-mb-lg">
        <img :src="user.photo?.url || 'https://cdn.quasar.dev/img/boy-avatar.png'">
      </q-avatar>

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
          <img :src="imagePreview" alt="Предварительный просмотр" />
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

        <!-- Электронная почта -->
        <q-input
          v-model="user.email"
          outlined
          label="Электронная почта"
          type="email"
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
  </q-page>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, ref } from 'vue';
import { getUserById, updateUser, updateUserPhoto } from 'src/services/users';
import type { User } from 'src/models/User';
import { QFile, QBtn, QAvatar } from 'quasar';

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    QFile,
    QBtn,
    QAvatar,
  },
  setup(props) {
    const loading = ref(false);
    const message = ref('');
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
          user.value = response.data.data as User;
          message.value = response.data.message;
        } catch (error) {
          message.value = 'Ошибка при загрузке изображения.';
        } finally {
          loading.value = false;
        }
      } else {
        message.value = 'Пожалуйста, выберите изображение.';
      }
    };

    // Функция для загрузки данных о специалисте
    const fetchUserHandler = async (id: string) => {
      loading.value = true;
      try {
        const response = await getUserById(id);
        user.value = response.data.data as User; // Данные специалиста от Laravel Resource
      } catch (error) {
        message.value = 'Ошибка при загрузке данных пользователя.';
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
        message.value = response.data.message;
      } catch (error) {
        message.value = 'Ошибка при сохранении изменений.';
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
      message,
      photo,
      saveChangesHandler,
      imagePreview,
      handleFileChange,
      uploadImage,
    };
  },
});
</script>
