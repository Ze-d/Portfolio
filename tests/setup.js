import { config } from '@vue/test-utils'

config.global.stubs = {
  'router-link': {
    props: ['to'],
    template: '<a :href="to"><slot /></a>'
  },
  'router-view': {
    template: '<div><slot /></div>'
  }
}
