import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/project/:id', name: 'project-detail', component: ProjectDetail },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
