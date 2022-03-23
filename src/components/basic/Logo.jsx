/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Theme } from '../../theme/theme';

const Logo = React.forwardRef(function LogoFn({ size, ...rest }, ref) {
	const theme = useContext(ThemeContext);
	const LogoEl = theme.logo.svg;

	return <LogoEl ref={ref} height={theme.logo.size[size]} {...rest} />;
});

Logo.propTypes = {
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.logo.size))])
};

Logo.defaultProps = {
	size: 'small'
};

export { Logo };
