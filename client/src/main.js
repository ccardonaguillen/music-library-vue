/*jshint esversion: 9 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VAutocomplete } from 'vuetify/components'
import { VSelect } from 'vuetify/components'
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import { ObserveVisibility } from 'vue-observe-visibility'

const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTableVirtual
  },
  aliases: {
    VFilterAutocomplete: VAutocomplete,
    VFilterSelect: VSelect
  },
  defaults: {
    VFilterAutocomplete: {
      hideDetails: true,
      density: 'compact',
      variant: 'outlined',
      rounded: true
    },
    VFilterSelect: {
      hideDetails: true,
      density: 'compact',
      variant: 'outlined',
      rounded: true
    },
    VForm: {
      VTextField: {
        variant: 'outlined',
        density: 'compact'
      },
      VCombobox: {
        variant: 'outlined',
        density: 'compact'
      },
      VSelect: {
        variant: 'outlined',
        density: 'compact'
      }
    }
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.directive('observe-visibility', {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance
    ObserveVisibility.bind(el, binding, vnode)
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind
})

app.mount('#app')
