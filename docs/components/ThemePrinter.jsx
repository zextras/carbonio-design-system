/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, {useContext} from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../src/theme/theme-context-provider';

const Pre = styled.pre`
	color: ${({ theme }) => theme.palette.text.regular};
`;

export default function ThemePrinter() {
	const { _theme } = useContext(ThemeContext);

	return <Pre>{JSON.stringify(_theme, null, 2)}</Pre>;
}
