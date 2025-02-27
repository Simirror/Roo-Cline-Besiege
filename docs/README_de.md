<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>Eine Roo Cline-Abzweigung für Benutzer in speziellen Regionen</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

[English](./README_en.md) | [Français](./README_fr.md) | Deutsch | [Eesti](./README_et.md) | [Русский](./README_ru.md) | [简体中文](./README_zh.md)

</div>

<br>
<p align="center"><i>Gefällt Ihnen das Projekt? Besuchen Sie die <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">VSCode-Erweiterungsseite</a></i></p>
<br>

Dies ist eine spezielle Abzweigung von Roo Cline mit zusätzlicher Unterstützung für die chinesische Sprache.

Einige API-Anbieter, die in speziellen Regionen nicht zugänglich sind, wurden entfernt.

Neue API-Anbieter, die in speziellen Regionen zugänglich sind, wurden hinzugefügt.

Danke an alle Mitwirkenden. Besonderer Dank geht an Roo Cline und Cline.

Und Dank an Deepseek für ihre Unterstützung.

## Inhalt

- [Modell-Unterstützungsstatus](#modell-unterstützungsstatus)
- [Änderungsprotokoll](#änderungsprotokoll)
- [Nächstes Update](#nächstes-update)
- [Lokale Einrichtung & Entwicklung](#lokale-einrichtung--entwicklung)
- [Danksagungen](#danksagungen)
- [Lizenz](#lizenz)

## Modell-Unterstützungsstatus

- BaiDu QianFan (TPM ist konservativ, nicht empfohlen)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- CtYun (Zugänglich, beantwortet aber keine Cline-bezogenen Fragen)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- Volcengine
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- SiliconFlow
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×] (Teilweise behoben, gelegentlich noch instabil)
- AliYun
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- TencentCloud
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- ECloud (Persönlicher Account-Button funktioniert nicht... könnte ein persönliches Problem sein)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (Antrag eingereicht, warte auf Antwort)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## Änderungsprotokoll

- 0.0.1 2025-02-09
    - Erstveröffentlichung
- 0.0.2 2025-02-13
    - Aliyun-Anbieter hinzugefügt
    - Volcengine Deepseek V3 und Baidu Deepseek V3 behoben
    - Readme und Shop-URL aktualisiert
- 0.0.3 2025-02-20
    - Französische, Estnische, Deutsche, Chinesische, Russische Sprachunterstützung hinzugefügt (teilweise)
    - TencentCloud-Anbieter hinzugefügt
    - Ungenutzten Code entfernt

## Nächstes Update

- [ ] SiliconFlow Deepseek V3 beheben
- [√] TencentCloud-Anbieter hinzufügen (falls funktionsfähig)
- [ ] Weitere Modelle hinzufügen
- [√] i18n-Unterstützung
- [√] Ungenutzten Code entfernen

Das nächste Update wird nächsten Donnerstag oder Freitag sein.

## Lokale Einrichtung & Entwicklung

1. **Klonen** Sie das Repository:
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **Installieren** Sie die Abhängigkeiten:
    ```bash
    npm run install:all
    ```
3. **Bauen** Sie die Erweiterung:
    ```bash
    npm run build
    ```
    - Eine `.vsix`-Datei wird im `bin/`-Verzeichnis erscheinen.
4. **Installieren** Sie die `.vsix` manuell, falls gewünscht:
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **Starten** Sie die Webview (Vite/React-App mit HMR):
    ```bash
    npm run dev
    ```
6. **Debuggen**:
    - Drücken Sie `F5` (oder **Ausführen** → **Debugging starten**) in VSCode, um eine neue Sitzung mit geladenem Roo Code zu öffnen.

## Danksagungen

Besonderer Dank geht an alle Mitwirkenden von Roo Cline und Cline.

Danke an Deepseek für all ihre Unterstützung.

## Lizenz

Dieses Projekt ist unter der [Apache2.0](https://opensource.org/licenses/MIT)-Lizenz lizenziert.

Geben Sie einen ⭐️, wenn dieses Projekt Ihnen geholfen hat!
