/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGAttributes, useContext, useMemo } from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation, ThemeContext } from 'styled-components';

import { IconComponent } from '../../../theme/theme';
import { getColor } from '../../../theme/theme-utils';
import { AnyColor } from '../../../types/utils';

interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
	/** Icon to show. It can be a string key for the theme icons or a custom icon component */
	icon: keyof DefaultTheme['icons'] | IconComponent;
	/** whether the icon is in a disabled element */
	disabled?: boolean;
}

interface IconProps extends IconComponentProps {
	/** Icon Color */
	color?: AnyColor;
	/** Icon size */
	size?: keyof DefaultTheme['sizes']['icon'];
}

const IconBase = React.forwardRef<SVGSVGElement, IconComponentProps>(function IconBaseFn(
	{ icon, ...rest }: IconComponentProps,
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

const StyledIcon = styled(IconBase).withConfig({
	shouldForwardProp: (prop) => !['color', 'size'].includes(prop)
})<IconProps & Required<Pick<IconProps, 'color' | 'size'>>>`
	display: block;
	fill: currentColor;
	color: ${({ color, disabled, theme }): string =>
		getColor(`${color}.${disabled ? 'disabled' : 'regular'}`, theme)};
	${({ size, theme }): SimpleInterpolation => css`
		width: ${theme.sizes.icon[size]};
		height: ${theme.sizes.icon[size]};
	`};
`;

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function IconFn(
	{ color = 'text', size = 'medium', disabled = false, ...rest }: IconProps,
	ref: React.ForwardedRef<SVGSVGElement>
): React.JSX.Element {
	return <StyledIcon size={size} color={color} disabled={disabled} {...rest} ref={ref} />;
});

export { Icon, IconProps, IconComponentProps };
