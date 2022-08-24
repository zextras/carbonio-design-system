/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react';
import { ThemeProvider as SCThemeProvider, ThemeContext } from 'styled-components';
import { Theme as defaultTheme, ThemeObj } from './theme';
import DefaultFontStyles from './roboto-global-styles';

interface ThemeProviderProps {
	extension?: (theme: ThemeObj) => ThemeObj;
	loadDefaultFont?: boolean;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, extension, loadDefaultFont }) => {
	const _theme = useMemo(() => (extension ? extension(defaultTheme) : defaultTheme), [extension]);

	return (
		<SCThemeProvider theme={_theme}>
			{loadDefaultFont && <DefaultFontStyles />}
			{children}
		</SCThemeProvider>
	);
};

export { ThemeContext, ThemeProvider, ThemeProviderProps };
