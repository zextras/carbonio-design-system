/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

export interface TextProps {
	/** Text color */
	color?: string | keyof ThemeObj['palette'];
	/** Text size */
	size?: keyof ThemeObj['sizes']['font'];
	/** Text weight */
	weight?: keyof ThemeObj['fonts']['weight'];
	/** Overflow handling */
	overflow?: 'ellipsis' | 'break-word';
	/** Style text as disabled */
	disabled?: boolean;
	children: React.ReactNode;
}

const Comp = styled.div<Required<TextProps>>`
	color: ${({ theme, color, disabled }): string =>
		getColor(`${color}.${disabled ? 'disabled' : 'regular'}`, theme)};
	font-family: ${({ theme }): string => theme.fonts.default};
	font-size: ${({ theme, size }): string => theme.sizes.font[size]};
	font-weight: ${({ theme, weight }): number => theme.fonts.weight[weight]};
	margin: 0;
	max-width: 100%;
	${({ overflow }): SimpleInterpolation =>
		overflow === 'ellipsis'
			? css`
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
			  `
			: css`
					overflow-wrap: break-word;
					word-wrap: break-word;
					word-break: break-word;
			  `};
`;

const Text = React.forwardRef<HTMLDivElement, TextProps>(function TextFn(
	{
		color = 'text',
		size = 'medium',
		weight = 'regular',
		overflow = 'ellipsis',
		disabled = false,
		children,
		...rest
	},
	ref
) {
	return (
		<Comp
			ref={ref}
			color={color}
			size={size}
			weight={weight}
			overflow={overflow}
			disabled={disabled}
			{...rest}
		>
			{children}
		</Comp>
	);
});

export default Text;
