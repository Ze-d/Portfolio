import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectGrid from '@/components/ProjectGrid.vue'

vi.mock('@/composables/useProjects.js', () => ({
  useProjects: () => ({
    getAllProjects: () => [
      { id: 'a', name: 'Project A', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true },
      { id: 'b', name: 'Project B', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false },
      { id: 'c', name: 'Project C', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false },
      { id: 'd', name: 'Project D', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true }
    ],
    getFeaturedProjects: () => [
      { id: 'a', name: 'Project A', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true },
      { id: 'd', name: 'Project D', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true }
    ]
  })
}))

describe('ProjectGrid', () => {
  it('renders all projects', () => {
    const wrapper = mount(ProjectGrid)
    const cards = wrapper.findAll('.card')
    expect(cards).toHaveLength(4)
  })

  it('renders featured section label', () => {
    const wrapper = mount(ProjectGrid)
    expect(wrapper.text()).toContain('Featured')
  })

  it('renders all projects section label', () => {
    const wrapper = mount(ProjectGrid)
    expect(wrapper.text()).toContain('All Projects')
  })
})
