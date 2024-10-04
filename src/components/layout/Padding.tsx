/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';

import { omit } from 'lodash';
import styled, { DefaultTheme } from 'styled-components';

import { getPadding, PaddingObj } from '../../theme/theme-utils';
import { AllKeys } from '../../types/utils';

type PaddingComponentProps = {
	width?: string;
	height?: string;
	children?: React.ReactNode | React.ReactNode[];
} & PaddingObj;

type PaddingProps = PaddingComponentProps &
	Omit<HTMLAttributes<HTMLDivElement>, keyof PaddingComponentProps>;

const Comp = styled.div<{
	$height?: string;
	$width?: string;
	$padding: (args: { theme: DefaultTheme }) => string;
}>`
	height: ${({ $height }): string | undefined => $height};
	width: ${({ $width }): string | undefined => $width};
	padding: ${({ theme, $padding }): string => $padding({ theme })};
`;

const paddingObjKeys = Object.keys({
	value: undefined,
	all: undefined,
	bottom: undefined,
	left: undefined,
	top: undefined,
	right: undefined,
	horizontal: undefined,
	vertical: undefined
} satisfies Record<AllKeys<PaddingObj>, undefined>);

const Padding = React.forwardRef<HTMLDivElement, PaddingProps>(function PaddingFn(
	{ children, width = 'fit-content', height = 'fit-content', ...props },
	ref
) {
	// omit the padding obj properties from the props, in order to pass down to the styled components only the valid html props
	const rest = omit(props, paddingObjKeys);

	return (
		<Comp ref={ref} $height={height} $width={width} $padding={getPadding(props)} {...rest}>
			{children}
		</Comp>
	);
});

export { Padding, PaddingProps };
