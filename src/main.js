/*jshint esversion: 9 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
