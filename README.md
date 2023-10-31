<!--
SPDX-FileCopyrightText: 2021 2022 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->
<div align="center">
  <h1>Carbonio Design System</h1>
</div>

<p align="center">
  <a href="https://github.com/zextras/carbonio-design-system/graphs/contributors" alt="Contributors">
  <img src="https://img.shields.io/github/contributors/zextras/carbonio-design-system" /></a>
  <a href="https://github.com/zextras/carbonio-design-system/pulse" alt="Activity">
  <img src="https://img.shields.io/github/commit-activity/m/zextras/carbonio-design-system" /></a>
  <img src="https://img.shields.io/badge/license-AGPL%203-green" alt="License AGPL 3">
  <img src="https://img.shields.io/badge/project-carbonio-informational" alt="Project Carbonio">
  <a href="https://twitter.com/intent/follow?screen_name=zextras">
  <img src="https://img.shields.io/twitter/follow/zextras?style=social&logo=twitter" alt="Follow on Twitter"></a>
</p>

This is the Design System and Component Library used in most of the Zextras Projects

<h2>Setup</h2>

- Clone the repo

- Install the dependencies:

```
nvm use
npm install
```

- Run Styleguidist in watch mode with

```
npm start
```

- Build the component library with

```
npm run build
```

<h2>Deploy</h2>

To deploy the Design System you will have to first deploy it on carbonio-shell-ui, and after that deploy shell-carbonio-ui to the host.

```
PKG_PATH=<path_to_carbonio_shell_ui> npm run deploy
```

<h2>License</h2>

Released under the AGPL-3.0-only license as specified here: [COPYING](COPYING).
