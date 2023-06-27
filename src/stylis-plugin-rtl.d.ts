/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { StylisPlugin } from 'styled-components';

declare module 'stylis-plugin-rtl' {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	export default function stylisRTLPluginFix(
		...args: Parameters<StylisPlugin>
	): ReturnType<StylisPlugin>;
}
