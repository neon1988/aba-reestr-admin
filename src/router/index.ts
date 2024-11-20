import {
  createMemoryHistory, createRouter, createWebHashHistory, createWebHistory,
} from 'vue-router';
import { useAuthStore } from 'src/stores/auth'; // Импортируем store для проверки аутентификации
import { defineRouter } from '#q-app/wrappers';
import routes from './routes';

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Включение истории в роутере
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Глобальный навигационный guard для проверки аутентификации
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Если маршрут требует аутентификации
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      // Перенаправляем на страницу входа
      next({ name: 'login' });
    } else {
      // Разрешаем переход
      next();
    }
  });

  return Router;
});
