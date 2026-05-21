import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'

const sampleProject = {
  id: 'agent-runtime',
  name: 'Agent Runtime',
  summary: 'LLM Agent runtime with tool calling, checkpoint, and risk control',
  description: '## Overview\n\nA complete framework.',
  techStack: ['Python', 'FastAPI', 'Redis', 'MCP'],
  images: [
    { src: '/images/agent-arch.png', alt: 'Architecture diagram' },
    { src: '/images/agent-runtime.png', alt: 'Runtime screenshot' }
  ],
  links: { github: 'https://github.com/example/agent-runtime', demo: null },
  featured: true
}

describe('ProjectCard', () => {
  it('renders project name and summary', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    expect(wrapper.text()).toContain('Agent Runtime')
    expect(wrapper.text()).toContain('LLM Agent runtime')
  })

  it('renders tech tags', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    const tags = wrapper.findAll('.tech-tag')
    expect(tags).toHaveLength(4)
  })

  it('links to project detail page', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toContain('/project/agent-runtime')
  })

  it('shows featured badge when featured is true', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: sampleProject }
    })
    expect(wrapper.find('.featured-badge').exists()).toBe(true)
  })

  it('does not show featured badge when featured is false', () => {
    const notFeatured = { ...sampleProject, featured: false }
    const wrapper = mount(ProjectCard, {
      props: { project: notFeatured }
    })
    expect(wrapper.find('.featured-badge').exists()).toBe(false)
  })
})
