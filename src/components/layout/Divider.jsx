/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';

const DividerEl = styled.div`
	box-sizing: border-box;
	border-bottom: 1px solid
		${({ theme, color }) => (color ? theme.palette[color].regular : theme.palette.gray2.regular)};
	height: 1px;
	max-height: 1px;
	min-height: 1px;
	width: 100%;
`;

const Divider = React.forwardRef(function DividerFn({ ...rest }, ref) {
	return <DividerEl ref={ref} {...rest} />;
});

Divider.propTypes = {
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))])
};

Divider.defaultProps = {
	color: 'gray2'
};

export default Divider;
