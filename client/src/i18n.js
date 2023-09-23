import { createI18n } from 'vue-i18n'
import english from '@/utils/i18n/english.json'
import spanish from '@/utils/i18n/spanish.json'

export const messages = {
  en: english,
  es: spanish
}

export const i18n = new createI18n({
  locale: 'es', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})
