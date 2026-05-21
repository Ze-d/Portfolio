import { describe, it, expect } from 'vitest'
import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = { template: '<div>Home</div>' }
const ProjectDetail = { template: '<div>Detail</div>' }

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/project/:id', name: 'project-detail', component: ProjectDetail },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

describe('router', () => {
  it('resolves / to HomePage', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('resolves /project/:id to ProjectDetail', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/project/agent-runtime')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('project-detail')
    expect(router.currentRoute.value.params.id).toBe('agent-runtime')
  })

  it('redirects unknown routes to /', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    })
    router.push('/nonexistent')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })
})
