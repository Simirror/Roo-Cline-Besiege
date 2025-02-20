<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>A roo cline fork for special user where special zone.</i></p>
<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>
<br>
<p align="center"><i>Loved the project? Please visit  <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">extension</a></i></p>
<br>

A special fork by Roo Cline. Add some china language support.

Delete some API provider where special locales cant access.

Add some API provider where special locales can access.

Thanks to all contributors. Special thanks to Roo Cline and Cline.

And Deepseek provider.

一个特殊的Fork，增加了一些支持以满足特区特用。

删除了一些无法访问特殊地区的API提供商。

添加了一些可以访问特殊地区的API提供商。

## Contents

- [Model Supported States 模型支持情况](#model-supported-states-模型支持情况)
- [Changelog](#list-out-awesome-readme-profile-tools)
- [Next Update](#list-out-awesome-readme-profile-articles)
- [Contribute](#contribute)

</div>

##

## Model Supported States 模型支持情况

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
    - DeepSeek-V3 [×] (修复了一部分, 偶尔还是抽风)
- 阿里云(AliYun)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 腾讯云(TencentCloud)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- 移动云(ECloud) (个人账户按钮点不了...可能是我个人问题)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (提交申请了, 还没回信)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

# Changelog

- 0.0.1 2025-02-09
    - Initial release
- 0.0.2 2025-02-13
    - Add provider Aliyun,
    - Fix volcengine deepseek v3, baidu deepseek v3
    - Well, update readme and shop url.
- 0.0.3 2025-02-20
    - add france, estonia, germany, chinese, russian language support (part of)
    - add provider tencent cloud
      = del some unused code

# Next Update

- [ ] Fix siliconflow deepseek v3
- [√] Add provider Tencent Cloud(If it works)
- [ ] Add more models
- [√] i18n
- [√] Remove some useless code

Next Update will be next thursday or friday.

## Local Setup & Development(Roo Cline)

1. **Clone** the repo:
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **Install dependencies**:
    ```bash
    npm run install:all
    ```
3. **Build** the extension:
    ```bash
    npm run build
    ```
    - A `.vsix` file will appear in the `bin/` directory.
4. **Install** the `.vsix` manually if desired:
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **Start the webview (Vite/React app with HMR)**:
    ```bash
    npm run dev
    ```
6. **Debug**:
    - Press `F5` (or **Run** → **Start Debugging**) in VSCode to open a new session with Roo Code loaded.

# Thanks 感谢

特别感谢Roo Cline和Cline的所有贡献者。

感谢Deepseek提供的一切。

## License

This project is licensed under [Apache2.0](https://opensource.org/licenses/MIT) license.

Give a ⭐️ if this project helped you!
