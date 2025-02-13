import { ApiConfiguration } from "../shared/api"

export function checkExistKey(config: ApiConfiguration | undefined) {
	return config
		? [
				config.apiKey,
				config.ctyunApiKey,
				config.ctyunModelId,
				config.volcengineApiKey,
				config.awsRegion,
				config.vertexProjectId,
				config.openAiApiKey,
				config.ollamaModelId,
				config.lmStudioModelId,
				config.siliconflowApiKey,
				config.baiduApiKey,
				config.deepSeekApiKey,
				config.aliyunApiKey,
				config.vsCodeLmModelSelector,
			].some((key) => key !== undefined)
		: false
}
