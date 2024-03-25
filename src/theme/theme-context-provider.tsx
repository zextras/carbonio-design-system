/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react';

import { ThemeProvider as SCThemeProvider, ThemeContext, DefaultTheme } from 'styled-components';

import DefaultFontStyles from './roboto-global-styles';
import { Theme as defaultTheme } from './theme';
import { generateHighlightSet } from './theme-utils';

interface ThemeProviderProps {
	extension?: (theme: DefaultTheme) => DefaultTheme;
	loadDefaultFont?: boolean;
}

const ThemeProvider = ({
	children,
	extension,
	loadDefaultFont
}: React.PropsWithChildren<ThemeProviderProps>): React.JSX.Element => {
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
			{children}
		</SCThemeProvider>
	);
};

export { ThemeContext, ThemeProvider, ThemeProviderProps };
