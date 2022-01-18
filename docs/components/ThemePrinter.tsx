/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useContext } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { ThemeContext } from '../../src/theme/theme-context-provider';

const Pre = styled.pre`
	color: ${({ theme }): string => theme.palette.text.regular};
`;

export default function ThemePrinter(): JSX.Element {
	const theme = useContext<DefaultTheme>(ThemeContext);

	return <Pre>{JSON.stringify(theme, null, 2)}</Pre>;
}
