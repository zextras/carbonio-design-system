/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react';

import { ThemeProvider as EmotionThemeProvider, Global, ThemeContext } from '@emotion/react';
import { isEmpty } from 'lodash';

import DefaultFontStyles from './roboto-global-styles';
import { Theme as defaultTheme } from './theme';
import type { Theme } from './theme';
import { generateHighlightSet } from './theme-utils';

interface ThemeProviderProps {
	extension?: (theme: Theme) => Theme;
	loadDefaultFont?: boolean;
}

const ThemeProvider = ({
	children,
	extension,
	loadDefaultFont
}: React.PropsWithChildren<ThemeProviderProps>): React.JSX.Element => {
	const _theme = useCallback(
		(parentTheme: Theme) => {
			const theme = isEmpty(parentTheme) ? defaultTheme : parentTheme;
			const customizedTheme = extension ? extension(theme) : theme;
			customizedTheme.palette.highlight = generateHighlightSet(customizedTheme.palette.primary);
			return customizedTheme;
		},
		[extension]
	);

	return (
		<EmotionThemeProvider theme={_theme}>
			{loadDefaultFont && <Global styles={DefaultFontStyles} />}
			{children}
		</EmotionThemeProvider>
	);
};

export type { ThemeProviderProps };
export { ThemeContext, ThemeProvider };
