/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';

import styled from 'styled-components';

import { getColor } from '../../../theme/theme-utils';
import { AnyColor, MakeRequired, With$Prefix } from '../../../types/utils';

interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
	/** Divider color */
	color?: AnyColor;
}

const DividerEl = styled.div<With$Prefix<MakeRequired<DividerProps, 'color'>>>`
	box-sizing: border-box;
	background-color: ${({ theme, $color }): string => getColor($color, theme)};
	height: 0.0625rem;
	max-height: 0.0625rem;
	min-height: 0.0625rem;
	width: 100%;
`;

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function DividerFn(
	{ color = 'gray2', ...rest },
	ref
) {
	return <DividerEl ref={ref} $color={color} data-testid={'divider'} {...rest} />;
});

export { Divider, DividerProps };
