import { createI18n } from 'vue-i18n'
import enUS from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'
import jaJP from './locales/ja.json'

// 从浏览器获取默认语言，并确保在支持的语言列表中
const supportedLangs = ['en-US', 'zh-CN', 'zh-TW', 'ja-JP']
const browserLang = window.navigator.language
const initialLang = supportedLangs.includes(browserLang) ? browserLang : 'en-US'

export const i18n = createI18n({
  legacy: false,
  locale: initialLang,
  fallbackLocale: 'en-US',
  messages: {
    en: enUS,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    ja: jaJP,
  },
})
