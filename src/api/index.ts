import { Anthropic } from "@anthropic-ai/sdk"
import { ApiConfiguration, ModelInfo } from "../shared/api"
import { OpenAiHandler } from "./providers/openai"
import { OllamaHandler } from "./providers/ollama"
//import { OpenAiNativeHandler } from "./providers/openai-native"
import { DeepSeekHandler } from "./providers/deepseek"
import { ApiStream } from "./transform/stream"
import { SiliconflowHandler } from "./providers/siliconflow"

import { VolcengineHandler } from "./providers/volcengine"
import { BaiduHandler } from "./providers/baidu"
import { CtyunHandler } from "./providers/ctyun"

export interface SingleCompletionHandler {
	completePrompt(prompt: string): Promise<string>
}

export interface ApiHandler {
	createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream
	getModel(): { id: string; info: ModelInfo }
}

export function buildApiHandler(configuration: ApiConfiguration): ApiHandler {
	const { apiProvider, ...options } = configuration
	switch (apiProvider) {
		case "openai":
			return new OpenAiHandler(options)
		case "ollama":
			return new OllamaHandler(options)
		case "deepseek":
			return new DeepSeekHandler(options)
		case "ctyun":
			return new CtyunHandler(options)
		case "baidu":
			return new BaiduHandler(options)
		case "siliconflow":
			return new SiliconflowHandler(options)
		case "volcengine":
			return new VolcengineHandler(options)
		default:
			return new DeepSeekHandler(options)
	}
}
