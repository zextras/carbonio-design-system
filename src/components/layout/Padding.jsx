/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';
import { parsePadding } from '../../theme/theme-utils';

function getPadding(props) {
	if (props.value) return parsePadding(props.value, props.theme);

	const p = ['0', '0', '0', '0'];
	if (props.all) {
		p[0] = props.theme.sizes.padding[props.all];
		p[1] = props.theme.sizes.padding[props.all];
		p[2] = props.theme.sizes.padding[props.all];
		p[3] = props.theme.sizes.padding[props.all];
	}
	if (props.vertical) {
		p[0] = props.theme.sizes.padding[props.vertical];
		p[2] = props.theme.sizes.padding[props.vertical];
	}
	if (props.horizontal) {
		p[1] = props.theme.sizes.padding[props.horizontal];
		p[3] = props.theme.sizes.padding[props.horizontal];
	}
	if (props.top) {
		p[0] = props.theme.sizes.padding[props.top];
	}
	if (props.right) {
		p[1] = props.theme.sizes.padding[props.right];
	}
	if (props.bottom) {
		p[2] = props.theme.sizes.padding[props.bottom];
	}
	if (props.left) {
		p[3] = props.theme.sizes.padding[props.left];
	}
	return p.join(' ');
}
const Comp = styled.div`
	height: ${({ height }) => height};
	width: ${({ width }) => width};
	padding: ${(props) => getPadding(props)};
`;

const Padding = React.forwardRef(function PaddingFn({ children, ...rest }, ref) {
	return (
		<Comp ref={ref} {...rest}>
			{children}
		</Comp>
	);
});

Padding.propTypes = {
	value: PropTypes.string,
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
	right: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.padding))]),
	bottom: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.sizes.padding))
	]),
	left: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.padding))]),
	width: PropTypes.string,
	height: PropTypes.string
};

Padding.defaultProps = {
	value: undefined,
	all: undefined,
	vertical: undefined,
	horizontal: undefined,
	top: undefined,
	right: undefined,
	bottom: undefined,
	left: undefined,
	width: 'fit-content',
	height: 'fit-content'
};

export default Padding;
