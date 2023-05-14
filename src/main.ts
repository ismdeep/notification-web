import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import BaseLayout from './layout/BaseLayout.vue'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Group from './views/Group.vue'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/group/:id', name: 'Group', component: Group},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .component('base-layout', BaseLayout)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
