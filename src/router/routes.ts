import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Auth/LoginPage.vue') },
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'specialists',
        name: 'specialists.index',
        component: () => import('pages/Specialists/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'specialists/:id',
        name: 'specialists.show',
        component: () => import('pages/Specialists/ShowPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: 'specialists/:id/edit',
        name: 'specialists.edit',
        component: () => import('pages/Specialists/EditPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: 'centers',
        name: 'centers.index',
        component: () => import('pages/Centers/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'centers/:id',
        name: 'centers.show',
        component: () => import('pages/Centers/ShowPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'users',
        name: 'users.index',
        component: () => import('pages/Users/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/:id/edit',
        name: 'users.edit',
        component: () => import('pages/Users/EditPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: 'bulletins',
        name: 'bulletins.index',
        component: () => import('pages/Bulletins/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'bulletins/:id',
        name: 'bulletins.show',
        component: () => import('pages/Bulletins/ShowPage.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: 'webinars',
        name: 'webinars.index',
        component: () => import('pages/Webinars/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'webinars/create',
        name: 'webinars.create',
        component: () => import('pages/Webinars/CreatePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'webinars/:id/edit',
        name: 'webinars.edit',
        component: () => import('pages/Webinars/EditPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: 'worksheets',
        name: 'worksheets.index',
        component: () => import('pages/Worksheets/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'worksheets/create',
        name: 'worksheets.create',
        component: () => import('pages/Worksheets/CreatePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'worksheets/:id/edit',
        name: 'worksheets.edit',
        component: () => import('pages/Worksheets/EditPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
      },
      {
        path: 'conferences',
        name: 'conferences.index',
        component: () => import('pages/Conferences/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'conferences/create',
        name: 'conferences.create',
        component: () => import('pages/Conferences/CreatePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'conferences/:id/edit',
        name: 'conferences.edit',
        component: () => import('pages/Conferences/EditPage.vue'),
        meta: { requiresAuth: true },
        props: (route) => ({ id: Number(route.params.id) }),
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
