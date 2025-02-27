import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslation from "./locales/en.json"
import zhTranslation from "./locales/zh.json"
import deTranslation from "./locales/de.json"
import etTranslation from "./locales/et.json"
import frTranslation from "./locales/fr.json"
import ruTranslation from "./locales/ru.json"

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		zh: {
			translation: zhTranslation,
		},
		de: {
			translation: deTranslation,
		},
		et: {
			translation: etTranslation,
		},
		fr: {
			translation: frTranslation,
		},
		ru: {
			translation: ruTranslation,
		},
	},
	lng: "zh", // 默认语言
	fallbackLng: "zh",
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
