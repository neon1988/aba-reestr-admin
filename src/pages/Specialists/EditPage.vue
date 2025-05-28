<template>
  <q-page padding>
    <!-- Заголовок страницы -->
    <q-toolbar>
      <q-toolbar-title>Редактирование специалиста</q-toolbar-title>
    </q-toolbar>

    <q-card-section v-if="specialist">
      <q-chip
        v-if="specialist.status === StatusEnum.Accepted"
        color="green"
        text-color="white"
        icon="check"
      >
        Подтверждён
      </q-chip>
      <q-chip
        v-else-if="specialist.status === StatusEnum.Rejected"
        color="red"
        text-color="white"
        icon="block"
      >
        Отклонён
      </q-chip>
      <q-chip
        v-else-if="specialist.status === StatusEnum.OnReview"
        color="orange"
        text-color="white"
        icon="hourglass_empty"
      >
        На проверке
      </q-chip>
    </q-card-section>

    <q-card-actions v-if="specialist">
      <!-- Кнопка для подтверждения -->
      <q-btn
        label="Подтвердить"
        color="green"
        @click="approveSpecialistHandler"
        v-if="specialist.status != StatusEnum.Accepted && !loading"
      />
      <!-- Кнопка для отклонения -->
      <q-btn
        v-if="specialist.status != StatusEnum.Rejected && !loading"
        label="Отклонить"
        color="red"
        @click="rejectSpecialistHandler"
      />
    </q-card-actions>

    <!-- Форма редактирования -->
    <q-form @submit="submit" :valid="form.valid">
      <q-card>
        <q-card-section>
          <!-- Обложка вебинара -->
          <upload-file-component
            v-model="form.photo"
            label="Выбрать фото"
            :error="form.invalid('photo')"
            :error-message="form.errors.photo"
            @change="form.validate('photo')"
          />

          <image-component
            v-if="form.photo"
            :url="form.photo.url"
            spinner-color="white"
            class="q-mb-sm"
            fit="scale-down"
            allow-fullscreen
            quasar-component
            :max-width="200"
            :max-height="200" />

          <q-input
            v-model="form.lastname"
            label="Фамилия"
            lazy-rules
            :error="form.invalid('lastname')"
            :error-message="form.errors.lastname"
            @blur="form.validate('lastname')"
          />

          <q-input
            v-model="form.name"
            label="Имя"
            lazy-rules
            :error="form.invalid('name')"
            :error-message="form.errors.name"
            @blur="form.validate('name')"
          />

          <q-input
            v-model="form.middlename"
            label="Отчество"
            lazy-rules
            :error="form.invalid('middlename')"
            :error-message="form.errors.middlename"
            @blur="form.validate('middlename')"
          />

          <q-select
            v-model="form.country"
            :options="selectCountryOptions"
            label="Страна"
            lazy-rules
            :error="form.invalid('country')"
            :error-message="form.errors.country"
            @blur="form.validate('country')"
            emit-value
            map-options
          />

          <q-input
            v-model="form.region"
            label="Регион"
            lazy-rules
            :error="form.invalid('region')"
            :error-message="form.errors.region"
            @blur="form.validate('region')"
          />

          <q-input
            v-model="form.city"
            label="Город"
            lazy-rules
            :error="form.invalid('city')"
            :error-message="form.errors.city"
            @blur="form.validate('city')"
          />

          <q-select
            v-model="form.education"
            :options="options"
            label="Образование"
            lazy-rules
            :error="form.invalid('education')"
            :error-message="form.errors.education"
            @blur="form.validate('education')"
            emit-value
            map-options
          />

          <q-input
            v-model="form.phone"
            label="Телефон"
            lazy-rules
            :error="form.invalid('phone')"
            :error-message="form.errors.phone"
            @blur="form.validate('phone')"
          />

          <q-input
            v-model="form.center_name"
            label="Название центра"
            lazy-rules
            :error="form.invalid('center_name')"
            :error-message="form.errors.center_name"
            @blur="form.validate('center_name')"
          />

          <q-input
            v-model="form.curator"
            label="Куратор"
            lazy-rules
            :error="form.invalid('curator')"
            :error-message="form.errors.curator"
            @blur="form.validate('curator')"
          />

          <q-input
            v-model="form.supervisor"
            label="Руководитель"
            lazy-rules
            :error="form.invalid('supervisor')"
            :error-message="form.errors.supervisor"
            @blur="form.validate('supervisor')"
          />

          <q-input
            v-model="form.professional_interests"
            label="Профессиональные интересы"
            lazy-rules
            :error="form.invalid('professional_interests')"
            :error-message="form.errors.professional_interests"
            @blur="form.validate('professional_interests')"
          />

          <q-toggle
            v-model="form.show_email"
            label="Показывать email"
            :error="form.invalid('show_email')"
            :error-message="form.errors.show_email"
            @blur="form.validate('show_email')"
          />

          <q-toggle
            v-model="form.show_phone"
            label="Показывать телефон"
            :error="form.invalid('show_phone')"
            :error-message="form.errors.show_phone"
            @blur="form.validate('show_phone')"
          />

          <q-input
            v-model="form.telegram_profile"
            label="Telegram профиль"
            lazy-rules
            :error="form.invalid('telegram_profile')"
            :error-message="form.errors.telegram_profile"
            @blur="form.validate('telegram_profile')"
          />

          <upload-file-component
            v-model="form.files"
            label="Документы об образовании"
            :error="form.invalid('files')"
            :error-message="form.errors.files"
            @change="form.validate('files')"
            multiple
          />

          <upload-file-component
            v-model="form.additional_courses"
            label="Дополнительные курсы"
            :error="form.invalid('additional_courses')"
            :error-message="form.errors.additional_courses"
            @change="form.validate('additional_courses')"
            multiple
          />

        </q-card-section>

        <!-- Действия -->
        <q-card-actions align="right">
          <q-btn
            label="Сохранить изменения"
            type="submit"
            color="primary"
            :loading="form.processing"
            icon="save"
          />
          <q-btn
            label="Отмена"
            color="grey-6"
            flat
            @click="cancel"
            icon="close"
          />
        </q-card-actions>
      </q-card>
    </q-form>

    <!-- Прелоадер -->
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="5rem" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar, Notify } from 'quasar';
import { useForm } from 'laravel-precognition-vue';
import { useNotify } from 'src/composables/useNotify';
import useValidationNotification from 'src/composables/useValidationNotification';
import UploadFileComponent from 'components/UploadFileComponent.vue';
import type { File as FileModel } from 'src/models/File';
import { approveSpecialist, getSpecialistById, rejectSpecialist } from 'src/services/specialists';
import { EducationEnums } from 'src/enums/EducationEnums';
import { useWorldStore } from 'stores/world-store';
import { StatusEnum } from 'src/enums/StatusEnums';
import type { Specialist } from 'src/models/Specialist';
import { useStatsStore } from 'stores/stat-store';
import ImageComponent from 'components/ImageComponent.vue';

