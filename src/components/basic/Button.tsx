/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef } from 'react';
import styled, { css, keyframes, SimpleInterpolation } from 'styled-components';
import { getColor } from '../../theme/theme-utils';
import { Container } from '../layout/Container';
import { Icon } from './Icon';
import { Text } from './Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';

type ButtonType = 'default' | 'outlined' | 'ghost';

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
	}
`;

const LoadingContainer = styled(Container)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Spinner = styled.span<{ color: string }>`
	display: inline-block;
	width: 0.75rem;
	height: 0.75rem;
	vertical-align: text-bottom;
	color: ${({ theme, color }): string => getColor(color, theme)};
	border: 0.125em solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	animation: ${rotateKeyframes} 0.75s linear infinite;
`;

function LoadingIcon({ color }: { color: string }): JSX.Element {
	return (
		<LoadingContainer data-testid="spinner">
			<Spinner color={color} />
		</LoadingContainer>
	);
}

const colors: Array<keyof ThemeObj['palette']> = [
	'primary',
	'secondary',
	'warning',
	'error',
	'success',
	'info'
];
const fixedColors = colors.reduce<
	Record<
		typeof colors[number],
		Record<
			ButtonType,
			{
				color?: keyof ThemeObj['palette'];
				background?: keyof ThemeObj['palette'];
				border?: keyof ThemeObj['palette'];
			}
		>
	>
>(
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
	{} as Record<
		typeof colors[number],
		Record<
			ButtonType,
			{
				color?: keyof ThemeObj['palette'];
				background?: keyof ThemeObj['palette'];
				border?: keyof ThemeObj['palette'];
			}
		>
	>
);

const Label = styled(Text)`
	user-select: none;
	padding: 0 ${({ theme }): string => theme.sizes.padding.extrasmall};
`;
const ContainerEl = styled(Container)<{
	disabled: boolean;
	$textColor: string;
	background: string;
	$forceActive: boolean;
	$bdColor: string;
	$loading: boolean;
}>`
	position: relative;
	cursor: ${({ disabled }): string => (disabled ? 'default' : 'pointer')};
	max-width: 100%;
	color: ${({ theme, $textColor }): string => getColor($textColor, theme)};
	transition: 0.2s ease-out;
	outline: none;

	${({ disabled, theme, background = 'transparent', $textColor }): SimpleInterpolation =>
		disabled &&
		css`
			background: ${getColor(`${background}.disabled`, theme)};
			color: ${getColor(`${$textColor}.disabled`, theme)};
		`};
	${({
		disabled,
		$forceActive,
		theme,
		background = 'transparent',
		$textColor
	}): SimpleInterpolation =>
		!disabled &&
		!$forceActive &&
		css`
			&:hover {
				background: ${getColor(`${background}.hover`, theme)};
				color: ${getColor(`${$textColor}.hover`, theme)};
			}
			&:focus {
				background: ${getColor(`${background}.focus`, theme)};
				color: ${getColor(`${$textColor}.focus`, theme)};
			}
			&:active {
				background: ${getColor(`${background}.active`, theme)};
				color: ${getColor(`${$textColor}.active`, theme)};
			}
		`}
	${({
		$forceActive,
		disabled,
		background = 'transparent',
		$textColor,
		theme
	}): SimpleInterpolation =>
		!disabled &&
		$forceActive &&
		css`
			background: ${getColor(`${background}.active`, theme)};
			color: ${getColor(`${$textColor}.active`, theme)};
		`}
	${({ $bdColor }): SimpleInterpolation =>
		$bdColor &&
		css`
			border: 1px solid currentColor;
		`};
	${({ theme, $loading, disabled, $bdColor }): SimpleInterpolation =>
		$loading &&
		$bdColor &&
		css`
			border-color: ${getColor(`${$bdColor}.${disabled ? 'disabled' : 'regular'}`, theme)};
			&:hover {
				border-color: ${getColor(`${$bdColor}.hover`, theme)};
			}
			&:focus {
				border-color: ${getColor(`${$bdColor}.focus`, theme)};
			}
			&:active {
				border-color: ${getColor(`${$bdColor}.active`, theme)};
			}
		`}
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			color: transparent !important;
		`}
`;

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
	const bdColor = useMemo(
		() =>
			backgroundColor ||
			(color in fixedColors && fixedColors[color as keyof typeof fixedColors][type].border) ||
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
	const itemSize = useMemo<{
		icon: React.ComponentPropsWithoutRef<typeof Icon>['size'];
		label: React.ComponentPropsWithoutRef<typeof Text>['size'];
		padding: {
			vertical: keyof ThemeObj['sizes']['padding'];
			horizontal: keyof ThemeObj['sizes']['padding'];
		};
	}>(
		() =>
			isSmall
				? {
						icon: 'small',
						label: 'medium',
						padding: {
							vertical: 'extrasmall',
							horizontal: 'small'
						}
				  }
				: {
						icon: 'medium',
						label: 'large',
						padding: {
							vertical: 'small',
							horizontal: 'medium'
						}
				  },
		[isSmall]
	);
	return (
		<ContainerEl
			role="button"
			ref={combinedRef}
			orientation={iconPlacement === 'left' ? 'row-reverse' : 'row'}
			width={size}
			height="fit"
			borderRadius="regular"
			$textColor={textColor}
			$bdColor={type === 'outlined' ? bdColor : undefined}
			background={bgColor}
			disabled={disabled}
			$forceActive={forceActive}
			$loading={loading ? 1 : 0}
			padding={itemSize.padding}
			crossAlignment="center"
			onClick={clickHandler}
			{...rest}
			tabIndex={disabled ? -1 : 0}
		>
			<Label size={itemSize.label} weight="regular" color="currentColor">
				{label.toUpperCase()}
			</Label>
			{icon && (
				<Container width="fit" height="fit" padding={{ horizontal: 'extrasmall' }}>
					<Icon icon={icon} size={itemSize.icon} color="currentColor" />
				</Container>
			)}
			{loading && <LoadingIcon color={textColor} />}
		</ContainerEl>
	);
});

export { Button, ButtonProps };
