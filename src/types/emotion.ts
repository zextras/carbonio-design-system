/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Theme as DSTheme } from '../theme/theme';

declare module '@emotion/react' {
	/**
	 * Augment Theme as suggested inside Emotion module
	 * @see https://emotion.sh/docs/typescript#define-a-theme
	 */
	interface Theme extends DSTheme {}
}
