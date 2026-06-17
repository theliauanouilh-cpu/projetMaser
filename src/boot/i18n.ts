import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'


export type MessageSchema = typeof messages['fr-FR']
export type AvailableLocales = keyof typeof messages

const i18n = createI18n<[MessageSchema], AvailableLocales>({
  legacy: false,
  locale: 'fr-FR',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages
})

export default defineBoot(({ app }) => {
  app.use(i18n)
})

export { i18n }
