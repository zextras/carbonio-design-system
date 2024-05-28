/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { getColor } from '../../../theme/theme-utils';
import { AnyColor } from '../../../types/utils';

type TextOverflow = 'ellipsis' | 'break-word';

interface TextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
	/** Text color */
	color?: AnyColor;
	/** Text size */
	size?: keyof DefaultTheme['sizes']['font'];
	/** Text weight */
	weight?: keyof DefaultTheme['fonts']['weight'];
	/** Overflow handling */
	overflow?: TextOverflow;
	/** Disabled status */
	disabled?: boolean;
	/** Content of the text */
	children?: React.ReactNode;
	/** Italic Font style of the text */
	italic?: boolean;
	/** Alignment of the text */
	textAlign?: React.CSSProperties['textAlign'];
	/** Line Height of the text */
	lineHeight?: number;
}

const Comp = styled.div<{
	$color: AnyColor;
	$disabled: boolean;
	$size: keyof DefaultTheme['sizes']['font'];
	$weight: keyof DefaultTheme['fonts']['weight'];
	$overflow: string;
	$italic: boolean;
	$textAlign?: string;
	$lineHeight?: number;
}>`
	color: ${({ theme, $color, $disabled }): string =>
		getColor(`${$color}.${$disabled ? 'disabled' : 'regular'}`, theme)};
	font-family: ${({ theme }): string => theme.fonts.default};
	font-size: ${({ theme, $size }): string => theme.sizes.font[$size]};
	font-weight: ${({ theme, $weight }): number => theme.fonts.weight[$weight]};
	font-style: ${({ $italic }): SimpleInterpolation => $italic && 'italic'};
	margin: 0;
	max-width: 100%;
	${({ $overflow }): SimpleInterpolation =>
		$overflow === 'ellipsis'
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
	text-align: ${({ $textAlign }): SimpleInterpolation => $textAlign};
	line-height: ${({ $lineHeight }): SimpleInterpolation => $lineHeight};
`;

const Text = React.forwardRef<HTMLDivElement, TextProps>(function TextFn(
	{
		children,
		color = 'text',
		size = 'medium',
		weight = 'regular',
		overflow = 'ellipsis',
		disabled = false,
		italic = false,
		textAlign,
		lineHeight,
		...rest
	}: TextProps,
	ref
) {
	return (
		<Comp
			ref={ref}
			$color={color}
			$size={size}
			$weight={weight}
			$overflow={overflow}
			$disabled={disabled}
			$italic={italic}
			$textAlign={textAlign}
			$lineHeight={lineHeight}
			{...rest}
		>
			{children}
		</Comp>
	);
});

export { Text, TextProps };
