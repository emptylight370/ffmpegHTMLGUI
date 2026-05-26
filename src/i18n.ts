import { createI18n } from 'vue-i18n'
import enUS from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'
import jaJP from './locales/ja.json'

// 支持的语言列表（全称格式，与 messages key、<select> option value 保持一致）
const supportedLangs = ['en-US', 'zh-CN', 'zh-TW', 'ja-JP']

// 从浏览器获取默认语言，支持精确匹配 + 语言前缀匹配
function getInitialLang(): string {
  const browserLang: string = window.navigator.language
  // 1. 精确匹配
  if ((supportedLangs as readonly string[]).includes(browserLang)) return browserLang
  // 2. 按语言前缀匹配（如 zh-HK → zh-CN, en-GB → en-US）
  const prefix = browserLang.split('-')[0]!
  for (const lang of supportedLangs) {
    if (lang.startsWith(prefix)) return lang
  }
  return 'en-US'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLang(),
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'ja-JP': jaJP,
  },
})
