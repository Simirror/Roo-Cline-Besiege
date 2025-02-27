import { memo } from "react"
import { useTranslation } from "react-i18next"
import { Dropdown } from "vscrui"
import type { DropdownOption } from "vscrui"

const LanguageSwitcher = memo(() => {
	const { t, i18n } = useTranslation()

	const languageOptions: DropdownOption[] = [
		{ label: "中文", value: "zh" },
		{ label: "English", value: "en" },
		{ label: "Deutsch", value: "de" },
		{ label: "Eesti", value: "et" },
		{ label: "Français", value: "fr" },
		{ label: "Русский", value: "ru" },
	]

	const handleLanguageChange = (value: string) => {
		i18n.changeLanguage(value)
	}

	return (
		<div className="setting-section">
			<h3>{t("settings.language")}</h3>
			<Dropdown
				options={languageOptions}
				value={i18n.language}
				onChange={(value) => {
					if (typeof value === "string") {
						handleLanguageChange(value)
					} else if (typeof value === "object" && value !== null) {
						handleLanguageChange(value.value as string)
					}
				}}
			/>
		</div>
	)
})

LanguageSwitcher.displayName = "LanguageSwitcher"

export default LanguageSwitcher
