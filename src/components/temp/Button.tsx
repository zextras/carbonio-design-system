/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { reduce } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';
import { Button as ButtonNew } from '../basic/Button';

type ButtonType = 'default' | 'outlined' | 'ghost';

const colors: Array<keyof ThemeObj['palette']> = [
	'primary',
	'secondary',
	'warning',
	'error',
	'success',
	'info'
];

type FixedColorsObj = Record<
	keyof ThemeObj['palette'],
	Record<
		ButtonType,
		{
			color?: keyof ThemeObj['palette'];
			background?: keyof ThemeObj['palette'];
			border?: keyof ThemeObj['palette'];
		}
	>
>;

const fixedColors = reduce<keyof ThemeObj['palette'], FixedColorsObj>(
	colors,
	(prev, currentValue) => {
		// eslint-disable-next-line no-param-reassign
		prev[currentValue] = {
			default: {
				color: 'gray6'
			},
			outlined: {
				background: 'transparent'
			},
			ghost: {
				background: 'transparent',
				border: 'transparent'
			}
		};
		return prev;
	},
	{} as FixedColorsObj
);

interface ButtonProps {
	/** Type of button */
	type?: ButtonType;
	/** Color of button */
	color?: string | keyof ThemeObj['palette'];
	/** Color of the Button label */
	labelColor?: string | keyof ThemeObj['palette'];
	/** Color of the Button background */
	backgroundColor?: string | keyof ThemeObj['palette'];
	/** Button text */
	label: string;
	/** `fit`: assume the size of the content
	 *
	 *  `fill`: take the width of the container
	 */
	size?: 'fit' | 'fill';
	/** optional icon to display beside the label */
	icon?: keyof ThemeObj['icons'];
	/** Icon position */
	iconPlacement?: 'left' | 'right';
	/** whether to show the loading icon */
	loading?: boolean;
	/** small item size */
	isSmall?: boolean;
	/** whether to disable the button or not */
	disabled?: boolean;
	/** Callback to be invoked when the button is pressed */
	onClick: (event: React.SyntheticEvent | KeyboardEvent) => void;
	/** whether to force active status or not */
	forceActive?: boolean;
}

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(function ButtonFn(
	{
		type = 'default',
		color = 'primary',
		disabled = false,
		labelColor,
		backgroundColor,
		label,
		size = 'fit',
		icon,
		iconPlacement = 'right',
		onClick,
		loading = false,
		isSmall = false,
		forceActive = false,
		...rest
	},
	ref
) {
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const combinedRef = useCombinedRefs<HTMLDivElement>(ref, buttonRef);

	const clickHandler = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			if (!disabled) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', clickHandler), [clickHandler]);
	useKeyboard(combinedRef, keyEvents);

	const bgColor = useMemo(
		() =>
			backgroundColor ||
			(color in fixedColors && fixedColors[color as keyof typeof fixedColors][type].background) ||
			color,
		[backgroundColor, color, type]
	);
	const textColor = useMemo(
		() =>
			labelColor ||
			(color in fixedColors && fixedColors[color as keyof typeof fixedColors][type].color) ||
			color,
		[labelColor, color, type]
	);
	return (
		<ButtonNew
			type={type}
			color={color}
			disabled={disabled}
			labelColor={textColor}
			backgroundColor={bgColor}
			label={label}
			width={size}
			icon={icon}
			iconPlacement={iconPlacement}
			onClick={onClick}
			loading={loading}
			size={isSmall ? 'small' : undefined}
			forceActive={forceActive}
			{...rest}
		/>
	);
});

export { Button as ButtonOld, ButtonProps as ButtonOldProps };
