import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechTag from '@/components/TechTag.vue'

describe('TechTag', () => {
  it('renders the text prop', () => {
    const wrapper = mount(TechTag, { props: { text: 'Vue.js' } })
    expect(wrapper.text()).toBe('Vue.js')
    expect(wrapper.classes()).toContain('tech-tag')
  })
})
