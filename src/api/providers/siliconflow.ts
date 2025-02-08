import { OpenAiHandler } from "./openai"
import { ApiHandlerOptions, ModelInfo, siliconflowDefaultModelId, siliconflowModels } from "../../shared/api"
import { deepSeekModels, deepSeekDefaultModelId } from "../../shared/api"
import Anthropic from "@anthropic-ai/sdk"
import OpenAI from "openai"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { convertToR1Format } from "../transform/r1-format"
import { ApiStream } from "../transform/stream"

export class SiliconflowHandler extends OpenAiHandler {
	constructor(options: ApiHandlerOptions) {
		if (!options.deepSeekApiKey) {
			throw new Error("DeepSeek API key is required. Please provide it in the settings.")
		}
		super({
			...options,
			openAiApiKey: options.siliconflowApiKey,
			openAiModelId: options.siliconflowModelId ?? siliconflowDefaultModelId,
			openAiBaseUrl: options.deepSeekBaseUrl ?? "https://api.siliconflow.cn/v1",
			openAiStreamingEnabled: true,
			includeMaxTokens: true,
		})
	}

	override getModel(): { id: string; info: ModelInfo } {
		const modelId = this.options.apiModelId ?? siliconflowDefaultModelId
		return {
			id: modelId,
			info:
				siliconflowModels[modelId as keyof typeof siliconflowModels] ||
				siliconflowModels[siliconflowDefaultModelId],
		}
	}
	override async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
		const modelInfo = this.getModel().info
		const modelId = this.options.apiModelId ?? ""
		const deepseekReasoner = modelId.includes("deepseek-reasoner") || modelId.includes("DeepSeek-R1")

		if (this.options.openAiStreamingEnabled ?? true) {
			const systemMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
				role: "system",
				content: systemPrompt,
			}
			const requestOptions: OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming = {
				model: modelId,
				//temperature: 0.1,
				messages: deepseekReasoner
					? convertToR1Format([{ role: "user", content: systemPrompt }, ...messages])
					: [systemMessage, ...convertToOpenAiMessages(messages)],
				stream: true as const,
				stream_options: { include_usage: true },
			}
			if (this.options.includeMaxTokens) {
				requestOptions.max_tokens = modelInfo.maxTokens
			}

			const stream = await this.client.chat.completions.create(requestOptions)

			for await (const chunk of stream) {
				const delta = chunk.choices[0]?.delta ?? {}

				if (delta.content) {
					yield {
						type: "text",
						text: delta.content,
					}
				}

				if ("reasoning_content" in delta && delta.reasoning_content) {
					yield {
						type: "reasoning",
						text: (delta.reasoning_content as string | undefined) || "",
					}
				}
				if (chunk.usage) {
					yield {
						type: "usage",
						inputTokens: chunk.usage.prompt_tokens || 0,
						outputTokens: chunk.usage.completion_tokens || 0,
					}
				}
			}
		} else {
			// o1 for instance doesnt support streaming, non-1 temp, or system prompt
			const systemMessage: OpenAI.Chat.ChatCompletionUserMessageParam = {
				role: "user",
				content: systemPrompt,
			}

			const requestOptions: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
				model: modelId,
				messages: deepseekReasoner
					? convertToR1Format([{ role: "user", content: systemPrompt }, ...messages])
					: [systemMessage, ...convertToOpenAiMessages(messages)],
			}

			const response = await this.client.chat.completions.create(requestOptions)

			yield {
				type: "text",
				text: response.choices[0]?.message.content || "",
			}
			yield {
				type: "usage",
				inputTokens: response.usage?.prompt_tokens || 0,
				outputTokens: response.usage?.completion_tokens || 0,
			}
		}
	}
}
