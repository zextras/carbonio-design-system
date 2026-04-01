/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import 'storybook/internal/csf';

declare module 'storybook/internal/csf' {
	interface Globals {
		isDarkModeEnabled: boolean | undefined;
	}
}
