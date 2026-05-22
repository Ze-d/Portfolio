import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'

describe('HeroSection', () => {
  it('renders name and tagline', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.text()).toContain('JinYuan Zhang')
    expect(wrapper.text()).toContain('AI Engineer')
  })

  it('renders social links', () => {
    const wrapper = mount(HeroSection)
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
