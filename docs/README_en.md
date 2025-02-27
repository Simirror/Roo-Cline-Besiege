<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>A Roo Cline fork for users in special regions</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

English | [Français](./README_fr.md) | [Deutsch](./README_de.md) | [Eesti](./README_et.md) | [Русский](./README_ru.md) | [简体中文](./README_zh.md)

</div>

<br>
<p align="center"><i>Love this project? Please visit <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">VSCode Extension Page</a></i></p>
<br>

This is a special fork of Roo Cline with added Chinese language support.

Some API providers that are inaccessible in special regions have been removed.

New API providers that are accessible in special regions have been added.

Thanks to all contributors. Special thanks to Roo Cline and Cline.

And thanks to Deepseek for their support.

## Contents

- [Model Support Status](#model-support-status)
- [Changelog](#changelog)
- [Next Update](#next-update)
- [Local Setup & Development](#local-setup--development)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Model Support Status

- BaiDu QianFan (TPM is conservative, not recommended)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- CtYun (Accessible, but doesn't answer Cline-related questions)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- Volcengine
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- SiliconFlow
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×] (Partially fixed, still unstable occasionally)
- AliYun
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- TencentCloud
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- ECloud (Personal account button not working... might be a personal issue)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (Application submitted, awaiting response)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## Changelog

- 0.0.1 2025-02-09
    - Initial release
- 0.0.2 2025-02-13
    - Added Aliyun provider
    - Fixed Volcengine Deepseek V3 and Baidu Deepseek V3
    - Updated readme and shop URL
- 0.0.3 2025-02-20
    - Added French, Estonian, German, Chinese, Russian language support (partial)
    - Added TencentCloud provider
    - Removed unused code

## Next Update

- [ ] Fix SiliconFlow Deepseek V3
- [√] Add TencentCloud provider (if working)
- [ ] Add more models
- [√] i18n support
- [√] Remove unused code

Next update will be next Thursday or Friday.

## Local Setup & Development

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

## Acknowledgments

Special thanks to all contributors of Roo Cline and Cline.

Thanks to Deepseek for all their support.

## License

This project is licensed under the [Apache2.0](https://opensource.org/licenses/MIT) license.

Give a ⭐️ if this project helped you!
