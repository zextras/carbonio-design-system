/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react';

import {
	ThemeProvider as SCThemeProvider,
	ThemeContext,
	DefaultTheme,
	StyleSheetManager
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

import DefaultFontStyles from './roboto-global-styles';
import { Theme as defaultTheme } from './theme';
import { generateHighlightSet } from './theme-utils';

interface ThemeProviderProps {
	extension?: (theme: DefaultTheme) => DefaultTheme;
	loadDefaultFont?: boolean;
	direction?: 'ltr' | 'rtl';
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	extension,
	loadDefaultFont,
	direction = 'ltr'
}) => {
	const _theme = useCallback(
		(parentTheme: DefaultTheme = defaultTheme) => {
			const theme = extension ? extension(parentTheme) : parentTheme;
			theme.palette.highlight = generateHighlightSet(theme.palette.primary);
			return theme;
		},
		[extension]
	);

	return (
		<SCThemeProvider theme={_theme}>
			{loadDefaultFont && <DefaultFontStyles />}
			<StyleSheetManager stylisPlugins={direction === 'rtl' ? [stylisRTLPlugin] : []}>
				{children}
			</StyleSheetManager>
		</SCThemeProvider>
	);
};

export { ThemeContext, ThemeProvider, ThemeProviderProps };
