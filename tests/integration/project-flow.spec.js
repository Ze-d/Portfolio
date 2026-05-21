import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
  createRouter: () => ({}),
  createWebHashHistory: () => ({}),
  useRoute: () => ({ params: { id: 'test-project' } })
}))

const mockProjects = [
  {
    id: 'test-project',
    name: 'Test Project',
    summary: 'A test',
    description: '# Test',
    techStack: ['Vue'],
    images: [],
    links: { github: null, demo: null },
    featured: false
  }
]

vi.mock('@/composables/useProjects.js', () => ({
  useProjects: () => ({
    getAllProjects: () => mockProjects,
    getFeaturedProjects: () => [],
    getProjectById: (id) => mockProjects.find(p => p.id === id)
  })
}))

import HomePage from '@/views/HomePage.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

describe('project-flow', () => {
  it('HomePage renders HeroSection and ProjectGrid', () => {
    const wrapper = mount(HomePage, {
      global: { stubs: { HeroSection: true, ProjectGrid: true } }
    })
    expect(wrapper.findComponent({ name: 'HeroSection' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ProjectGrid' }).exists()).toBe(true)
  })

  it('ProjectDetail renders with project data', () => {
    const wrapper = mount(ProjectDetail, {
      global: {
        stubs: { ImageGallery: true }
      }
    })
    expect(wrapper.text()).toContain('Test Project')
  })
})
