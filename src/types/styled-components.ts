/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Theme } from '../theme/theme';

declare module 'styled-components' {
	// Augment DefaultTheme as suggested inside styled-components module
	interface DefaultTheme extends Theme {}
}
