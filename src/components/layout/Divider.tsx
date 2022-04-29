/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	/** Divider color */
	color: string | keyof ThemeObj['palette'];
}

const DividerEl = styled.div<DividerProps>`
	box-sizing: border-box;
	border-bottom: 1px solid ${({ theme, color }): string => getColor(color, theme)};
	height: 1px;
	max-height: 1px;
	min-height: 1px;
	width: 100%;
`;

const Divider = React.forwardRef<HTMLDivElement, Partial<DividerProps>>(function DividerFn(
	{ color = 'gray2', ...rest },
	ref
) {
	return <DividerEl ref={ref} color={color} {...rest} />;
});

export { Divider, DividerProps };
