/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

declare module '*.module.css' {
	const styles: Record<string, string>;
	export default styles;
}

declare module '*.css';