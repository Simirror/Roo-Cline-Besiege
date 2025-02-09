import { ApiConfiguration, glamaDefaultModelId, openRouterDefaultModelId } from "../../../src/shared/api"
import { ModelInfo } from "../../../src/shared/api"
export function validateApiConfiguration(apiConfiguration?: ApiConfiguration): string | undefined {
	if (apiConfiguration) {
		switch (apiConfiguration.apiProvider) {
			case "ctyun":
				if (!apiConfiguration.ctyunApiKey) {
					return "You must provide a valid API key or choose a different provider."
				}
				break
			case "openai":
				if (
					!apiConfiguration.openAiBaseUrl ||
					!apiConfiguration.openAiApiKey ||
					!apiConfiguration.openAiModelId
				) {
					return "You must provide a valid base URL, API key, and model ID."
				}
				break
			case "ollama":
				if (!apiConfiguration.ollamaModelId) {
					return "You must provide a valid model ID."
				}
				break
		}
	}
	return undefined
}

export function validateModelId(
	apiConfiguration?: ApiConfiguration,
	glamaModels?: Record<string, ModelInfo>,
	openRouterModels?: Record<string, ModelInfo>,
): string | undefined {
	if (apiConfiguration) {
		switch (apiConfiguration.apiProvider) {
			case "ctyun":
				const ctyunModelId = apiConfiguration.ctyunModelId || glamaDefaultModelId // in case the user hasn't changed the model id, it will be undefined by default
				if (!ctyunModelId) {
					return "You must provide a model ID."
				}
				if (glamaModels && !Object.keys(glamaModels).includes(ctyunModelId)) {
					// even if the model list endpoint failed, extensionstatecontext will always have the default model info
					return "The model ID you provided is not available. Please choose a different model."
				}
				break
			case "baidu":
				const modelId = apiConfiguration.volcengineModelId || openRouterDefaultModelId // in case the user hasn't changed the model id, it will be undefined by default
				if (!modelId) {
					return "You must provide a model ID."
				}
				if (openRouterModels && !Object.keys(openRouterModels).includes(modelId)) {
					// even if the model list endpoint failed, extensionstatecontext will always have the default model info
					return "The model ID you provided is not available. Please choose a different model."
				}
				break
		}
	}
	return undefined
}