const $q = useQuasar();
const worldStore = useWorldStore();
const statStore = useStatsStore();
const router = useRouter();
const specialist = ref<Specialist | null>(null);
const props = defineProps<{
  id: number;
}>();

// Инициализация формы
const form = useForm('patch', () => `/specialists/${props.id}`, {
  photo: undefined as FileModel | undefined, // Поле для загрузки файла
  name: '',
  lastname: '',
  middlename: '',
  country: '',
  region: '',
  city: '',
  education: '',
  phone: '',
  center_name: '',
  curator: '',
  supervisor: '',
  professional_interests: '',
  show_email: false, // Логическое значение
  show_phone: false, // Логическое значение
  telegram_profile: '',
  files: [] as FileModel[],
  additional_courses: [] as FileModel[],
});

// Состояния
const loading = ref(true);

// Получение данных вебинара при монтировании
const loadSpecialistData = async () => {
  try {
    const { data } = await getSpecialistById(props.id);
    form.setData(data.data);
    specialist.value = data.data;
  } catch (e) {
    useNotify('Не удалось загрузить данные специалиста', 'negative');
    router.push('/specialists'); // Возврат на список вебинаров при ошибке
  } finally {
    loading.value = false;
  }
};

// Отправка формы
const submit = () => {
  form
    .submit()
    .then(() => {
      useNotify('Профиль специалиста успешно обновлён', 'success');
      // router.push('/specialists');
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
function enumToOptions(enums: typeof EducationEnums) {
  return Object.keys(enums)
    .filter((key) => Number.isNaN(Number(key))) // Убираем числовые ключи (обратные маппинги)
    .map((label) => {
      const value = enums[label as keyof typeof EducationEnums];
      if (label === 'Secondary') label = 'Среднее';
      if (label === 'Vocational') label = 'Среднее специальное';
      if (label === 'IncompleteHigher') label = 'Неполное высшее';
      if (label === 'Higher') label = 'Высшее';
      if (label === 'Master') label = 'Магистр';
      if (label === 'Doctorate') label = 'Доктор наук';
      return {
        label: `${label}`,
        value,
      };
    });
}

// Функция для подтверждения специалиста
const approveSpecialistHandler = async () => {
  if (!specialist.value) return;

  loading.value = true;
  try {
    const response = await approveSpecialist(specialist.value.id);
    specialist.value = response.data.specialist;
    $q.notify({
      message: response.data.message,
      color: 'positive',
      position: 'top',
      timeout: 3000,
    });
    await statStore.fetchStats();
  } finally {
    loading.value = false;
  }
};

// Функция для отклонения специалиста
const rejectSpecialistHandler = async () => {
  if (!specialist.value) return;

  loading.value = true;
  try {
    const response = await rejectSpecialist(specialist.value.id);
    specialist.value = response.data.specialist;
    $q.notify({
      message: response.data.message,
      color: 'positive',
      position: 'top',
      timeout: 3000,
    });
    await statStore.fetchStats();
  } finally {
    loading.value = false;
  }
};

const options = enumToOptions(EducationEnums);

// Вычисляемое свойство для фильтрации стран, начинающихся с буквы "A"
const selectCountryOptions = computed(() => worldStore.countries.map((country) => ({
  label: country.localized_name,
  value: country.name,
})));

// Отмена редактирования
const cancel = () => {
  router.push('/specialists');
};

// Загружаем данные при монтировании
onMounted(() => {
  loadSpecialistData();
  worldStore.fetchCountries();
});
</script>
