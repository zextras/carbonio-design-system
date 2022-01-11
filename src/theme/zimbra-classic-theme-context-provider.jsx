/*
 * Copyright (C) 2011-2021 Zextras
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react';
import { StyleSheetManager } from 'styled-components';
import { ThemeProvider, ThemeContext } from './theme-context-provider';

function ZimbraClassicThemeContextProvider({
	styleSheetTarget = window.top.document.head,
	children,
	extension,
	loadDefaultFont
}) {
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

export default ZimbraClassicThemeContextProvider;
