/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGAttributes, useContext, useMemo } from 'react';
import styled, { css, SimpleInterpolation, ThemeContext } from 'styled-components';
import { IconComponent, ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
	/** Icon to show. It can be a string key for the theme icons or a custom icon component */
	icon: keyof ThemeObj['icons'] | IconComponent;
	/** whether the icon is in a disabled element */
	disabled?: boolean;
	/** action to perform on Icon Click
	 * @deprecated consider using an IconButton instead of an Icon
	 */
	onClick?: React.ReactEventHandler<SVGSVGElement>;
}

interface IconProps extends IconComponentProps {
	/** Icon Color */
	color?: string | keyof ThemeObj['palette'];
	/** Custom color, css syntax
	 * @deprecated use color instead
	 */
	customColor?: string;
	/** Icon size */
	size?: keyof ThemeObj['sizes']['icon'];
}

const IconBase = React.forwardRef<SVGSVGElement, IconComponentProps>(function IconFn(
	{ icon, ...rest },
	ref
) {
	const theme = useContext(ThemeContext);
	const IconComp = useMemo(() => {
		if (typeof icon === 'string') {
			return theme.icons[icon] || theme.icons.AlertTriangleOutline;
		}
		return icon;
	}, [theme.icons, icon]);

	return <IconComp data-testid={`icon: ${icon}`} ref={ref} viewBox="0 0 24 24" {...rest} />;
});

const Icon = styled(IconBase)
	.withConfig({
		shouldForwardProp: (prop) => !['customColor', 'color', 'size'].includes(prop)
	})
	.attrs<IconProps, Required<Pick<IconProps, 'color' | 'size'>>>(
		({ color = 'text', size = 'medium' }) => ({ color, size })
	)<IconProps & React.SVGAttributes<SVGSVGElement>>`
	display: block;
	fill: currentColor;
	color: ${({ customColor, color, disabled, theme }): string =>
		customColor || getColor(`${color}.${disabled ? 'disabled' : 'regular'}`, theme)};
	${({ size, theme }): SimpleInterpolation => css`
		width: ${theme.sizes.icon[size]};
		height: ${theme.sizes.icon[size]};
	`};
`;

export { Icon, IconProps, IconComponentProps };
