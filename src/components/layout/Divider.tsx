/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';

import styled from 'styled-components';

import { getColor } from '../../theme/theme-utils';
import { AnyColor, With$Prefix } from '../../types/utils';

interface DividerComponentProps {
	/** Divider color */
	color: AnyColor;
}

const DividerEl = styled.div<With$Prefix<DividerComponentProps>>`
	box-sizing: border-box;
	background-color: ${({ theme, $color }): string => getColor($color, theme)};
	height: 0.0625rem;
	max-height: 0.0625rem;
	min-height: 0.0625rem;
	width: 100%;
`;

type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, keyof DividerComponentProps> &
	Partial<DividerComponentProps>;

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function DividerFn(
	{ color = 'gray2', ...rest },
	ref
) {
	return <DividerEl ref={ref} $color={color} data-testid={'divider'} {...rest} />;
});

export { Divider, DividerProps };
