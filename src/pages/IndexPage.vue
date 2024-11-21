<template>
  <q-page padding>
    <!-- Заголовок -->
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Добро пожаловать в админ-панель "Рестра"</div>
      </q-toolbar-title>
    </q-toolbar>

    <!-- Секция описания -->
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h5 text-primary">О приложении</div>
        <q-separator class="q-my-sm"/>
        <div>
          Это администраторская панель, где вы можете управлять пользователями, центрами и
          специалистами,
          а также редактировать информацию на сайте. Ваша главная задача — поддерживать актуальность
          и достоверность данных.
        </div>
      </q-card-section>
    </q-card>

    <!-- Функционал -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h5 text-primary">Основные функции</div>
        <q-separator class="q-my-md"/>
        <div class="row q-gutter-md">
          <q-card class="col-md-3">
            <q-card-section>
              <q-icon name="home_work" size="40px" class="text-primary"/>
              <div class="text-h6 q-mt-sm">Проверка центров</div>
              <div class="q-mt-sm">
                Просматривайте заявки на регистрацию центров, подтверждайте их или отклоняйте. Вы
                также можете
                увидеть подробную информацию о центре, включая контактные данные и статус.
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                @click="router.push({ name: 'centers.index'})"
                label="Перейти" color="primary" icon="arrow_forward" flat/>
            </q-card-actions>
          </q-card>

          <q-card class="col-md-3">
            <q-card-section>
              <q-icon name="badge" size="40px" class="text-primary"/>
              <div class="text-h6 q-mt-sm">Проверка специалистов</div>
              <div class="q-mt-sm">
                Утверждайте заявки от специалистов, просматривайте их квалификации, контактные
                данные и загруженные документы.
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                @click="router.push({ name: 'specialists.index'})"
                label="Перейти" color="primary" icon="arrow_forward" flat/>
            </q-card-actions>
          </q-card>

          <q-card class="col-md-3">
            <q-card-section>
              <q-icon name="edit" size="40px" class="text-primary"/>
              <div class="text-h6 q-mt-sm">Редактирование пользователей</div>
              <div class="q-mt-sm">
                Управляйте аккаунтами пользователей: обновляйте их информацию, блокируйте при
                необходимости или восстанавливайте доступ.
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                @click="router.push({ name: 'users.index'})"
                label="Перейти" color="primary" icon="arrow_forward" flat/>
            </q-card-actions>
          </q-card>
        </div>
      </q-card-section>
    </q-card>

    <!-- Статистика -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h5 text-primary">Статистика</div>
        <q-separator class="q-my-sm"/>
        <div class="row text-center q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-statistics
              title="Центры"
              value="125"
              icon="home_work"
              color="blue"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-statistics
              title="Специалисты"
              value="58"
              icon="badge"
              color="green"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-statistics
              title="Пользователи"
              value="789"
              icon="person"
              color="purple"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
