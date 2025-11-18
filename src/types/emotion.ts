/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Theme } from '../theme/theme';

/**
 * Define a new type alias for the theme used in the design system.
 * It is necessary to define the alias here - instead of inside the import line - because
 * this code is then injected into the bundle declaration file (as a workaround for the
 * fact that api-extractor trims out module augmentations)
 *
 * See also: /scripts/inject-augmentations.ts
 */
type DSTheme = Theme;

declare module '@emotion/react' {
	/**
	 * Augment Theme as suggested inside Emotion module
	 * @see https://emotion.sh/docs/typescript#define-a-theme
	 */
	// Both the DS and Emotion define a `Theme` type, but we are
	// defining and augmenting the one inside the Emotion module,
	// so it is okay to "shadow it" here.
	// eslint-disable-next-line @typescript-eslint/no-shadow
	interface Theme extends DSTheme {}
}
