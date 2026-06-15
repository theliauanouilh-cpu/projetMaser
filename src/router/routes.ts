import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        props: true,
      },
      {
        path: 'panier',
        component: () => import('pages/PanierPage.vue'),
      },
      {
        path: 'pay',
        component: () => import('pages/PaymentPage.vue'),
      },
      {
        path: 'client',
        component: () => import('pages/ClientPage.vue'),
      },
       {
        path: 'connection', 
        component: () => import('pages/ConnectionPage.vue')
      },
      {
        path: 'inscription', 
        component: () => import('pages/RegistrationPage.vue')
      }
    ],
  },
];
 
export default routes;

