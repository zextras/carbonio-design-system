/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext, useMemo } from 'react';
import styled, { css, SimpleInterpolation, ThemeContext } from 'styled-components';
import { IconComponent, ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

type PaletteColor = keyof ThemeObj['palette'];
type CustomColor = string;
type ColorVariant = keyof ThemeObj['palette'][keyof ThemeObj['palette']];
type ColorWithVariant =
	| PaletteColor
	| CustomColor
	| `${PaletteColor | CustomColor}.${ColorVariant}`;

interface BaseIconProps {
	/** Icon to show. It can be a string key for the theme icons or a custom icon component */
	icon: keyof ThemeObj['icons'] | IconComponent;
}

interface IconProps extends BaseIconProps {
	/** Icon color. Can be a palette color or a custom color and accept a variant.
	 * <br />
	 *  <code>
	 *  type ColorWithVariant = PaletteColor | CustomColor | `${PaletteColor | CustomColor}.${ColorVariant}`;
	 *  </code>
	 */
	color?: ColorWithVariant;
	/** Icon size */
	size?: 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge';
}

function getSize(size: IconProps['size']): SimpleInterpolation {
	switch (size) {
		case 'extrasmall':
			return css`
				width: 8px;
				height: 8px;
			`;
		case 'small':
			return css`
				width: 12px;
				height: 12px;
			`;
		case 'medium':
			return css`
				width: 16px;
				height: 16px;
			`;
		case 'large':
			return css`
				width: 18px;
				height: 18px;
			`;
		case 'extralarge':
			return css`
				width: 24px;
				height: 24px;
			`;
		default:
			return css`
				width: 16px;
				height: 16px;
			`;
	}
}

const Icon = React.forwardRef<SVGSVGElement, BaseIconProps>(function IconFn(
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

const StyledIcon = styled(Icon).attrs<IconProps, Required<Pick<IconProps, 'color' | 'size'>>>(
	({ color, size }) => ({
		color: color || 'text',
		size: size || 'medium'
	})
)<IconProps>`
	display: block;
	fill: currentColor;
	color: ${({ color, theme }): string => getColor(color, theme)};
	${({ size }): SimpleInterpolation => getSize(size)}
`;

export default StyledIcon;
