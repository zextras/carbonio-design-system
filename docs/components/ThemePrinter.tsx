/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useContext } from 'react';

import styled, { ThemeContext } from 'styled-components';

const Pre = styled.pre`
	color: ${({ theme }): string => theme.palette.text.regular};
`;

export default function ThemePrinter(): JSX.Element {
	// eslint-disable-next-line unused-imports/no-unused-vars
	const { windowObj, ...theme } = useContext(ThemeContext);

	return <Pre>{JSON.stringify(theme, null, 2)}</Pre>;
}
