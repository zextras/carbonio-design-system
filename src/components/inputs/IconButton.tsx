/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { getPadding, isThemeSize, useTheme } from '../../theme/theme-utils';
import { Button, ButtonProps } from '../basic/button/Button';

const StyledIconButton = styled(Button)<{
	$iconSize?: string;
	$paddingSize?: string;
}>`
	min-width: fit-content;
	${({ $iconSize }): SimpleInterpolation =>
		$iconSize &&
		css`
			svg {
				width: ${$iconSize};
				min-width: ${$iconSize};
				height: ${$iconSize};
				min-height: ${$iconSize};
			}
		`};
	${({ $paddingSize }): SimpleInterpolation =>
		$paddingSize &&
		css`
			padding: ${$paddingSize};
		`};
`;

type IconButtonProps = ButtonProps & {
	/** Color of the icon */
	iconColor?: string | keyof DefaultTheme['palette'];
	/** Color of the button */
	backgroundColor?: string | keyof DefaultTheme['palette'];
	/** whether to disable the IconButton or not */
	disabled?: boolean;
	/** button size */
	size?: ButtonProps['size'];
	/** Custom button size */
	customSize?: {
		iconSize: string | keyof DefaultTheme['sizes']['icon'];
		paddingSize: 0 | string | keyof DefaultTheme['sizes']['padding'];
	};
	/** icon name */
	icon: keyof DefaultTheme['icons'];
	/** IconButton border radius */
	borderRadius?: 'regular' | 'round';
	/** Click callback */
	onClick: (e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Custom icon color
	 * @deprecated use iconColor instead
	 */
	customIconColor?: string;
	secondaryAction?: never;
};

/** @deprecated use Button with just the icon instead */
const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(function IconButtonFn(
	{
		iconColor = 'text',
		backgroundColor = 'transparent',
		disabled = false,
		customSize,
		size = 'medium',
		icon,
		borderRadius = 'regular',
		onClick,
		customIconColor,
		type = 'default',
		...rest
	},
	ref
) {
	const iconButtonRef = useCombinedRefs<HTMLDivElement>(ref);
	const theme = useTheme();

	const { iconSize, paddingSize } = useMemo(
		() =>
			customSize
				? {
						iconSize: isThemeSize(customSize.iconSize, theme.sizes.icon)
							? theme.sizes.icon[customSize.iconSize]
							: customSize.iconSize,
						paddingSize: getPadding(customSize.paddingSize.toString(), theme)
					}
				: {},
		[customSize, theme]
	);

	const handleClick = useCallback(
		(e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => !disabled && onClick(e),
		[disabled, onClick]
	);
	const keyEvents = useMemo(() => getKeyboardPreset('button', handleClick), [handleClick]);
	useKeyboard(iconButtonRef, keyEvents);

	return (
		<StyledIconButton
			onClick={handleClick}
			icon={icon}
			$iconSize={iconSize}
			$paddingSize={paddingSize}
			backgroundColor={backgroundColor}
			labelColor={customIconColor || iconColor}
			shape={borderRadius}
			size={size}
			ref={iconButtonRef}
			disabled={disabled}
			type={type}
			{...rest}
		/>
	);
});

export { IconButton, IconButtonProps };
