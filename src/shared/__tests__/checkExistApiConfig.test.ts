import { checkExistKey } from "../checkExistApiConfig"
import { ApiConfiguration } from "../api"

describe("checkExistKey", () => {
	it("should return false for undefined config", () => {
		expect(checkExistKey(undefined)).toBe(false)
	})

	it("should return false for empty config", () => {
		const config: ApiConfiguration = {}
		expect(checkExistKey(config)).toBe(false)
	})

	it("should return true when one key is defined", () => {
		const config: ApiConfiguration = {
			apiKey: "test-key",
		}
		expect(checkExistKey(config)).toBe(true)
	})

	it("should return true when multiple keys are defined", () => {
		const config: ApiConfiguration = {
			apiKey: "test-key",
			ctyunApiKey: "glama-key",
			volcengineApiKey: "openrouter-key",
		}
		expect(checkExistKey(config)).toBe(true)
	})

	it("should return true when only non-key fields are undefined", () => {
		const config: ApiConfiguration = {
			apiKey: "test-key",
			apiProvider: undefined,
			anthropicBaseUrl: undefined,
		}
		expect(checkExistKey(config)).toBe(true)
	})

	it("should return false when all key fields are undefined", () => {
		const config: ApiConfiguration = {
			apiKey: undefined,
			ctyunApiKey: undefined,
			volcengineApiKey: undefined,
			openAiApiKey: undefined,
			ollamaModelId: undefined,
			siliconflowApiKey: undefined,
			deepSeekApiKey: undefined,
		}
		expect(checkExistKey(config)).toBe(false)
	})
})
