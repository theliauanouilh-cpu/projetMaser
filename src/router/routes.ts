import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Index page uses MainLayout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Other pages use a different layout (create layouts/OtherLayout.vue)
  {
    path: '/',
    component: () => import('layouts/AlternateLayout.vue'),
    children: [
      { path: 'panier', component: () => import('pages/PanierPage.vue') },
      { path: 'pay', component: () => import('pages/PaymentPage.vue') },
      { path: 'client', component: () => import('pages/ClientPage.vue') },
      { path: 'connection', component: () => import('pages/ConnectionPage.vue') },
      { path: 'inscription', component: () => import('pages/RegistrationPage.vue') },
      { path: ':catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') },
    ],
  },
];

export default routes;
