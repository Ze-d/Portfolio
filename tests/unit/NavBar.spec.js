import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar', () => {
  it('renders site title', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.text()).toContain('Portfolio')
  })

  it('renders nav links', () => {
    const wrapper = mount(NavBar)
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
