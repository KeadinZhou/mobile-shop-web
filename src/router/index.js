import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path: '/second',
    name: 'second',
    component: () => import('../views/Second.vue')
  },{
    path: '/products/:type',
    name: 'products',
    component: () => import('../views/Products.vue')
  },{
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/Product.vue')
  },{
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },{
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },{
    path: '/admin/home',
    name: 'admin-home',
    component: () => import('../views/admin-page/HomeEdit.vue')
  },{
    path: '/admin/type-edit',
    name: 'type-edit',
    component: () => import('../views/admin-page/TypeEdit.vue')
  },{
    path: '/admin/type1',
    name: 'type-choose-1',
    component: () => import('../views/admin-page/TypeChoose1.vue')
  },{
    path: '/admin/type2',
    name: 'type-choose-2',
    component: () => import('../views/admin-page/TypeChoose2.vue')
  },{
    path: '/admin/item/add',
    name: 'item-add',
    component: () => import('../views/admin-page/ItemAdd.vue')
  },{
    path: '/admin/item/edit/:id',
    name: 'item-edit',
    component: () => import('../views/admin-page/ItemEdit.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
