import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'produit/:id?',
        component: () => import('pages/ProduitPage.vue'),
        props: true,
      },
      {
        path: 'panier',
        component: () => import('pages/PanierPage.vue'),
      },
      {
        path: 'page2',
        component: () => import('pages/ProduitPage2.vue'),
      },
    ],
  },
];

export default routes;
