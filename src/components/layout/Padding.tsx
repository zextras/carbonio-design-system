/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';
import styled, { SimpleInterpolation } from 'styled-components';
import { getPadding, PaddingObj } from '../../theme/theme-utils';

type PaddingProps = {
	width?: string;
	height?: string;
	children?: React.ReactNode | React.ReactNode[];
} & PaddingObj &
	HTMLAttributes<HTMLDivElement>;

const Comp = styled.div<PaddingProps>`
	height: ${({ height }): SimpleInterpolation => height};
	width: ${({ width }): SimpleInterpolation => width};
	padding: ${({ theme, ...props }): string => getPadding(props, theme)};
`;

const Padding = React.forwardRef<
	HTMLDivElement,
	PaddingProps & Omit<HTMLAttributes<HTMLDivElement>, keyof PaddingProps>
>(function PaddingFn({ children, ...rest }, ref) {
	return (
		<Comp ref={ref} {...rest}>
			{children}
		</Comp>
	);
});

Padding.defaultProps = {
	width: 'fit-content',
	height: 'fit-content'
};

export { Padding, PaddingProps };
