/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react';
import styled, { css, keyframes, SimpleInterpolation } from 'styled-components';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Container } from '../layout/Container';
import { Icon } from './Icon';
import { Text } from './Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';

type ButtonSize = 'extrasmall' | 'small' | 'medium' | 'large';
type ButtonType = 'default' | 'outlined' | 'ghost';
type ButtonShape = 'regular' | 'round';
type ButtonColorsByType =
	| ({
			type?: 'default' | 'outlined';
	  } & (
			| {
					/** Main color */
					color?: string | keyof ThemeObj['palette'];
			  }
			| {
					/** Background color of the button (only for 'filled' and 'outlined' types, alternative to color) */
					backgroundColor: string | keyof ThemeObj['palette'];
					/** Specific color of the content (only for 'filled' and 'outlined' types, alternative to color) */
					labelColor: string | keyof ThemeObj['palette'];
			  }
	  ))
	| {
			type: 'ghost';
			/** Main color */
			color?: string | keyof ThemeObj['palette'];
	  };

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

const SIZES: Record<
	ButtonSize,
	{ padding: string; label: keyof ThemeObj['sizes']['font']; icon: string }
> = {
	extrasmall: {
		label: 'small',
		icon: '20px',
		padding: '2px 8px'
	},
	small: {
		label: 'small',
		icon: '22px',
		padding: '8px 14px'
	},
	medium: {
		label: 'medium',
		icon: '24px',
		padding: '10px 16px'
	},
	large: {
		label: 'medium',
		icon: '24px',
		padding: '12px 16px'
	}
} as const;

const COLORS: Record<ButtonType, { backgroundColor: string; color: string }> = {
	outlined: {
		backgroundColor: 'gray6',
		color: 'primary'
	},
	ghost: {
		backgroundColor: 'transparent',
		color: 'primary'
	},
	default: {
		backgroundColor: 'primary',
		color: 'gray6'
	}
} as const;

function getColors(
	type: ButtonType,
	props: ButtonColorsByType
): { color: string; backgroundColor: string } {
	const colors = {
		...COLORS[type]
	};
	if ('backgroundColor' in props && props.backgroundColor) {
		colors.backgroundColor = props.backgroundColor;
	}
	if ('labelColor' in props && props.labelColor) {
		colors.color = props.labelColor;
	}
	if ('color' in props && props.color) {
		if (type === 'default') {
			colors.backgroundColor = props.color;
		} else if (type === 'outlined' || type === 'ghost') {
			colors.color = props.color;
		}
	}
	return colors;
}

const Label = styled(Text)`
	line-height: 1.5;
	user-select: none;
	text-transform: uppercase;
`;

const CustomIcon = styled(Icon)<{ $size: string }>`
	width: ${({ $size }): string => $size};
	height: ${({ $size }): string => $size};
`;

interface StyledContainerProps {
	$buttonType: ButtonType;
	disabled: boolean;
	$color: string;
	background: string;
	$forceActive: boolean;
	$loading: boolean;
	$padding: string;
	$shape: ButtonShape;
}

const ContainerEl = styled(Container).attrs<
	StyledContainerProps,
	{
		$border: string;
		$outerPadding: string;
		$borderRadius: string;
	}
>(({ $buttonType, $padding, $shape }) => ({
	$border: $buttonType === 'outlined' ? '1px solid' : 'none',
	$outerPadding:
		$buttonType === 'outlined'
			? $padding
					.split(' ')
					.map((padding: string) => `calc(${padding} - 1px)`)
					.join(' ')
			: $padding,
	$borderRadius: ($shape === 'round' && '50px') || '2px'
}))<StyledContainerProps>`
	position: relative;
	cursor: ${({ disabled }): string => (disabled ? 'default' : 'pointer')};
	max-width: 100%;
	transition: 0.2s ease-out;

	// padding
	padding: ${({ $outerPadding }): string => $outerPadding};
	gap: 8px;

	// border
	border: ${({ $border }): string => $border};
	border-radius: ${({ $borderRadius }): string => $borderRadius};

	// colors
	${({ $color, background, theme, $forceActive, disabled }): SimpleInterpolation =>
		($forceActive &&
			css`
				color: ${getColor(`${$color}.active`, theme)};
				background-color: ${getColor(`${background}.active`, theme)};
			`) ||
		(disabled &&
			css`
				background: ${getColor(`${background}.disabled`, theme)};
				color: ${getColor(`${$color}.disabled`, theme)};
			`) ||
		css`
			${pseudoClasses(theme, $color, 'color')};
			${pseudoClasses(theme, background, 'background-color')};
			${pseudoClasses(theme, $color, 'border-color')};
		`};
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			color: transparent !important;
		`}
`;

type ButtonProps = {
	/** Button text */
	label?: string;
	/** Button size */
	size?: ButtonSize;
	/**
	 * Button width
	 * `fit`: take the size of the content
	 * `fill`: take the width of the container
	 */
	width?: 'fit' | 'fill';
	/** optional icon to display beside the label */
	icon?: keyof ThemeObj['icons'];
	/** Icon position */
	iconPlacement?: 'left' | 'right';
	/** whether to show the loading icon */
	loading?: boolean;
	/** whether to disable the button or not */
	disabled?: boolean;
	/** Callback to be invoked when the button is pressed */
	onClick: (event: React.SyntheticEvent | KeyboardEvent) => void;
	/** whether to force active status or not */
	forceActive?: boolean;
	/** Shape of the Button */
	shape?: ButtonShape;
} & ButtonColorsByType;

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(function ButtonFn(
	{
		type = 'default',
		disabled = false,
		label,
		size = 'medium',
		width = 'fit',
		icon,
		iconPlacement = 'right',
		onClick,
		loading = false,
		forceActive = false,
		shape = 'regular',
		...rest
	},
	ref
) {
	const buttonRef = useCombinedRefs<HTMLDivElement>(ref);

	const clickHandler = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			if (!disabled) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', clickHandler), [clickHandler]);
	useKeyboard(buttonRef, keyEvents);

	const colors = useMemo(() => getColors(type, rest), [type, rest]);

	return (
		<ContainerEl
			role="button"
			ref={buttonRef}
			orientation={iconPlacement === 'left' ? 'row-reverse' : 'row'}
			width={width}
			height="fit"
			$shape={shape}
			$color={colors.color}
			background={colors.backgroundColor}
			disabled={disabled}
			$forceActive={forceActive}
			$loading={loading ? 1 : 0}
			$padding={SIZES[size].padding}
			crossAlignment="center"
			onClick={clickHandler}
			$buttonType={type}
			{...rest}
			tabIndex={disabled ? -1 : 0}
		>
			<Label size={SIZES[size].label} weight="regular" color="currentColor">
				{label}
			</Label>
			{icon && <CustomIcon icon={icon} $size={SIZES[size].icon} color="currentColor" />}
			{loading && <LoadingIcon color={colors.color} />}
		</ContainerEl>
	);
});

export { Button, ButtonProps };
