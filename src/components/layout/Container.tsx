/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useMemo } from 'react';

import { map } from 'lodash';
import styled, { css } from 'styled-components';

import { getColor, getPadding, PaddingObj } from '../../theme/theme-utils';
import { AnyColor, LiteralUnion, With$Prefix } from '../../types/utils';

interface ContainerElProps {
	/** The Container orientation (css flex-direction prop or 'vertical' or 'horizontal') */
	orientation?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	/** Type of the Container's corners */
	borderRadius?: 'regular' | 'round' | 'half' | 'none';
	borderColor?: AnyColor | Partial<Record<'top' | 'right' | 'bottom' | 'left', AnyColor>>;
	/** Container background color */
	background?: AnyColor;
	/** Container height: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	height?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['height']> | number;
	/** Container minHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minHeight?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['minHeight']> | number;
	/** Container maxHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxHeight?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['maxHeight']> | number;
	/** Container width: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	width?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['width']> | number;
	/** Container minWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minWidth?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['minWidth']> | number;
	/** Container maxWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxWidth?: LiteralUnion<'fit' | 'fill', CSSStyleDeclaration['maxWidth']> | number;
	/** Container flex alignment along the main axis */
	mainAlignment?:
		| 'stretch'
		| 'center'
		| 'baseline'
		| 'flex-start'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'unset';
	/** Container flex alignment along the cross axis */
	crossAlignment?: 'stretch' | 'center' | 'baseline' | 'flex-start' | 'flex-end' | 'unset';
	/** Whether the Container items should wrap or not */
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | 'unset';
	/** an object specifying the Container padding */
	padding?: PaddingObj | string | 0;
	/** Gap flex css property */
	gap?: string;
	/** Flex grow css property */
	flexGrow?: string | number;
	/** Flex shrink css property */
	flexShrink?: string | number;
	/** Flex basis css property */
	flexBasis?: string;
	/** Margin css property */
	margin?: { left?: string; right?: string };
}

const ContainerEl = styled.div<With$Prefix<ContainerElProps>>`
	display: flex;
	flex-direction: ${({ $orientation }): string | undefined => $orientation};
	align-items: ${({ $crossAlignment }): string | undefined => $crossAlignment};
	justify-content: ${({ $mainAlignment }): string | undefined => $mainAlignment};
	flex-wrap: ${({ $wrap }): string | undefined => $wrap};
	flex-grow: ${({ $flexGrow }): number | string | undefined => $flexGrow};
	flex-shrink: ${({ $flexShrink }): string | number | undefined => $flexShrink};
	flex-basis: ${({ $flexBasis }): string | undefined => $flexBasis};
	${({ $margin }): ReturnType<typeof css> | undefined =>
		$margin &&
		css`
			${$margin.left &&
			css`
				margin-left: ${$margin.left};
			`};
			${$margin.right &&
			css`
				margin-right: ${$margin.right};
			`};
		`};
	border-radius: ${({ $borderRadius, theme }): string => {
		switch ($borderRadius) {
			case 'regular':
				return theme.borderRadius;
			case 'round':
				return '50%';
			case 'half':
				return `${theme.borderRadius} ${theme.borderRadius} 0 0`;
			default:
				return '0';
		}
	}};
	background: ${({ $background, theme }): string | undefined =>
		$background && getColor($background, theme)};
	box-sizing: border-box;
	width: ${({ $width }): string | undefined => {
		if ($width === 'fill') return '100%;';
		if ($width === 'fit') return 'fit-content';
		if (typeof $width === 'number') return `${$width}px`;
		return $width;
	}};
	min-width: ${({ $minWidth }): string | undefined => {
		if ($minWidth === 'fill') return '100%;';
		if ($minWidth === 'fit') return 'fit-content';
		if (typeof $minWidth === 'number') return `${$minWidth}px`;
		return $minWidth;
	}};
	max-width: ${({ $maxWidth }): string | undefined => {
		if ($maxWidth === 'fill') return '100%;';
		if ($maxWidth === 'fit') return 'fit-content';
		if (typeof $maxWidth === 'number') return `${$maxWidth}px`;
		return $maxWidth;
	}};
	height: ${({ $height }): string | undefined => {
		if ($height === 'fill') return '100%';
		if ($height === 'fit') return 'fit-content';
		if (typeof $height === 'number') return `${$height}px`;
		return $height;
	}};
	min-height: ${({ $minHeight }): string | undefined => {
		if ($minHeight === 'fill') return '100%';
		if ($minHeight === 'fit') return 'fit-content';
		if (typeof $minHeight === 'number') return `${$minHeight}px`;
		return $minHeight;
	}};
	max-height: ${({ $maxHeight }): string | undefined => {
		if ($maxHeight === 'fill') return '100%';
		if ($maxHeight === 'fit') return 'fit-content';
		if (typeof $maxHeight === 'number') return `${$maxHeight}px`;
		return $maxHeight;
	}};
	${({ $borderColor, theme }): ReturnType<typeof css> | false => {
		if ($borderColor) {
			if (typeof $borderColor === 'string') {
				return css`
					border: 0.0625rem solid ${getColor($borderColor, theme)};
				`;
			}
			return map(
				$borderColor,
				(color, key) => color && css`border-${key}: 0.0625rem solid ${getColor(color, theme)};`
			);
		}
		return false;
	}};
	padding: ${({ theme, $padding }): string | undefined | 0 =>
		$padding && getPadding($padding, theme)};
	gap: ${({ $gap }): string | undefined => $gap};
	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 0.25rem;
	}
`;

interface ContainerProps
	extends Omit<ContainerElProps, 'orientation'>,
		Omit<HTMLAttributes<HTMLDivElement>, keyof ContainerElProps> {
	orientation?: 'vertical' | 'horizontal' | ContainerElProps['orientation'];
	children?: React.ReactNode | React.ReactNode[];
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function ContainerFn(
	{
		orientation = 'vertical',
		borderRadius = 'regular',
		borderColor,
		background,
		height = 'fill',
		minHeight = 'unset',
		maxHeight = 'unset',
		width = 'fill',
		minWidth = 'unset',
		maxWidth = 'unset',
		mainAlignment = 'center',
		crossAlignment = 'center',
		wrap = 'nowrap',
		padding,
		gap,
		flexGrow,
		flexShrink,
		flexBasis,
		margin,
		children,
		...rest
	},
	ref
) {
	const direction = useMemo<ContainerElProps['orientation']>(
		() =>
			orientation
				.replace('horizontal', 'row')
				.replace('vertical', 'column') as ContainerElProps['orientation'],
		[orientation]
	);
	return (
		<ContainerEl
			ref={ref}
			$orientation={direction}
			$borderRadius={borderRadius}
			$borderColor={borderColor}
			$background={background}
			$height={height}
			$minHeight={minHeight}
			$maxHeight={maxHeight}
			$width={width}
			$minWidth={minWidth}
			$maxWidth={maxWidth}
			$mainAlignment={mainAlignment}
			$crossAlignment={crossAlignment}
			$wrap={wrap}
			$padding={padding}
			$gap={gap}
			$flexGrow={flexGrow}
			$flexShrink={flexShrink}
			$flexBasis={flexBasis}
			$margin={margin}
			{...rest}
		>
			{children}
		</ContainerEl>
	);
});

export { Container, ContainerProps };
