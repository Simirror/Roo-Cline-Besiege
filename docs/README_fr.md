<h1 align="center">Roo Code Besiege</h1>
<p align="center"><i>Une version dérivée de Roo Cline pour les utilisateurs des régions spéciales</i></p>

<div align="center">
  <a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/stars/Simirror/Roo-Cline-Besiege" alt="Stars Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/members"><img src="https://img.shields.io/github/forks/Simirror/Roo-Cline-Besiege" alt="Forks Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege"><img src="https://img.shields.io/github/issues-pr/Simirror/Roo-Cline-Besiege" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/issues"><img src="https://img.shields.io/github/issues/Simirror/Roo-Cline-Besiege" alt="Issues Badge"/></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Simirror/Roo-Cline-Besiege?color=2b9348"></a>
<a href="https://github.com/Simirror/Roo-Cline-Besiege/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Simirror/Roo-Cline-Besiege?color=2b9348" alt="License Badge"/></a>
</div>

<div align="center">

[English](./README_en.md) | Français | [Deutsch](./README_de.md) | [Eesti](./README_et.md) | [Русский](./README_ru.md) | [简体中文](./README_zh.md)

</div>

<br>
<p align="center"><i>Vous aimez ce projet ? Visitez la <a href="https://marketplace.visualstudio.com/items?itemName=felikspeegel.roo-cline-besiege&ssr=false#review-details">page d'extension VSCode</a></i></p>
<br>

Ceci est une version dérivée spéciale de Roo Cline avec support de la langue chinoise ajouté.

Certains fournisseurs d'API inaccessibles dans les régions spéciales ont été supprimés.

De nouveaux fournisseurs d'API accessibles dans les régions spéciales ont été ajoutés.

Merci à tous les contributeurs. Remerciements particuliers à Roo Cline et Cline.

Et merci à Deepseek pour leur soutien.

## Sommaire

- [État du Support des Modèles](#état-du-support-des-modèles)
- [Journal des Modifications](#journal-des-modifications)
- [Prochaine Mise à Jour](#prochaine-mise-à-jour)
- [Installation et Développement Local](#installation-et-développement-local)
- [Remerciements](#remerciements)
- [Licence](#licence)

## État du Support des Modèles

- BaiDu QianFan (TPM est conservateur, non recommandé)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- CtYun (Accessible, mais ne répond pas aux questions liées à Cline)
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- Volcengine
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- SiliconFlow
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [×] (Partiellement corrigé, encore instable occasionnellement)
- AliYun
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- TencentCloud
    - DeepSeek-R1 [√]
    - DeepSeek-V3 [√]
- ECloud (Le bouton du compte personnel ne fonctionne pas... peut-être un problème personnel)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]
- UCLOUD (Demande soumise, en attente de réponse)
    - DeepSeek-R1 [X]
    - DeepSeek-V3 [X]

## Journal des Modifications

- 0.0.1 2025-02-09
    - Version initiale
- 0.0.2 2025-02-13
    - Ajout du fournisseur Aliyun
    - Correction de Volcengine Deepseek V3 et Baidu Deepseek V3
    - Mise à jour du readme et de l'URL de la boutique
- 0.0.3 2025-02-20
    - Ajout du support des langues française, estonienne, allemande, chinoise, russe (partiel)
    - Ajout du fournisseur TencentCloud
    - Suppression du code inutilisé

## Prochaine Mise à Jour

- [ ] Correction de SiliconFlow Deepseek V3
- [√] Ajout du fournisseur TencentCloud (si fonctionnel)
- [ ] Ajout de plus de modèles
- [√] Support i18n
- [√] Suppression du code inutilisé

La prochaine mise à jour sera jeudi ou vendredi prochain.

## Installation et Développement Local

1. **Cloner** le dépôt :
    ```bash
    git clone https://github.com/RooVetGit/Roo-Code.git
    ```
2. **Installer les dépendances** :
    ```bash
    npm run install:all
    ```
3. **Construire** l'extension :
    ```bash
    npm run build
    ```
    - Un fichier `.vsix` apparaîtra dans le répertoire `bin/`.
4. **Installer** le `.vsix` manuellement si désiré :
    ```bash
    code --install-extension bin/roo-code-4.0.0.vsix
    ```
5. **Démarrer le webview (application Vite/React avec HMR)** :
    ```bash
    npm run dev
    ```
6. **Déboguer** :
    - Appuyez sur `F5` (ou **Exécuter** → **Démarrer le débogage**) dans VSCode pour ouvrir une nouvelle session avec Roo Code chargé.

## Remerciements

Remerciements particuliers à tous les contributeurs de Roo Cline et Cline.

Merci à Deepseek pour tout leur soutien.

## Licence

Ce projet est sous licence [Apache2.0](https://opensource.org/licenses/MIT).

Donnez une ⭐️ si ce projet vous a aidé !
