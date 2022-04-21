/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';
import { getColor, parsePadding } from '../../theme/theme-utils';

const ContainerEl = styled.div`
	display: flex;
	flex-direction: ${(props) => props.orientation};
	align-items: ${(props) => props.crossAlignment};
	justify-content: ${(props) => props.mainAlignment};
	flex-wrap: ${(props) => props.wrap};
	border-radius: ${(props) => {
		switch (props.borderRadius) {
			case 'regular':
				return props.theme.borderRadius;
			case 'round':
				return '50%';
			case 'half':
				return `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`;
			default:
				return '0';
		}
	}};
	background: ${({ background }) => getColor(background)};
	box-sizing: border-box;
	width: ${({ width }) => {
		if (width === 'fill') return '100%;';
		if (width === 'fit') return 'fit-content';
		if (typeof width === 'number') return `${width}px`;
		return width;
	}};
	min-width: ${({ minWidth }) => {
		if (minWidth === 'fill') return '100%;';
		if (minWidth === 'fit') return 'fit-content';
		if (typeof minWidth === 'number') return `${minWidth}px`;
		return minWidth;
	}};
	max-width: ${({ maxWidth }) => {
		if (maxWidth === 'fill') return '100%;';
		if (maxWidth === 'fit') return 'fit-content';
		if (typeof maxWidth === 'number') return `${maxWidth}px`;
		return maxWidth;
	}};
	height: ${({ height }) => {
		if (height === 'fill') return '100%';
		if (height === 'fit') return 'fit-content';
		if (typeof height === 'number') return `${height}px`;
		return height;
	}};
	min-height: ${({ minHeight }) => {
		if (minHeight === 'fill') return '100%';
		if (minHeight === 'fit') return 'fit-content';
		if (typeof minHeight === 'number') return `${minHeight}px`;
		return minHeight;
	}};
	max-height: ${({ maxHeight }) => {
		if (maxHeight === 'fill') return '100%';
		if (maxHeight === 'fit') return 'fit-content';
		if (typeof maxHeight === 'number') return `${maxHeight}px`;
		return maxHeight;
	}};
	${({ borderColor, theme }) =>
		borderColor ? `border: 1px solid ${theme.palette[borderColor].regular}` : ''};
	padding: ${({ theme, padding }) => {
		if (typeof padding === 'string') return parsePadding(padding, theme);

		const p = ['0', '0', '0', '0'];
		if (padding) {
			if (padding.all) {
				p[0] = theme.sizes.padding[padding.all];
				p[1] = theme.sizes.padding[padding.all];
				p[2] = theme.sizes.padding[padding.all];
				p[3] = theme.sizes.padding[padding.all];
			}
			if (padding.vertical) {
				p[0] = theme.sizes.padding[padding.vertical];
				p[2] = theme.sizes.padding[padding.vertical];
			}
			if (padding.horizontal) {
				p[1] = theme.sizes.padding[padding.horizontal];
				p[3] = theme.sizes.padding[padding.horizontal];
			}
			if (padding.top) {
				p[0] = theme.sizes.padding[padding.top];
			}
			if (padding.right) {
				p[1] = theme.sizes.padding[padding.right];
			}
			if (padding.bottom) {
				p[2] = theme.sizes.padding[padding.bottom];
			}
			if (padding.left) {
				p[3] = theme.sizes.padding[padding.left];
			}
		}
		return p.join(' ');
	}};
`;

const Container = React.forwardRef(function ContainerFn({ orientation, children, ...rest }, ref) {
	const direction = useMemo(
		() => orientation.replace('horizontal', 'row').replace('vertical', 'column'),
		[orientation]
	);
	return (
		<ContainerEl ref={ref} orientation={direction} {...rest}>
			{children}
		</ContainerEl>
	);
});

Container.propTypes = {
	/** The Container orientation (css flex-direction prop or 'vertical' or 'horizontal') */
	orientation: PropTypes.string,
	/** Type of the Container's corners */
	borderRadius: PropTypes.oneOf(['regular', 'round', 'half', 'none']),
	/** Container background color */
	background: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	// borderColor: PropTypes.oneOf(Object.keys(Theme.colors.border)),
	/** Container height: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container minHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container maxHeight: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container width: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container minWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container maxWidth: <br/>
	 *  	`fit`: shorthand for fit-content
	 *  	`fill`: semantic alternative for `100%`
	 *  	number: measure in px
	 *  	string: any measure in CSS syntax
	 */
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Container flex alignment along the main axis */
	mainAlignment: PropTypes.oneOf([
		'stretch',
		'center',
		'baseline',
		'flex-start',
		'flex-end',
		'space-between',
		'space-around',
		'space-evenly',
		'unset'
	]),
	/** Container flex alignment along the cross axis */
	crossAlignment: PropTypes.oneOf([
		'stretch',
		'center',
		'baseline',
		'flex-start',
		'flex-end',
		'unset'
	]),
	/** Whether the Container items should wrap or not */
	wrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse', 'unset']),
	/** an object specifying the Container padding */
	padding: PropTypes.shape({
		all: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.padding))]),
		vertical: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.oneOf(Object.keys(Theme.sizes.padding))
		]),
		horizontal: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.oneOf(Object.keys(Theme.sizes.padding))
		]),
		top: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.padding))]),
		right: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.oneOf(Object.keys(Theme.sizes.padding))
		]),
		bottom: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.oneOf(Object.keys(Theme.sizes.padding))
		]),
		left: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.padding))])
	})
};

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
	wrap: 'nowrap',
	background: undefined,
	padding: {}
};

export { Container };
