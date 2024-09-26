/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled from 'styled-components';

import { ThemeProvider, useTheme } from '../../src';

const Pre = styled.pre`
	color: ${({ theme }): string => theme.palette.text.regular};
`;

const ThemePrinterComponent = (): React.JSX.Element => {
	const { windowObj: _windowObj, ...theme } = useTheme();

	return <Pre>{JSON.stringify(theme, null, 2)}</Pre>;
};

export const ThemePrinter = (): React.JSX.Element => (
	<ThemeProvider>
		<ThemePrinterComponent />
	</ThemeProvider>
);
