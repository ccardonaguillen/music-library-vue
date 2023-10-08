/*jshint esversion: 9 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import { ObserveVisibility } from 'vue-observe-visibility'

const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual
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
