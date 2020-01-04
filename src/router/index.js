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
    path: '/products/:type/:typeId',
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
    path: '/upload',
    name: 'upload',
    component: () => import('../views/Upload.vue')
  }
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
