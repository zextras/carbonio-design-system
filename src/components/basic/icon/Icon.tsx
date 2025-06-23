/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { SVGAttributes } from 'react';
import React, { useMemo } from 'react';

import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react'

import type { Theme, IconComponent } from '../../../theme/theme';
import { getColor } from '../../../theme/theme-utils';
import type { AnyColor, MakeRequired, With$Prefix } from '../../../types/utils';
import { transientOptions } from '../../../utils/emotion';

interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
	/** Icon to show. It can be a string key for the theme icons or a custom icon component */
	icon: keyof Theme['icons'] | IconComponent;
}

interface StyledIconProps {
	/** Icon Color */
	color?: AnyColor;
	/** Icon size */
	size?: keyof Theme['sizes']['icon'];
	/** whether the icon is in a disabled element */
	disabled?: boolean;
}

type IconProps = IconComponentProps & StyledIconProps;

const IconBase = React.forwardRef<SVGSVGElement, IconComponentProps>(function IconBaseFn(
	{ icon, ...rest }: IconComponentProps,
	ref
) {
	const theme = useTheme();
	const IconComp = useMemo(() => {
		if (typeof icon === 'string') {
			return theme.icons[icon] || theme.icons.AlertTriangleOutline;
		}
		return icon;
	}, [theme.icons, icon]);

	return <IconComp data-testid={`icon: ${icon}`} ref={ref} viewBox="0 0 24 24" {...rest} />;
});

const StyledIcon = styled(IconBase, transientOptions)<With$Prefix<MakeRequired<StyledIconProps, 'color' | 'size'>>>`
	display: block;
	fill: currentColor;
	color: ${({ $color, $disabled, theme }): string =>
		getColor(`${$color}.${$disabled ? 'disabled' : 'regular'}`, theme)};
	${({ $size, theme }): ReturnType<typeof css> => css`
		width: ${theme.sizes.icon[$size]};
		height: ${theme.sizes.icon[$size]};
	`};
`;

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function IconFn(
	{ color = 'text', size = 'medium', disabled, ...rest },
	ref
) {
	return <StyledIcon $color={color} $size={size} $disabled={disabled} ref={ref} {...rest} />;
});

export type { IconProps, IconComponentProps, StyledIconProps };
export { Icon };
