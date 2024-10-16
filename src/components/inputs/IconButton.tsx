/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react';

import styled, { css, DefaultTheme, useTheme } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { getPadding, isThemeSize } from '../../theme/theme-utils';
import { AnyColor } from '../../types/utils';
import { Button, ButtonProps } from '../basic/button/Button';

const StyledIconButton = styled(Button)<{
	$iconSize?: string;
	$paddingSize?: string;
}>`
	min-width: fit-content;
	${({ $iconSize }): ReturnType<typeof css> | undefined | string =>
		$iconSize &&
		css`
			svg {
				width: ${$iconSize};
				min-width: ${$iconSize};
				height: ${$iconSize};
				min-height: ${$iconSize};
			}
		`};
	${({ $paddingSize }): ReturnType<typeof css> | undefined | string =>
		$paddingSize &&
		css`
			padding: ${$paddingSize};
		`};
`;

type IconButtonProps = Omit<ButtonProps, 'secondaryAction'> & {
	/** Color of the icon */
	iconColor?: AnyColor;
	/** Color of the button */
	backgroundColor?: AnyColor;
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
		color,
		labelColor,
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

	const colorsAndType = useMemo<
		| { type: 'default' | 'outlined'; labelColor: AnyColor; backgroundColor: AnyColor }
		| { type: 'ghost'; color: AnyColor }
	>(() => {
		if (type === 'ghost') {
			return { type, color: color ?? labelColor ?? customIconColor ?? iconColor };
		}
		if (type === 'outlined') {
			return {
				type,
				labelColor: color ?? labelColor ?? customIconColor ?? iconColor,
				backgroundColor
			};
		}
		return {
			type,
			labelColor: labelColor ?? customIconColor ?? iconColor,
			backgroundColor: color ?? backgroundColor
		};
	}, [backgroundColor, color, customIconColor, iconColor, labelColor, type]);

	return (
		<StyledIconButton
			onClick={handleClick}
			icon={icon}
			$iconSize={iconSize}
			$paddingSize={paddingSize}
			shape={borderRadius}
			size={size}
			ref={iconButtonRef}
			disabled={disabled}
			{...colorsAndType}
			{...rest}
		/>
	);
});

export { IconButton, IconButtonProps };
