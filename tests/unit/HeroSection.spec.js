import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'

describe('HeroSection', () => {
  it('renders name and tagline', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('Your Name')
    expect(wrapper.text()).toContain('Developer')
  })

  it('renders social links', () => {
    const wrapper = mount(HeroSection)
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
