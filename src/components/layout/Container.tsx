/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { ThemeObj } from '../../theme/theme';
import { getColor, getPadding, PaddingObj } from '../../theme/theme-utils';

interface ContainerElProps {
	/** The Container orientation (css flex-direction prop or 'vertical' or 'horizontal') */
	orientation?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	/** Type of the Container's corners */
	borderRadius?: 'regular' | 'round' | 'half' | 'none';
	borderColor?: string | keyof ThemeObj['palette'];
	/** Container background color */
	background?: string | keyof ThemeObj['palette'];
	/** Container height: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	height?: 'fit' | 'fill' | CSSStyleDeclaration['height'] | number;
	/** Container minHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minHeight?: 'fit' | 'fill' | CSSStyleDeclaration['minHeight'] | number;
	/** Container maxHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxHeight?: 'fit' | 'fill' | CSSStyleDeclaration['maxHeight'] | number;
	/** Container width: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	width?: 'fit' | 'fill' | CSSStyleDeclaration['width'] | number;
	/** Container minWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minWidth?: 'fit' | 'fill' | CSSStyleDeclaration['minWidth'] | number;
	/** Container maxWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxWidth?: 'fit' | 'fill' | CSSStyleDeclaration['maxWidth'] | number;
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

const ContainerEl = styled.div<ContainerElProps>`
	display: flex;
	flex-direction: ${({ orientation }): SimpleInterpolation => orientation};
	align-items: ${({ crossAlignment }): SimpleInterpolation => crossAlignment};
	justify-content: ${({ mainAlignment }): SimpleInterpolation => mainAlignment};
	flex-wrap: ${({ wrap }): SimpleInterpolation => wrap};
	flex-grow: ${({ flexGrow }): SimpleInterpolation => flexGrow};
	flex-shrink: ${({ flexShrink }): SimpleInterpolation => flexShrink};
	flex-basis: ${({ flexBasis }): SimpleInterpolation => flexBasis};
	${({ margin }): SimpleInterpolation =>
		margin &&
		css`
			${margin.left &&
			css`
				margin-left: ${margin.left};
			`};
			${margin.right &&
			css`
				margin-right: ${margin.right};
			`};
		`};
	border-radius: ${({ borderRadius, theme }): SimpleInterpolation => {
		switch (borderRadius) {
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
	background: ${({ background, theme }): SimpleInterpolation =>
		background && getColor(background, theme)};
	box-sizing: border-box;
	width: ${({ width }): SimpleInterpolation => {
		if (width === 'fill') return '100%;';
		if (width === 'fit') return 'fit-content';
		if (typeof width === 'number') return `${width}px`;
		return width;
	}};
	min-width: ${({ minWidth }): SimpleInterpolation => {
		if (minWidth === 'fill') return '100%;';
		if (minWidth === 'fit') return 'fit-content';
		if (typeof minWidth === 'number') return `${minWidth}px`;
		return minWidth;
	}};
	max-width: ${({ maxWidth }): SimpleInterpolation => {
		if (maxWidth === 'fill') return '100%;';
		if (maxWidth === 'fit') return 'fit-content';
		if (typeof maxWidth === 'number') return `${maxWidth}px`;
		return maxWidth;
	}};
	height: ${({ height }): SimpleInterpolation => {
		if (height === 'fill') return '100%';
		if (height === 'fit') return 'fit-content';
		if (typeof height === 'number') return `${height}px`;
		return height;
	}};
	min-height: ${({ minHeight }): SimpleInterpolation => {
		if (minHeight === 'fill') return '100%';
		if (minHeight === 'fit') return 'fit-content';
		if (typeof minHeight === 'number') return `${minHeight}px`;
		return minHeight;
	}};
	max-height: ${({ maxHeight }): SimpleInterpolation => {
		if (maxHeight === 'fill') return '100%';
		if (maxHeight === 'fit') return 'fit-content';
		if (typeof maxHeight === 'number') return `${maxHeight}px`;
		return maxHeight;
	}};
	${({ borderColor, theme }): SimpleInterpolation =>
		borderColor && `border: 1px solid ${getColor(borderColor, theme)}`};
	padding: ${({ theme, padding }): SimpleInterpolation => padding && getPadding(padding, theme)};
	gap: ${({ gap }): SimpleInterpolation => gap};
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 4px;
	}
`;

interface ContainerProps
	extends Omit<ContainerElProps, 'orientation'>,
		Omit<HTMLAttributes<HTMLDivElement>, keyof ContainerElProps> {
	orientation?: 'vertical' | 'horizontal' | ContainerElProps['orientation'];
	children?: React.ReactNode | React.ReactNode[];
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function ContainerFn(
	{ orientation = 'vertical', children, ...rest },
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
		<ContainerEl ref={ref} orientation={direction} {...rest}>
			{children}
		</ContainerEl>
	);
});

Container.defaultProps = {
	orientation: 'vertical',
	borderRadius: 'regular',
	height: 'fill',
	width: 'fill',
	minHeight: 'unset',
	minWidth: 'unset',
	maxHeight: 'unset',
	maxWidth: 'unset',
	mainAlignment: 'center',
	crossAlignment: 'center',
	wrap: 'nowrap'
};

export { Container, ContainerProps };
