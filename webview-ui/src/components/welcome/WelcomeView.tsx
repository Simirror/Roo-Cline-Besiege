import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)

	const disableLetsGoButton = apiErrorMessage !== null && apiErrorMessage !== undefined

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, padding: "0 20px" }}>
			<h2>嘿,这里是Roo Cline Besiege!</h2>
			<p>这是一个特化的Cline Fork(其实是Roo Code的一个分支), 它可以让你在VSCode中使用Cline的AI功能.</p>
			<p> 我删除了很多在某些区域无法使用的API提供商, 并添加了一些新的API提供商.</p>
			<p> 当然, 还有一些汉化, 这些并不很重要, 毕竟这个扩展的主要目的是为了使用Cline的AI功能.</p>

			<b>让我们开始吧, 我们需要选择一个API 提供商</b>

			<div style={{ marginTop: "10px" }}>
				<ApiOptions />
				<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} style={{ marginTop: "3px" }}>
					Let's go!
				</VSCodeButton>
			</div>
		</div>
	)
}

export default WelcomeView
