// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import en from './i18n/en.json'
import es from './i18n/es.json'

//import 'vite-plugin-pwa/dist/style.css' // If any styles are needed

const pinia = createPinia()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
