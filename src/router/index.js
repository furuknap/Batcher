// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ManageProducts from '../views/ManageProducts.vue'
import ManageBatches from '../views/ManageBatches.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import DataManagement from '../views/DataManagement.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/manage-products', name: 'ManageProducts', component: ManageProducts },
  { path: '/manage-batches', name: 'ManageBatches', component: ManageBatches },
  { path: '/about', name: 'About', component: About },
  { path: '/data-management', name: 'DataManagement', component: DataManagement },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
