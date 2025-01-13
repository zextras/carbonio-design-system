/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react';

import { StyleSheetManager, ThemeContext } from 'styled-components';

import type { Theme } from './theme';
import { ThemeProvider } from './theme-context-provider';

interface ZimbraClassicThemeContextProviderProps {
	styleSheetTarget?: HTMLElement;
	children: React.ReactElement;
	extension?: (theme: Theme) => Theme;
	loadDefaultFont?: boolean;
}

function ZimbraClassicThemeContextProvider({
	styleSheetTarget = window.top?.document.head,
	children,
	extension,
	loadDefaultFont
}: ZimbraClassicThemeContextProviderProps): React.JSX.Element {
	const upperContext = useContext(ThemeContext);
	if (upperContext) {
		return <React.Fragment>{children}</React.Fragment>;
	}
	return (
		<StyleSheetManager target={styleSheetTarget}>
			<ThemeProvider loadDefaultFont={loadDefaultFont} extension={extension}>
				{children}
			</ThemeProvider>
		</StyleSheetManager>
	);
}

export type { ZimbraClassicThemeContextProviderProps };
export { ZimbraClassicThemeContextProvider };
