/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

const Comp = styled.div`
	color: ${({ theme, color, disabled }) =>
		getColor(`${color}.${disabled ? 'disabled' : 'regular'}`, theme)};
	font-family: ${({ theme }) => theme.fonts.default};
	font-size: ${({ theme, size }) => theme.sizes.font[size]};
	font-weight: ${({ theme, weight }) => theme.fonts.weight[weight]};
	margin: 0;
	max-width: 100%;
	${(props) =>
		props.overflow === 'ellipsis'
			? `white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;`
			: `overflow-wrap: break-word;
		word-wrap: break-word;
		ms-word-break: break-all;`};
`;

const Text = React.forwardRef(function TextFn({ children, ...rest }, ref) {
	return (
		<Comp ref={ref} {...rest}>
			{children}
		</Comp>
	);
});

Text.propTypes = {
	/** Text color */
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Text size */
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.font))]),
	/** Text weight */
	weight: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.fonts.weight))]),
	/** Overflow handling */
	overflow: PropTypes.oneOf(['ellipsis', 'break-word']),
	disabled: PropTypes.bool
};

Text.defaultProps = {
	color: 'text',
	size: 'medium',
	weight: 'regular',
	overflow: 'ellipsis',
	disabled: false
};

export default Text;
