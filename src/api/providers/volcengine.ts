import { OpenAiHandler } from "./openai"
import { ApiHandlerOptions, ModelInfo } from "../../shared/api"
import { deepSeekModels, deepSeekDefaultModelId } from "../../shared/api"
import Anthropic from "@anthropic-ai/sdk"
import OpenAI from "openai"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { convertToR1Format } from "../transform/r1-format"
import { ApiStream } from "../transform/stream"

export class VolcengineHandler extends OpenAiHandler {
	constructor(options: ApiHandlerOptions) {
		if (!options.volcengineApiKey) {
			throw new Error("DeepSeek API key is required. Please provide it in the settings.")
		}
		super({
			...options,
			openAiApiKey: options.volcengineApiKey,
			openAiModelId: options.volcengineModelId ?? deepSeekDefaultModelId,
			openAiBaseUrl: options.deepSeekBaseUrl ?? "https://ark.cn-beijing.volces.com/api/v3",
			openAiStreamingEnabled: true,
			includeMaxTokens: false,
		})
	}

	override getModel(): { id: string; info: ModelInfo } {
		const modelId = this.options.apiModelId ?? deepSeekDefaultModelId
		return {
			id: modelId,
			info: deepSeekModels[modelId as keyof typeof deepSeekModels] || deepSeekModels[deepSeekDefaultModelId],
		}
	}

	override async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
		const modelInfo = this.getModel().info
		const modelId = this.options.openAiModelId ?? ""
		const deepseekReasoner = modelId.includes("deepseek-reasoner")

		if (this.options.openAiStreamingEnabled ?? true) {
			const systemMessage: OpenAI.Chat.ChatCompletionSystemMessageParam = {
				role: "system",
				content: systemPrompt,
			}
			const requestOptions: OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming = {
				model: modelId,
				//temperature: 0.1,
				messages: convertToR1Format([{ role: "user", content: systemPrompt }, ...messages]),
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
