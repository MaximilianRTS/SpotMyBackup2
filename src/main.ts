import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import views
import LandingView from './views/LandingView.vue'
import SetupView from './views/SetupView.vue'
import BackupView from './views/BackupView.vue'
import BackupPreviewView from './views/BackupPreviewView.vue'
import ImportView from './views/ImportView.vue'
import GuideView from './views/GuideView.vue'
import CallbackView from './views/CallbackView.vue'

// Router configuration
const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
    meta: { title: 'MySpotBackup 2.0 - Spotify Backup Tool' }
  },
  {
    path: '/setup',
    name: 'setup',
    component: SetupView,
    meta: { title: 'Setup - MySpotBackup 2.0' }
  },
  {
    path: '/backup',
    name: 'backup',
    component: BackupView,
    meta: { title: 'Backup erstellen - MySpotBackup 2.0' }
  },
  {
    path: '/backup/preview',
    name: 'backup-preview',
    component: BackupPreviewView,
    meta: { title: 'Backup-Vorschau - MySpotBackup 2.0' }
  },
  {
    path: '/import',
    name: 'import',
    component: ImportView,
    meta: { title: 'Backup importieren - MySpotBackup 2.0' }
  },
  {
    path: '/guide',
    name: 'guide',
    component: GuideView,
    meta: { title: 'Anleitung - MySpotBackup 2.0' }
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallbackView,
    meta: { title: 'Anmeldung - MySpotBackup 2.0' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title on route change
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

// Create app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
