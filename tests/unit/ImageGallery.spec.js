import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageGallery from '@/components/ImageGallery.vue'

const images = [
  { src: '/img1.png', alt: 'Image 1' },
  { src: '/img2.png', alt: 'Image 2' },
  { src: '/img3.png', alt: 'Image 3' }
]

describe('ImageGallery', () => {
  it('shows placeholder when no images', () => {
    const wrapper = mount(ImageGallery, { props: { images: [] } })
    expect(wrapper.text()).toContain('No screenshots')
  })

  it('renders main image from first image', () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const mainImg = wrapper.find('.gallery-main img')
    expect(mainImg.attributes('src')).toBe('/img1.png')
    expect(mainImg.attributes('alt')).toBe('Image 1')
  })

  it('renders thumbnail for each image', () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    expect(thumbs).toHaveLength(3)
  })

  it('clicking thumbnail changes active image', async () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    await thumbs[1].trigger('click')
    const mainImg = wrapper.find('.gallery-main img')
    expect(mainImg.attributes('src')).toBe('/img2.png')
  })

  it('active thumbnail has active class', async () => {
    const wrapper = mount(ImageGallery, { props: { images } })
    const thumbs = wrapper.findAll('.gallery-thumb')
    await thumbs[2].trigger('click')
    expect(thumbs[2].classes()).toContain('active')
    expect(thumbs[0].classes()).not.toContain('active')
  })
})
