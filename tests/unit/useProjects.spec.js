import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/data/projects.json', () => ({
  default: { projects: [] }
}))

describe('useProjects', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('getAllProjects returns all projects', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: [
        { id: 'a', name: 'Project A', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false },
        { id: 'b', name: 'Project B', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true }
      ] }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getAllProjects } = useProjects()
    const result = getAllProjects()
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('a')
  })

  it('getFeaturedProjects returns only featured projects', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: [
        { id: 'x', name: 'X', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false },
        { id: 'y', name: 'Y', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: true }
      ] }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getFeaturedProjects } = useProjects()
    const result = getFeaturedProjects()
    expect(result).toHaveLength(1)
    expect(result[0].featured).toBe(true)
  })

  it('getProjectById returns correct project', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: [
        { id: 'abc', name: 'Found', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false }
      ] }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getProjectById } = useProjects()
    const result = getProjectById('abc')
    expect(result.name).toBe('Found')
  })

  it('getProjectById returns undefined for unknown id', async () => {
    vi.doMock('@/data/projects.json', () => ({
      default: { projects: [
        { id: 'x', name: 'X', summary: '', description: '', techStack: [], images: [], links: { github: null, demo: null }, featured: false }
      ] }
    }))
    const { useProjects } = await import('@/composables/useProjects.js')
    const { getProjectById } = useProjects()
    const result = getProjectById('nonexistent')
    expect(result).toBeUndefined()
  })
})
