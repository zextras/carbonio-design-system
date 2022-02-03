/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { Theme } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

const Icon = React.forwardRef(function IconFn(
	{ icon, size, color, customColor, disabled, style, onClick, ...rest },
	ref
) {
	const theme = useContext(ThemeContext);
	const IconComp = useMemo(() => {
		if (typeof icon === 'function') return icon;
		return theme.icons[icon] || theme.icons.AlertTriangleOutline;
	}, [theme.icons, icon]);

	return (
		<IconComp
			data-testid={`icon: ${icon.name || icon}`}
			ref={ref}
			onClick={onClick || (() => null)}
			width={theme.sizes.icon[size]}
			height={theme.sizes.icon[size]}
			fill="currentColor"
			viewBox="0 0 24 24"
			style={{
				display: 'block',
				cursor: onClick ? 'pointer' : 'inherit',
				color: customColor || getColor(`${color}.${disabled ? 'disabled' : 'regular'}`, theme),
				...style
			}}
			{...rest}
		/>
	);
});

Icon.propTypes = {
	/** Icon size */
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.sizes.icon))]),
	/** Icon Color. Accept the variant in the form color.variant */
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Custom color, css syntax */
	customColor: PropTypes.string,
	/** Icon name, as key for the theme's icon map */
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.icons)),
		PropTypes.element,
		PropTypes.func
	]),
	/** whether the icon is in a disabled element */
	disabled: PropTypes.bool,
	/** action to perform on Icon Click */
	onClick: PropTypes.func
};

Icon.defaultProps = {
	color: 'text',
	size: 'medium',
	disabled: false,
	customColor: undefined,
	icon: 'AlertTriangleOutline'
};

export default Icon;
