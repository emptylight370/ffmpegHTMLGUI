import { createApp } from 'vue'
import App from './App.vue'
import IFooter from './components/IFooter.vue'
import { i18n } from './i18n'

createApp(App).use(i18n).mount('#app')
createApp(IFooter).mount('footer')
