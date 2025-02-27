<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>一个为特定区域用户定制的Roo Cline分支版本</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

[English](./docs/README_en.md) | [Français](./docs/README_fr.md) | [Deutsch](./docs/README_de.md) | [Eesti](./docs/README_et.md) | [Русский](./docs/README_ru.md) | 简体中文

</div>

<br>
<p align="center"><i>喜欢这个项目？请访问 <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">VSCode扩展页面</a></i></p>
<br>

这是一个Roo Cline的特殊分支版本，增加了中文语言支持。

删除了一些在特定地区无法访问的API提供商。

添加了一些在特定地区可以访问的API提供商。

感谢所有贡献者。特别感谢Roo Cline和Cline。

同时感谢Deepseek提供的支持。

## 目录

- [模型支持情况](#模型支持情况)
- [更新日志](#更新日志)
- [下次更新计划](#下次更新计划)
- [本地安装与开发](#本地安装与开发)
- [鸣谢](#鸣谢)
- [许可证](#许可证)

## 模型支持情况

- 百度千帆(BaiDu QianFan) (TPM给的很保守，不建议使用)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 天翼云(CtYun)(可访问, 但Cline相关问题不回答)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 火山引擎(volcengine)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 硅基流动(SiliconFlow)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×]
- 阿里云(AliYun)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 腾讯云(TencentCloud)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 移动云(ECloud) (个人账户按钮仍然点不了...)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (没有空闲资源了, 需要等待)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## 更新日志

- 0.0.1 2025-02-09
    - 初始发布
- 0.0.2 2025-02-13
    - 添加阿里云提供商
    - 修复火山引擎deepseek v3和百度deepseek v3
    - 更新readme和商店链接
- 0.0.3 2025-02-20
    - 添加法语、爱沙尼亚语、德语、中文、俄语支持（部分）
    - 添加腾讯云提供商
    - 删除一些无用代码
- 0.0.4 2025-02-27
    - 又翻译了一些,并不是全部
    - 删了一点点冗余的代码
    - 更改了计费的单位

## 下次更新计划

- [ ] 修复硅基流动deepseek v3
- [√] 添加腾讯云提供商（如果可用）
- [ ] 添加更多模型
- [√] 国际化支持
- [√] 删除无用代码

下次更新将在下周四或周五。

## 本地安装与开发

1. **克隆**仓库：
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **安装依赖**：
    ```bash
    npm run install:all
    ```
3. **构建**扩展：
    ```bash
    npm run build
    ```
    - 将在`bin/`目录下生成一个`.vsix`文件。
4. **安装** `.vsix`（如果需要）：
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **启动webview（Vite/React应用，支持HMR）**：
    ```bash
    npm run dev
    ```
6. **调试**：
    - 按`F5`（或**运行** → **开始调试**）在VSCode中打开一个加载了Roo Code的新会话。

## 鸣谢

特别感谢Roo Cline和Cline的所有贡献者。

感谢Deepseek提供的一切支持。

## 许可证

本项目采用[Apache2.0](https://opensource.org/licenses/MIT)许可证。

如果这个项目对你有帮助，请给个⭐️！
