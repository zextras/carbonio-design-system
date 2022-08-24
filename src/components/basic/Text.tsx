/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

type TextOverflow = 'ellipsis' | 'break-word';

interface TextProps extends HTMLAttributes<HTMLDivElement> {
	/** Text color */
	color?: string | keyof ThemeObj['palette'];
	/** Text size */
	size?: keyof ThemeObj['sizes']['font'];
	/** Text weight */
	weight?: keyof ThemeObj['fonts']['weight'];
	/** Overflow handling */
	overflow?: TextOverflow;
	/** Disabled status */
	disabled?: boolean;
	/** Content of the text */
	children?: React.ReactNode;
}

const Comp = styled.div<{
	disabled: boolean;
	size: keyof ThemeObj['sizes']['font'];
	weight: keyof ThemeObj['fonts']['weight'];
	overflow: string;
}>`
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
					ms-word-break: break-all;
			  `};
`;

const Text = React.forwardRef<HTMLDivElement, TextProps>(function TextFn(
	{
		children,
		color = 'text',
		size = 'medium',
		weight = 'regular',
		overflow = 'ellipsis',
		disabled = false,
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

export { Text, TextProps };
