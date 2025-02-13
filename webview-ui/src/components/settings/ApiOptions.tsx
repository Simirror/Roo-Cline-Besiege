import { Checkbox, Dropdown, Pane } from "vscrui"
import type { DropdownOption } from "vscrui"
import { VSCodeLink, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
import { useEvent, useInterval } from "react-use"
import {
	ApiConfiguration,
	ModelInfo,
	aliyunDefaultModelId,
	aliyunModels,
	anthropicDefaultModelId,
	anthropicModels,
	azureOpenAiDefaultApiVersion,
	baiduDefaultModelId,
	baiduModels,
	deepSeekDefaultModelId,
	deepSeekModels,
	geminiModels,
	openAiModelInfoSaneDefaults,
	siliconflowDefaultModelId,
	siliconflowModels,
} from "../../../../src/shared/api"
import { ExtensionMessage } from "../../../../src/shared/ExtensionMessage"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { vscode } from "../../utils/vscode"

import { ModelDescriptionMarkdown, OPENROUTER_MODEL_PICKER_Z_INDEX } from "./OpenRouterModelPicker"
import OpenAiModelPicker from "./OpenAiModelPicker"

interface ApiOptionsProps {
	apiErrorMessage?: string
	modelIdErrorMessage?: string
}

const ApiOptions = ({ modelIdErrorMessage }: ApiOptionsProps) => {
	const { apiConfiguration, handleInputChange } = useExtensionState()
	const [ollamaModels, setOllamaModels] = useState<string[]>([])

	const [azureApiVersionSelected, setAzureApiVersionSelected] = useState(!!apiConfiguration?.azureApiVersion)

	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

	const { selectedProvider, selectedModelId, selectedModelInfo } = useMemo(() => {
		return normalizeApiConfiguration(apiConfiguration)
	}, [apiConfiguration])

	// Poll ollama/lmstudio models
	const requestLocalModels = useCallback(() => {
		if (selectedProvider === "ollama") {
			vscode.postMessage({ type: "requestOllamaModels", text: apiConfiguration?.ollamaBaseUrl })
		} else if (selectedProvider === "lmstudio") {
			vscode.postMessage({ type: "requestLmStudioModels", text: apiConfiguration?.lmStudioBaseUrl })
		} else if (selectedProvider === "vscode-lm") {
			vscode.postMessage({ type: "requestVsCodeLmModels" })
		}
	}, [selectedProvider, apiConfiguration?.ollamaBaseUrl, apiConfiguration?.lmStudioBaseUrl])
	useEffect(() => {
		if (selectedProvider === "ollama" || selectedProvider === "lmstudio" || selectedProvider === "vscode-lm") {
			requestLocalModels()
		}
	}, [selectedProvider, requestLocalModels])
	useInterval(
		requestLocalModels,
		selectedProvider === "ollama" || selectedProvider === "lmstudio" || selectedProvider === "vscode-lm"
			? 2000
			: null,
	)
	const handleMessage = useCallback((event: MessageEvent) => {
		const message: ExtensionMessage = event.data
		if (message.type === "ollamaModels" && message.ollamaModels) {
			setOllamaModels(message.ollamaModels)
		}
	}, [])
	useEvent("message", handleMessage)

	const createDropdown = (models: Record<string, ModelInfo>) => {
		const options: DropdownOption[] = [
			{ value: "", label: "Select a model..." },
			...Object.keys(models).map((modelId) => ({
				value: modelId,
				label: modelId,
			})),
		]
		return (
			<Dropdown
				id="model-id"
				value={selectedModelId}
				onChange={(value: unknown) => {
					handleInputChange("apiModelId")({
						target: {
							value: (value as DropdownOption).value,
						},
					})
				}}
				style={{ width: "100%" }}
				options={options}
			/>
		)
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
			<div className="dropdown-container">
				<label htmlFor="api-provider">
					<span style={{ fontWeight: 500 }}>API 提供商</span>
				</label>
				<Dropdown
					id="api-provider"
					value={selectedProvider}
					onChange={(value: unknown) => {
						handleInputChange(
							"apiProvider",
							true,
						)({
							target: {
								value: (value as DropdownOption).value,
							},
						})
					}}
					style={{ minWidth: 130, position: "relative", zIndex: OPENROUTER_MODEL_PICKER_Z_INDEX + 1 }}
					options={[
						{ value: "deepseek", label: "DeepSeek" },
						{ value: "openai", label: "OpenAI Compatible" },
						{ value: "ollama", label: "Ollama" },
						{ value: "ctyun", label: "TCYun(天翼云)" },
						{ value: "siliconflow", label: "SiliconFlow(硅基流动)" },
						{ value: "baidu", label: "baidu(百度云)" },
						{ value: "volcengine", label: "volcengine(字写火山引擎)" },
						{ value: "aliyun", label: "aliyun(阿里云)" },
					]}
				/>
			</div>

			{selectedProvider === "openai" && (
				<div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
					<VSCodeTextField
						value={apiConfiguration?.openAiBaseUrl || ""}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("openAiBaseUrl")}
						placeholder={"Enter base URL..."}>
						<span style={{ fontWeight: 500 }}>Base URL</span>
					</VSCodeTextField>
					<VSCodeTextField
						value={apiConfiguration?.openAiApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("openAiApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>API Key</span>
					</VSCodeTextField>
					<OpenAiModelPicker />
					<div style={{ display: "flex", alignItems: "center" }}>
						<Checkbox
							checked={apiConfiguration?.openAiStreamingEnabled ?? true}
							onChange={(checked: boolean) => {
								handleInputChange("openAiStreamingEnabled")({
									target: { value: checked },
								})
							}}>
							Enable streaming
						</Checkbox>
					</div>
					<Checkbox
						checked={apiConfiguration?.openAiUseAzure ?? false}
						onChange={(checked: boolean) => {
							handleInputChange("openAiUseAzure")({
								target: { value: checked },
							})
						}}>
						Use Azure
					</Checkbox>
					<Checkbox
						checked={azureApiVersionSelected}
						onChange={(checked: boolean) => {
							setAzureApiVersionSelected(checked)
							if (!checked) {
								handleInputChange("azureApiVersion")({
									target: {
										value: "",
									},
								})
							}
						}}>
						Set Azure API version
					</Checkbox>
					{azureApiVersionSelected && (
						<VSCodeTextField
							value={apiConfiguration?.azureApiVersion || ""}
							style={{ width: "100%", marginTop: 3 }}
							onInput={handleInputChange("azureApiVersion")}
							placeholder={`Default: ${azureOpenAiDefaultApiVersion}`}
						/>
					)}

					<div
						style={{
							marginTop: 15,
						}}
					/>
					<Pane
						title="Model Configuration"
						open={false}
						actions={[
							{
								iconName: "refresh",
								onClick: () =>
									handleInputChange("openAiCustomModelInfo")({
										target: { value: openAiModelInfoSaneDefaults },
									}),
							},
						]}>
						<div
							style={{
								padding: 15,
								backgroundColor: "var(--vscode-editor-background)",
							}}>
							<p
								style={{
									fontSize: "12px",
									color: "var(--vscode-descriptionForeground)",
									margin: "0 0 15px 0",
									lineHeight: "1.4",
								}}>
								Configure the capabilities and pricing for your custom OpenAI-compatible model. <br />
								Be careful for the model capabilities, as they can affect how Roo Code can work.
							</p>

							{/* Capabilities Section */}
							<div
								style={{
									marginBottom: 20,
									padding: 12,
									backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
									borderRadius: 4,
								}}>
								<span
									style={{
										fontWeight: 500,
										fontSize: "12px",
										display: "block",
										marginBottom: 12,
										color: "var(--vscode-editor-foreground)",
									}}>
									Model Capabilities
								</span>
								<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
									<div className="token-config-field">
										<VSCodeTextField
											value={
												apiConfiguration?.openAiCustomModelInfo?.maxTokens?.toString() ||
												openAiModelInfoSaneDefaults.maxTokens?.toString() ||
												""
											}
											type="text"
											style={{
												width: "100%",
												borderColor: (() => {
													const value = apiConfiguration?.openAiCustomModelInfo?.maxTokens
													if (!value) return "var(--vscode-input-border)"
													return value > 0
														? "var(--vscode-charts-green)"
														: "var(--vscode-errorForeground)"
												})(),
											}}
											title="Maximum number of tokens the model can generate in a single response"
											onChange={(e: any) => {
												const value = parseInt(e.target.value)
												handleInputChange("openAiCustomModelInfo")({
													target: {
														value: {
															...(apiConfiguration?.openAiCustomModelInfo ||
																openAiModelInfoSaneDefaults),
															maxTokens: isNaN(value) ? undefined : value,
														},
													},
												})
											}}
											placeholder="e.g. 4096">
											<span style={{ fontWeight: 500 }}>Max Output Tokens</span>
										</VSCodeTextField>
										<div
											style={{
												fontSize: "11px",
												color: "var(--vscode-descriptionForeground)",
												marginTop: 4,
												display: "flex",
												alignItems: "center",
												gap: 4,
											}}>
											<i className="codicon codicon-info" style={{ fontSize: "12px" }}></i>
											<span>
												Maximum number of tokens the model can generate in a response. <br />
												(-1 is depend on server)
											</span>
										</div>
									</div>

									<div className="token-config-field">
										<VSCodeTextField
											value={
												apiConfiguration?.openAiCustomModelInfo?.contextWindow?.toString() ||
												openAiModelInfoSaneDefaults.contextWindow?.toString() ||
												""
											}
											type="text"
											style={{
												width: "100%",
												borderColor: (() => {
													const value = apiConfiguration?.openAiCustomModelInfo?.contextWindow
													if (!value) return "var(--vscode-input-border)"
													return value > 0
														? "var(--vscode-charts-green)"
														: "var(--vscode-errorForeground)"
												})(),
											}}
											title="Total number of tokens (input + output) the model can process in a single request"
											onChange={(e: any) => {
												const parsed = parseInt(e.target.value)
												handleInputChange("openAiCustomModelInfo")({
													target: {
														value: {
															...(apiConfiguration?.openAiCustomModelInfo ||
																openAiModelInfoSaneDefaults),
															contextWindow:
																e.target.value === ""
																	? undefined
																	: isNaN(parsed)
																		? openAiModelInfoSaneDefaults.contextWindow
																		: parsed,
														},
													},
												})
											}}
											placeholder="e.g. 128000">
											<span style={{ fontWeight: 500 }}>Context Window Size</span>
										</VSCodeTextField>
										<div
											style={{
												fontSize: "11px",
												color: "var(--vscode-descriptionForeground)",
												marginTop: 4,
												display: "flex",
												alignItems: "center",
												gap: 4,
											}}>
											<i className="codicon codicon-info" style={{ fontSize: "12px" }}></i>
											<span>
												Total tokens (input + output) the model can process. This will help Roo
												Code run correctly.
											</span>
										</div>
									</div>

									<div
										style={{
											backgroundColor: "var(--vscode-editor-background)",
											padding: "12px",
											borderRadius: "4px",
											marginTop: "8px",
											border: "1px solid var(--vscode-input-border)",
											transition: "background-color 0.2s ease",
										}}>
										<span
											style={{
												fontSize: "11px",
												fontWeight: 500,
												color: "var(--vscode-editor-foreground)",
												display: "block",
												marginBottom: "10px",
											}}>
											Model Features
										</span>

										<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
											<div className="feature-toggle">
												<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
													<Checkbox
														checked={
															apiConfiguration?.openAiCustomModelInfo?.supportsImages ??
															openAiModelInfoSaneDefaults.supportsImages
														}
														onChange={(checked: boolean) => {
															handleInputChange("openAiCustomModelInfo")({
																target: {
																	value: {
																		...(apiConfiguration?.openAiCustomModelInfo ||
																			openAiModelInfoSaneDefaults),
																		supportsImages: checked,
																	},
																},
															})
														}}>
														<span style={{ fontWeight: 500 }}>Image Support</span>
													</Checkbox>
													<i
														className="codicon codicon-info"
														title="Enable if the model can process and understand images in the input. Required for image-based assistance and visual code understanding."
														style={{
															fontSize: "12px",
															color: "var(--vscode-descriptionForeground)",
															cursor: "help",
														}}
													/>
												</div>
												<p
													style={{
														fontSize: "11px",
														color: "var(--vscode-descriptionForeground)",
														marginLeft: "24px",
														marginTop: "4px",
														lineHeight: "1.4",
													}}>
													Allows the model to analyze and understand images, essential for
													visual code assistance
												</p>
											</div>

											<div
												className="feature-toggle"
												style={{
													borderTop: "1px solid var(--vscode-input-border)",
													paddingTop: "12px",
												}}>
												<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
													<Checkbox
														checked={
															apiConfiguration?.openAiCustomModelInfo
																?.supportsComputerUse ?? false
														}
														onChange={(checked: boolean) => {
															handleInputChange("openAiCustomModelInfo")({
																target: {
																	value: {
																		...(apiConfiguration?.openAiCustomModelInfo ||
																			openAiModelInfoSaneDefaults),
																		supportsComputerUse: checked,
																	},
																},
															})
														}}>
														<span style={{ fontWeight: 500 }}>Computer Use</span>
													</Checkbox>
													<i
														className="codicon codicon-info"
														title="Enable if the model can interact with your computer through commands and file operations. Required for automated tasks and file modifications."
														style={{
															fontSize: "12px",
															color: "var(--vscode-descriptionForeground)",
															cursor: "help",
														}}
													/>
												</div>
												<p
													style={{
														fontSize: "11px",
														color: "var(--vscode-descriptionForeground)",
														marginLeft: "24px",
														marginTop: "4px",
														lineHeight: "1.4",
													}}>
													This model feature is for computer use like sonnet 3.5 support
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Pricing Section */}
							<div
								style={{
									backgroundColor: "var(--vscode-editor-inactiveSelectionBackground)",
									padding: "12px",
									borderRadius: "4px",
									marginTop: "15px",
								}}>
								<div style={{ marginBottom: "12px" }}>
									<span
										style={{
											fontWeight: 500,
											fontSize: "12px",
											color: "var(--vscode-editor-foreground)",
											display: "block",
											marginBottom: "4px",
										}}>
										Model Pricing
									</span>
									<span
										style={{
											fontSize: "11px",
											color: "var(--vscode-descriptionForeground)",
											display: "block",
										}}>
										Configure token-based pricing in USD per million tokens
									</span>
								</div>

								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "12px",
										backgroundColor: "var(--vscode-editor-background)",
										padding: "12px",
										borderRadius: "4px",
									}}>
									<div className="price-input">
										<VSCodeTextField
											value={
												apiConfiguration?.openAiCustomModelInfo?.inputPrice?.toString() ??
												openAiModelInfoSaneDefaults.inputPrice?.toString() ??
												""
											}
											type="text"
											style={{
												width: "100%",
												borderColor: (() => {
													const value = apiConfiguration?.openAiCustomModelInfo?.inputPrice
													if (!value && value !== 0) return "var(--vscode-input-border)"
													return value >= 0
														? "var(--vscode-charts-green)"
														: "var(--vscode-errorForeground)"
												})(),
											}}
											onChange={(e: any) => {
												const parsed = parseFloat(e.target.value)
												handleInputChange("openAiCustomModelInfo")({
													target: {
														value: {
															...(apiConfiguration?.openAiCustomModelInfo ??
																openAiModelInfoSaneDefaults),
															inputPrice:
																e.target.value === ""
																	? undefined
																	: isNaN(parsed)
																		? openAiModelInfoSaneDefaults.inputPrice
																		: parsed,
														},
													},
												})
											}}
											placeholder="e.g. 0.0001">
											<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
												<span style={{ fontWeight: 500 }}>Input Price</span>
												<i
													className="codicon codicon-info"
													title="Cost per million tokens in the input/prompt. This affects the cost of sending context and instructions to the model."
													style={{
														fontSize: "12px",
														color: "var(--vscode-descriptionForeground)",
														cursor: "help",
													}}
												/>
											</div>
										</VSCodeTextField>
									</div>

									<div className="price-input">
										<VSCodeTextField
											value={
												apiConfiguration?.openAiCustomModelInfo?.outputPrice?.toString() ||
												openAiModelInfoSaneDefaults.outputPrice?.toString() ||
												""
											}
											type="text"
											style={{
												width: "100%",
												borderColor: (() => {
													const value = apiConfiguration?.openAiCustomModelInfo?.outputPrice
													if (!value && value !== 0) return "var(--vscode-input-border)"
													return value >= 0
														? "var(--vscode-charts-green)"
														: "var(--vscode-errorForeground)"
												})(),
											}}
											onChange={(e: any) => {
												const parsed = parseFloat(e.target.value)
												handleInputChange("openAiCustomModelInfo")({
													target: {
														value: {
															...(apiConfiguration?.openAiCustomModelInfo ||
																openAiModelInfoSaneDefaults),
															outputPrice:
																e.target.value === ""
																	? undefined
																	: isNaN(parsed)
																		? openAiModelInfoSaneDefaults.outputPrice
																		: parsed,
														},
													},
												})
											}}
											placeholder="e.g. 0.0002">
											<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
												<span style={{ fontWeight: 500 }}>Output Price</span>
												<i
													className="codicon codicon-info"
													title="Cost per million tokens in the model's response. This affects the cost of generated content and completions."
													style={{
														fontSize: "12px",
														color: "var(--vscode-descriptionForeground)",
														cursor: "help",
													}}
												/>
											</div>
										</VSCodeTextField>
									</div>
								</div>
							</div>
						</div>
					</Pane>
					<div
						style={{
							marginTop: 15,
						}}
					/>

					{/* end Model Info Configuration */}

					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Roo Code uses complex prompts and works best
							with Claude models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "deepseek" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.deepSeekApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("deepSeekApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>DeepSeek API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!apiConfiguration?.deepSeekApiKey && (
							<VSCodeLink
								href="https://platform.deepseek.com/"
								style={{ display: "inline", fontSize: "inherit" }}>
								You can get a DeepSeek API key by signing up here.
							</VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "siliconflow" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.siliconflowApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("siliconflowApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Siliconflow API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						这个Key只会存储在本地, 不用担心隐私问题.
						{!apiConfiguration?.siliconflowApiKey && (
							<VSCodeLink
								href="https://cloud.siliconflow.cn/account/ak/"
								style={{ display: "inline", fontSize: "inherit" }}>
								你可以点击注册相关信息.
							</VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "baidu" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.baiduApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("baiduApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Siliconflow API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						这个Key只会存储在本地, 不用担心隐私问题.
						{!apiConfiguration?.baiduApiKey && (
							<VSCodeLink
								href="https://cloud.siliconflow.cn/account/ak/"
								style={{ display: "inline", fontSize: "inherit" }}>
								你可以点击注册相关信息.
							</VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "ctyun" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.ctyunApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("ctyunApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>平台 API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						这个Key只会存储在本地, 不用担心隐私问题.
						{!apiConfiguration?.ctyunApiKey && (
							<VSCodeLink
								href="https://huiju.ctyun.cn/"
								style={{ display: "inline", fontSize: "inherit" }}>
								你可以点击注册相关信息.
							</VSCodeLink>
						)}
					</p>
					<VSCodeTextField
						value={apiConfiguration?.ctyunModelId || ""}
						style={{ width: "100%" }}
						onInput={handleInputChange("ctyunModelId")}
						placeholder={"e.g. llama3.1"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</VSCodeTextField>
					目前仅支持DeepSeek-R1模型.
				</div>
			)}

			{selectedProvider === "volcengine" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.volcengineApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("volcengineApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>平台 API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						这个Key只会存储在本地, 不用担心隐私问题.
						{!apiConfiguration?.volcengineApiKey && (
							<VSCodeLink
								href="https://huiju.ctyun.cn/"
								style={{ display: "inline", fontSize: "inherit" }}>
								你可以点击注册相关信息.
							</VSCodeLink>
						)}
					</p>
					<VSCodeTextField
						value={apiConfiguration?.volcengineModelId || ""}
						style={{ width: "100%" }}
						onInput={handleInputChange("volcengineModelId")}
						placeholder={"e.g. llama3.1"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</VSCodeTextField>
					目前仅支持DeepSeek-R1模型.
				</div>
			)}

			{selectedProvider === "aliyun" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.aliyunApiKey || ""}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("aliyunApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>平台 API Key</span>
					</VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						这个Key只会存储在本地, 不用担心隐私问题.
						{!apiConfiguration?.aliyunApiKey && (
							<VSCodeLink
								href="https://huiju.ctyun.cn/"
								style={{ display: "inline", fontSize: "inherit" }}>
								你可以点击注册相关信息.
							</VSCodeLink>
						)}
					</p>
				</div>
			)}
			{selectedProvider === "ollama" && (
				<div>
					<VSCodeTextField
						value={apiConfiguration?.ollamaBaseUrl || ""}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("ollamaBaseUrl")}
						placeholder={"Default: http://localhost:11434"}>
						<span style={{ fontWeight: 500 }}>Base URL (optional)</span>
					</VSCodeTextField>
					<VSCodeTextField
						value={apiConfiguration?.ollamaModelId || ""}
						style={{ width: "100%" }}
						onInput={handleInputChange("ollamaModelId")}
						placeholder={"e.g. llama3.1"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</VSCodeTextField>
					{ollamaModels.length > 0 && (
						<VSCodeRadioGroup
							value={
								ollamaModels.includes(apiConfiguration?.ollamaModelId || "")
									? apiConfiguration?.ollamaModelId
									: ""
							}
							onChange={(e) => {
								const value = (e.target as HTMLInputElement)?.value
								// need to check value first since radio group returns empty string sometimes
								if (value) {
									handleInputChange("ollamaModelId")({
										target: { value },
									})
								}
							}}>
							{ollamaModels.map((model) => (
								<VSCodeRadio
									key={model}
									value={model}
									checked={apiConfiguration?.ollamaModelId === model}>
									{model}
								</VSCodeRadio>
							))}
						</VSCodeRadioGroup>
					)}
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						Ollama allows you to run models locally on your computer. For instructions on how to get
						started, see their
						<VSCodeLink
							href="https://github.com/ollama/ollama/blob/main/README.md"
							style={{ display: "inline", fontSize: "inherit" }}>
							quickstart guide.
						</VSCodeLink>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Roo Code uses complex prompts and works best
							with Claude models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider !== "glama" &&
				selectedProvider !== "openrouter" &&
				selectedProvider !== "openai" &&
				selectedProvider !== "ollama" &&
				selectedProvider !== "lmstudio" && (
					<>
						<div className="dropdown-container">
							<label htmlFor="model-id">
								<span style={{ fontWeight: 500 }}>Model</span>
							</label>
							{selectedProvider === "siliconflow" && createDropdown(siliconflowModels)}
							{selectedProvider === "baidu" && createDropdown(baiduModels)}
							{selectedProvider === "aliyun" && createDropdown(aliyunModels)}
							{selectedProvider === "deepseek" && createDropdown(deepSeekModels)}
						</div>

						<ModelInfoView
							selectedModelId={selectedModelId}
							modelInfo={selectedModelInfo}
							isDescriptionExpanded={isDescriptionExpanded}
							setIsDescriptionExpanded={setIsDescriptionExpanded}
						/>
					</>
				)}

			{modelIdErrorMessage && (
				<p
					style={{
						margin: "-10px 0 4px 0",
						fontSize: 12,
						color: "var(--vscode-errorForeground)",
					}}>
					{modelIdErrorMessage}
				</p>
			)}
		</div>
	)
}

export function getGlamaAuthUrl(uriScheme?: string) {
	const callbackUrl = `${uriScheme || "vscode"}://feliks_peegel.roo-cline-besiege/glama`

	return `https://glama.ai/oauth/authorize?callback_url=${encodeURIComponent(callbackUrl)}`
}

export function getOpenRouterAuthUrl(uriScheme?: string) {
	return `https://openrouter.ai/auth?callback_url=${uriScheme || "vscode"}://feliks_peegel.roo-cline-besiege/openrouter`
}

export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "YUN",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(price)
}

export const ModelInfoView = ({
	selectedModelId,
	modelInfo,
	isDescriptionExpanded,
	setIsDescriptionExpanded,
}: {
	selectedModelId: string
	modelInfo: ModelInfo
	isDescriptionExpanded: boolean
	setIsDescriptionExpanded: (isExpanded: boolean) => void
}) => {
	const isGemini = Object.keys(geminiModels).includes(selectedModelId)

	const infoItems = [
		modelInfo.description && (
			<ModelDescriptionMarkdown
				key="description"
				markdown={modelInfo.description}
				isExpanded={isDescriptionExpanded}
				setIsExpanded={setIsDescriptionExpanded}
			/>
		),
		<ModelInfoSupportsItem
			key="supportsImages"
			isSupported={modelInfo.supportsImages ?? false}
			supportsLabel="Supports images"
			doesNotSupportLabel="Does not support images"
		/>,
		<ModelInfoSupportsItem
			key="supportsComputerUse"
			isSupported={modelInfo.supportsComputerUse ?? false}
			supportsLabel="Supports computer use"
			doesNotSupportLabel="Does not support computer use"
		/>,
		!isGemini && (
			<ModelInfoSupportsItem
				key="supportsPromptCache"
				isSupported={modelInfo.supportsPromptCache}
				supportsLabel="Supports prompt caching"
				doesNotSupportLabel="Does not support prompt caching"
			/>
		),
		modelInfo.maxTokens !== undefined && modelInfo.maxTokens > 0 && (
			<span key="maxTokens">
				<span style={{ fontWeight: 500 }}>Max output:</span> {modelInfo.maxTokens?.toLocaleString()} tokens
			</span>
		),
		modelInfo.inputPrice !== undefined && modelInfo.inputPrice > 0 && (
			<span key="inputPrice">
				<span style={{ fontWeight: 500 }}>Input price:</span> {formatPrice(modelInfo.inputPrice)}/million tokens
			</span>
		),
		modelInfo.supportsPromptCache && modelInfo.cacheWritesPrice && (
			<span key="cacheWritesPrice">
				<span style={{ fontWeight: 500 }}>Cache writes price:</span>{" "}
				{formatPrice(modelInfo.cacheWritesPrice || 0)}/million tokens
			</span>
		),
		modelInfo.supportsPromptCache && modelInfo.cacheReadsPrice && (
			<span key="cacheReadsPrice">
				<span style={{ fontWeight: 500 }}>Cache reads price:</span>{" "}
				{formatPrice(modelInfo.cacheReadsPrice || 0)}/million tokens
			</span>
		),
		modelInfo.outputPrice !== undefined && modelInfo.outputPrice > 0 && (
			<span key="outputPrice">
				<span style={{ fontWeight: 500 }}>Output price:</span> {formatPrice(modelInfo.outputPrice)}/million
				tokens
			</span>
		),
		isGemini && (
			<span key="geminiInfo" style={{ fontStyle: "italic" }}>
				* Free up to {selectedModelId && selectedModelId.includes("flash") ? "15" : "2"} requests per minute.
				After that, billing depends on prompt size.{" "}
				<VSCodeLink href="https://ai.google.dev/pricing" style={{ display: "inline", fontSize: "inherit" }}>
					For more info, see pricing details.
				</VSCodeLink>
			</span>
		),
	].filter(Boolean)

	return (
		<p style={{ fontSize: "12px", marginTop: "2px", color: "var(--vscode-descriptionForeground)" }}>
			{infoItems.map((item, index) => (
				<Fragment key={index}>
					{item}
					{index < infoItems.length - 1 && <br />}
				</Fragment>
			))}
		</p>
	)
}

const ModelInfoSupportsItem = ({
	isSupported,
	supportsLabel,
	doesNotSupportLabel,
}: {
	isSupported: boolean
	supportsLabel: string
	doesNotSupportLabel: string
}) => (
	<span
		style={{
			fontWeight: 500,
			color: isSupported ? "var(--vscode-charts-green)" : "var(--vscode-errorForeground)",
		}}>
		<i
			className={`codicon codicon-${isSupported ? "check" : "x"}`}
			style={{
				marginRight: 4,
				marginBottom: isSupported ? 1 : -1,
				fontSize: isSupported ? 11 : 13,
				fontWeight: 700,
				display: "inline-block",
				verticalAlign: "bottom",
			}}></i>
		{isSupported ? supportsLabel : doesNotSupportLabel}
	</span>
)

export function normalizeApiConfiguration(apiConfiguration?: ApiConfiguration) {
	const provider = apiConfiguration?.apiProvider || "anthropic"
	const modelId = apiConfiguration?.apiModelId

	const getProviderData = (models: Record<string, ModelInfo>, defaultId: string) => {
		let selectedModelId: string
		let selectedModelInfo: ModelInfo
		if (modelId && modelId in models) {
			selectedModelId = modelId
			selectedModelInfo = models[modelId]
		} else {
			selectedModelId = defaultId
			selectedModelInfo = models[defaultId]
		}
		return { selectedProvider: provider, selectedModelId, selectedModelInfo }
	}
	switch (provider) {
		case "deepseek":
			return getProviderData(deepSeekModels, deepSeekDefaultModelId)
		case "baidu":
			return getProviderData(baiduModels, baiduDefaultModelId)
		case "ctyun":
			return {
				selectedProvider: provider,
				selectedModelId: apiConfiguration?.ctyunModelId || "",
				selectedModelInfo: apiConfiguration?.openAiCustomModelInfo || openAiModelInfoSaneDefaults,
			}
		case "siliconflow":
			return getProviderData(siliconflowModels, siliconflowDefaultModelId)
		case "aliyun":
			return getProviderData(aliyunModels, aliyunDefaultModelId)
		case "volcengine":
			return {
				selectedProvider: provider,
				selectedModelId: apiConfiguration?.openAiModelId || "",
				selectedModelInfo: apiConfiguration?.openAiCustomModelInfo || openAiModelInfoSaneDefaults,
			}
		case "openai":
			return {
				selectedProvider: provider,
				selectedModelId: apiConfiguration?.openAiModelId || "",
				selectedModelInfo: apiConfiguration?.openAiCustomModelInfo || openAiModelInfoSaneDefaults,
			}
		case "ollama":
			return {
				selectedProvider: provider,
				selectedModelId: apiConfiguration?.ollamaModelId || "",
				selectedModelInfo: openAiModelInfoSaneDefaults,
			}
		default:
			return getProviderData(anthropicModels, anthropicDefaultModelId)
	}
}

export default memo(ApiOptions)
