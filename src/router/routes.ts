import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Auth/LoginPage.vue') },
      {
        path: '', name: 'home', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true },
      },
      {
        path: 'specialists', name: 'specialists.index', component: () => import('pages/Specialists/IndexPage.vue'), meta: { requiresAuth: true },
      },
      {
        path: 'specialists/:id', name: 'specialists.show', component: () => import('pages/Specialists/ShowPage.vue'), meta: { requiresAuth: true }, props: true,
      },
      {
        path: 'centers', name: 'centers.index', component: () => import('pages/Centers/IndexPage.vue'), meta: { requiresAuth: true },
      },
      {
        path: 'centers/:id', name: 'centers.show', component: () => import('pages/Centers/ShowPage.vue'), meta: { requiresAuth: true }, props: true,
      },
      {
        path: 'users', name: 'users.index', component: () => import('pages/Users/IndexPage.vue'), meta: { requiresAuth: true },
      },
      {
        path: 'users/:id/edit', name: 'users.edit', component: () => import('pages/Users/EditPage.vue'), meta: { requiresAuth: true }, props: (route) => ({ id: Number(route.params.id) }),
      },
    ],
  },

  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
