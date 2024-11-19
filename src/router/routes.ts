import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'specialists', name: 'specialists.index', component: () => import('pages/Specialists/IndexPage.vue') },
      {
        path: 'specialists/:id', name: 'specialists.show', component: () => import('pages/Specialists/ShowPage.vue'), props: true,
      },
      { path: 'centers', name: 'centers.index', component: () => import('pages/Centers/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
