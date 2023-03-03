import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import BaseLayout from './layout/BaseLayout.vue'
import AdminBaseLayout from './layout/AdminBaseLayout.vue'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Group from './views/Group.vue'

import About from './views/About.vue'
import Blogs from './views/Blogs.vue'

import AdminHome from './views/admin/Home.vue'
import AdminStatus from './views/admin/Status.vue'
import AdminYouTube from './views/admin/YouTube.vue'

const routes = [
  {path: '/login', name: 'Login', component: Login},
  {path: '/', name: 'Home', component: Home},
  {path: '/group/:id', name: 'Group', component: Group},



  {path: '/blogs', name: 'Blogs', component: Blogs},
  {path: '/about', name: 'About', component: About},

  {path: '/admin', name: 'admin', component: AdminHome},
  {path: '/admin/status', name: 'AdminStatus', component: AdminStatus},
  {path: '/admin/youtube', name: 'AdminYouTube', component: AdminYouTube},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .component('base-layout', BaseLayout)
  .component('admin-base-layout', AdminBaseLayout)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
