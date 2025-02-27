<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>Roo Cline'i haru spetsiaalsete piirkondade kasutajatele</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

[English](./README_en.md) | [Français](./README_fr.md) | [Deutsch](./README_de.md) | Eesti | [Русский](./README_ru.md) | [简体中文](./README_zh.md)

</div>

<br>
<p align="center"><i>Meeldib see projekt? Külasta <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">VSCode laienduse lehte</a></i></p>
<br>

See on Roo Cline'i spetsiaalne haru, millele on lisatud hiina keele tugi.

Mõned API pakkujad, mis pole spetsiaalsetes piirkondades kättesaadavad, on eemaldatud.

Lisatud on uued API pakkujad, mis on spetsiaalsetes piirkondades kättesaadavad.

Täname kõiki panustajaid. Eriline tänu Roo Cline'ile ja Cline'ile.

Ja täname Deepseeki nende toe eest.

## Sisukord

- [Mudelite Toe Olek](#mudelite-toe-olek)
- [Muudatuste Logi](#muudatuste-logi)
- [Järgmine Uuendus](#järgmine-uuendus)
- [Lokaalne Seadistus ja Arendus](#lokaalne-seadistus-ja-arendus)
- [Tänuavaldused](#tänuavaldused)
- [Litsents](#litsents)

## Mudelite Toe Olek

- BaiDu QianFan (TPM on konservatiivne, ei ole soovitatav)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- CtYun (Ligipääsetav, kuid ei vasta Cline'iga seotud küsimustele)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- Volcengine
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- SiliconFlow
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×] (Osaliselt parandatud, aeg-ajalt endiselt ebastabiilne)
- AliYun
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- TencentCloud
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- ECloud (Isikliku konto nupp ei tööta... võib olla isiklik probleem)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (Taotlus esitatud, ootame vastust)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## Muudatuste Logi

- 0.0.1 2025-02-09
    - Esialgne väljalase
- 0.0.2 2025-02-13
    - Lisatud Aliyun pakkuja
    - Parandatud Volcengine Deepseek V3 ja Baidu Deepseek V3
    - Uuendatud readme ja poe URL
- 0.0.3 2025-02-20
    - Lisatud prantsuse, eesti, saksa, hiina, vene keele tugi (osaline)
    - Lisatud TencentCloud pakkuja
    - Eemaldatud kasutamata kood

## Järgmine Uuendus

- [ ] Parandada SiliconFlow Deepseek V3
- [√] Lisada TencentCloud pakkuja (kui töötab)
- [ ] Lisada rohkem mudeleid
- [√] i18n tugi
- [√] Eemaldada kasutamata kood

Järgmine uuendus tuleb järgmisel neljapäeval või reedel.

## Lokaalne Seadistus ja Arendus

1. **Klooni** hoidla:
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **Paigalda** sõltuvused:
    ```bash
    npm run install:all
    ```
3. **Ehita** laiendus:
    ```bash
    npm run build
    ```
    - `.vsix` fail ilmub `bin/` kataloogi.
4. **Paigalda** `.vsix` käsitsi, kui soovid:
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **Käivita** veebivaade (Vite/React rakendus HMR-iga):
    ```bash
    npm run dev
    ```
6. **Silu**:
    - Vajuta `F5` (või **Käivita** → **Alusta silumist**) VSCode-is, et avada uus seanss laaditud Roo Code'iga.

## Tänuavaldused

Eriline tänu kõigile Roo Cline'i ja Cline'i panustajatele.

Täname Deepseeki kogu nende toe eest.

## Litsents

See projekt on litsentseeritud [Apache2.0](https://opensource.org/licenses/MIT) litsentsi all.

Anna ⭐️, kui see projekt sind aitas!
