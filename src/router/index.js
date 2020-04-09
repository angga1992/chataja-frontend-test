import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chatroom from '../views/Chatroom.vue'
import Login from '../views/Login.vue'
import Addingdata from '../views/Addingdata.vue'

import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Chatroom,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Addingdata',
    name: 'update',
    component: Addingdata,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  if(requireAuth && !currentUser) next('Login');
  else if(!requireAuth && currentUser) next('/');
  else next();
})

export default router
