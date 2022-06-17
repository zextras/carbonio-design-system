/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { getPadding, isThemeSize, useTheme } from '../../theme/theme-utils';
import { Button, ButtonProps } from '../basic/Button';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import type { ThemeObj } from '../../theme/theme';

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
	iconColor?: string | keyof ThemeObj['palette'];
	/** Color of the button */
	backgroundColor?: string | keyof ThemeObj['palette'];
	/** whether to disable the IconButton or not */
	disabled?: boolean;
	/** button size */
	size?: ButtonProps['size'];
	/** Custom button size */
	customSize?: {
		iconSize: string | keyof ThemeObj['sizes']['icon'];
		paddingSize: 0 | string | keyof ThemeObj['sizes']['padding'];
	};
	/** icon name */
	icon: keyof ThemeObj['icons'];
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

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButtonFn(
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
	const iconButtonRef = useCombinedRefs<HTMLButtonElement>(ref);
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
