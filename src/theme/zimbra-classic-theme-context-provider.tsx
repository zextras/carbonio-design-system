/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react';
import { StyleSheetManager } from 'styled-components';
import type { ThemeObj } from './theme';
import { ThemeProvider, ThemeContext } from './theme-context-provider';

interface ZimbraClassicThemeContextProviderProps {
	styleSheetTarget?: HTMLElement;
	children: React.ReactElement;
	extension?: (theme: ThemeObj) => ThemeObj;
	loadDefaultFont?: boolean;
}

function ZimbraClassicThemeContextProvider({
	styleSheetTarget = window.top?.document.head,
	children,
	extension,
	loadDefaultFont
}: ZimbraClassicThemeContextProviderProps): JSX.Element {
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

export { ZimbraClassicThemeContextProvider, ZimbraClassicThemeContextProviderProps };
