<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>Форк Roo Cline для пользователей в специальных регионах</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

[English](./README_en.md) | [Français](./README_fr.md) | [Deutsch](./README_de.md) | [Eesti](./README_et.md) | Русский | [简体中文](./README_zh.md)

</div>

<br>
<p align="center"><i>Нравится проект? Посетите <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">страницу расширения VSCode</a></i></p>
<br>

Это специальный форк Roo Cline с добавленной поддержкой китайского языка.

Удалены некоторые поставщики API, недоступные в специальных регионах.

Добавлены новые поставщики API, доступные в специальных регионах.

Спасибо всем участникам. Особая благодарность Roo Cline и Cline.

И спасибо Deepseek за их поддержку.

## Содержание

- [Статус Поддержки Моделей](#статус-поддержки-моделей)
- [История Изменений](#история-изменений)
- [Следующее Обновление](#следующее-обновление)
- [Локальная Настройка и Разработка](#локальная-настройка-и-разработка)
- [Благодарности](#благодарности)
- [Лицензия](#лицензия)

## Статус Поддержки Моделей

- BaiDu QianFan (TPM консервативен, не рекомендуется)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- CtYun (Доступен, но не отвечает на вопросы, связанные с Cline)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- Volcengine
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- SiliconFlow
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×] (Частично исправлено, иногда всё ещё нестабильно)
- AliYun
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- TencentCloud
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- ECloud (Кнопка личного аккаунта не работает... возможно, личная проблема)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (Заявка подана, ожидаем ответа)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## История Изменений

- 0.0.1 2025-02-09
    - Первоначальный релиз
- 0.0.2 2025-02-13
    - Добавлен поставщик Aliyun
    - Исправлены Volcengine Deepseek V3 и Baidu Deepseek V3
    - Обновлены readme и URL магазина
- 0.0.3 2025-02-20
    - Добавлена поддержка французского, эстонского, немецкого, китайского, русского языков (частично)
    - Добавлен поставщик TencentCloud
    - Удален неиспользуемый код

## Следующее Обновление

- [ ] Исправить SiliconFlow Deepseek V3
- [√] Добавить поставщика TencentCloud (если работает)
- [ ] Добавить больше моделей
- [√] Поддержка i18n
- [√] Удалить неиспользуемый код

Следующее обновление будет в следующий четверг или пятницу.

## Локальная Настройка и Разработка

1. **Клонировать** репозиторий:
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **Установить** зависимости:
    ```bash
    npm run install:all
    ```
3. **Собрать** расширение:
    ```bash
    npm run build
    ```
    - Файл `.vsix` появится в директории `bin/`.
4. **Установить** `.vsix` вручную, если нужно:
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **Запустить** веб-представление (приложение Vite/React с HMR):
    ```bash
    npm run dev
    ```
6. **Отладка**:
    - Нажмите `F5` (или **Запуск** → **Начать отладку**) в VSCode, чтобы открыть новую сессию с загруженным Roo Code.

## Благодарности

Особая благодарность всем участникам Roo Cline и Cline.

Спасибо Deepseek за всю их поддержку.

## Лицензия

Этот проект лицензирован под лицензией [Apache2.0](https://opensource.org/licenses/MIT).

Поставьте ⭐️, если этот проект помог вам!
