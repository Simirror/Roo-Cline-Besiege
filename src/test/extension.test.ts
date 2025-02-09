import * as assert from "assert"
import * as vscode from "vscode"

suite("Roo Code Extension", () => {
	test("OPENROUTER_API_KEY environment variable is set", () => {
		if (!process.env.OPENROUTER_API_KEY) {
			assert.fail("OPENROUTER_API_KEY environment variable is not set")
		}
	})

	test("Commands should be registered", async () => {
		const timeout = 10 * 1_000
		const interval = 1_000
		const startTime = Date.now()

		const expectedCommands = [
			"roo-cline-besiege.plusButtonClicked",
			"roo-cline-besiege.mcpButtonClicked",
			"roo-cline-besiege.historyButtonClicked",
			"roo-cline-besiege.popoutButtonClicked",
			"roo-cline-besiege.settingsButtonClicked",
			"roo-cline-besiege.openInNewTab",
			"roo-cline-besiege.explainCode",
			"roo-cline-besiege.fixCode",
			"roo-cline-besiege.improveCode",
		]

		while (Date.now() - startTime < timeout) {
			const commands = await vscode.commands.getCommands(true)
			const missingCommands = []

			for (const cmd of expectedCommands) {
				if (!commands.includes(cmd)) {
					missingCommands.push(cmd)
				}
			}

			if (missingCommands.length === 0) {
				break
			}

			await new Promise((resolve) => setTimeout(resolve, interval))
		}

		const commands = await vscode.commands.getCommands(true)

		for (const cmd of expectedCommands) {
			assert.ok(commands.includes(cmd), `Command ${cmd} should be registered`)
		}
	})

	test("Webview panel can be created", () => {
		const view = vscode.window.createWebviewPanel(
			"roo-cline-besiege.SidebarProvider",
			"Roo Code",
			vscode.ViewColumn.One,
			{},
		)

		assert.ok(view, "Failed to create webview panel")
		view.dispose()
	})
})
