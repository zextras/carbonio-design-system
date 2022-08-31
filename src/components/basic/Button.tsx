/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ButtonHTMLAttributes, useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import type { ThemeObj } from '../../theme/theme';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Icon, IconProps } from './Icon';
import { Spinner } from './Spinner';
import { Text } from './Text';

type ButtonShape = 'regular' | 'round';
type ButtonSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge';
type ButtonWidth = 'fit' | 'fill';
type ButtonIconPlacement = 'left' | 'right';
type ButtonColorsByType =
	| ({
			type?: 'default' | 'outlined';
	  } & (
			| {
					/** Main color */
					color?: string | keyof ThemeObj['palette'];
			  }
			| {
					/** Background color of the button (only for 'default' and 'outlined' types, to use instead of color for more specificity) */
					backgroundColor?: string | keyof ThemeObj['palette'];
					/** Specific color of the content (only for 'default' and 'outlined' types, to use instead of color for more specificity) */
					labelColor?: string | keyof ThemeObj['palette'];
			  }
	  ))
	| {
			type: 'ghost';
			/** Main color */
			color?: string | keyof ThemeObj['palette'];
	  };
type ButtonType = NonNullable<ButtonColorsByType['type']>;

interface ButtonSecondaryAction {
	/** Icon of the secondary action */
	icon: IconProps['icon'];
	/** Callback for the secondary action */
	onClick: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Disabled status for the secondary action */
	disabled?: boolean;
	/** forceActive status for the secondary action */
	forceActive?: boolean;
	/** Ref object to assign to secondary button */
	ref?: React.RefObject<HTMLButtonElement>;
}

type ButtonPropsInternal = {
	/** Force active status */
	forceActive?: boolean;
	/** Disabled status */
	disabled?: boolean;
	/** Icon to display beside the label */
	icon?: IconProps['icon'];
	/** Icon position relative to the label  */
	iconPlacement?: ButtonIconPlacement;
	/** Text content of the button */
	label?: string;
	/** Whether to show the loading icon */
	loading?: boolean;
	/** Main action callback */
	onClick: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Shape of the button */
	shape?: ButtonShape;
	/** Width of the button */
	width?: ButtonWidth;
} & (
	| {
			/** Size variant of the button */
			size?: 'medium' | 'large' | 'extralarge';
			/** Secondary action object (available only for medium and large buttons) */
			secondaryAction?: ButtonSecondaryAction;
	  }
	| {
			/** Size variant of the button */
			size?: ButtonSize;
			secondaryAction?: undefined;
	  }
) &
	ButtonColorsByType;

type ButtonProps = ButtonPropsInternal &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonPropsInternal>;

interface StyledButtonProps {
	backgroundColor: string;
	color: string;
	padding: string;
	gap: string;
	shape: ButtonShape;
	// cannot name this prop type because of conflicts with button type prop
	buttonType: ButtonType;
	iconPlacement?: ButtonIconPlacement;
	disabled: boolean;
	forceActive: boolean;
	width: ButtonWidth;
}

const StyledIcon = styled(Icon)<{ $loading?: boolean; $size: string }>`
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			opacity: 0;
		`};
	width: ${({ $size }): string => $size};
	min-width: ${({ $size }): string => $size};
	height: ${({ $size }): string => $size};
	min-height: ${({ $size }): string => $size};
	flex-shrink: 0;
`;

const StyledText = styled(Text)<{ $loading: boolean; $size: string }>`
	user-select: none;
	text-transform: uppercase;
	font-size: ${({ $size }): string => $size};
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			opacity: 0;
		`};
`;

const StyledLoadingContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledButton = styled.button.attrs<
	StyledButtonProps,
	{
		border: string;
		outerPadding: string;
	}
>(({ buttonType, padding, disabled }) => ({
	border: buttonType === 'outlined' ? '1px solid' : 'none',
	outerPadding: buttonType === 'outlined' ? `calc(${padding} - 1px)` : padding,
	tabIndex: disabled ? -1 : 0
}))<StyledButtonProps>`
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	text-transform: uppercase;
	/* padding */
	padding: ${({ outerPadding }): string => outerPadding};
	gap: ${({ gap }): string => gap};
	/* width */
	width: ${({ width }): SimpleInterpolation =>
		(width === 'fill' && '100%') || (width === 'fit' && 'auto')};
	max-width: 100%;
	min-width: 0;
	/* order of elements */
	${StyledIcon} {
		order: ${({ iconPlacement = 'left' }): number | false =>
			(iconPlacement === 'left' && 1) || (iconPlacement === 'right' && 2)};
	}
	${StyledText} {
		order: ${({ iconPlacement = 'left' }): number | false =>
			(iconPlacement === 'left' && 2) || (iconPlacement === 'right' && 1)};
	}
	/* border */
	border: ${({ border }): string => border};
	border-radius: ${({ shape }): SimpleInterpolation =>
		(shape === 'regular' && '4px') || (shape === 'round' && '50px')};
	/* colors */
	${({ color, backgroundColor, theme, forceActive }): SimpleInterpolation =>
		forceActive
			? css`
					color: ${getColor(`${color}.active`, theme)};
					background-color: ${getColor(`${backgroundColor}.active`, theme)};
			  `
			: css`
					${pseudoClasses(theme, color, 'color')};
					${pseudoClasses(theme, backgroundColor, 'background-color')};
					${pseudoClasses(theme, color, 'border-color')};
			  `};

	/* cursor */
	cursor: pointer;
	&:disabled {
		cursor: default;
	}
`;

const StyledSecondaryAction = styled(StyledButton)<{ $loading: boolean }>`
	flex-shrink: 0;
	min-width: fit-content;
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			opacity: 0;
		`};
`;

const StyledSecondaryActionPlaceholder = styled.span<{ padding: string }>`
	/* padding */
	padding: ${({ padding }): string => padding};
	order: 3;
	visibility: hidden;
`;

const StyledGrid = styled.div<{ width: 'fill' | 'fit'; padding: string }>`
	width: ${({ width }): SimpleInterpolation =>
		(width === 'fill' && '100%') || (width === 'fit' && 'fit-content')};
	max-width: 100%;

	display: grid;
	place-items: center;
	align-content: center;
	justify-content: stretch;

	${StyledButton} {
		grid-row: 1;
		grid-column: 1;
	}

	${StyledSecondaryAction} {
		grid-row: 1;
		grid-column: 1;
		justify-self: end;
		margin-right: ${({ padding }): string => padding};
	}
`;

const SIZES: Record<ButtonSize, { label: string; icon: string; padding: string; gap: string }> &
	Record<
		'medium' | 'large' | 'extralarge',
		{ secondaryButton: { icon: string; padding: string } }
	> = {
	extrasmall: {
		label: '8px',
		icon: '8px',
		padding: '4px',
		gap: '4px'
	},
	small: {
		label: '12px',
		icon: '12px',
		padding: '4px',
		gap: '4px'
	},
	medium: {
		label: '16px',
		icon: '16px',
		padding: '8px',
		gap: '8px',
		secondaryButton: {
			icon: '16px',
			padding: '0px'
		}
	},
	large: {
		label: '20px',
		icon: '20px',
		padding: '8px',
		gap: '8px',
		secondaryButton: {
			icon: '20px',
			padding: '0px'
		}
	},
	extralarge: {
		label: '20px',
		icon: '20px',
		padding: '12px',
		gap: '8px',
		secondaryButton: {
			icon: '20px',
			padding: '0px'
		}
	}
} as const;

const DEFAULT_COLORS = {
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
): Pick<StyledButtonProps, 'color' | 'backgroundColor'> {
	const colors: Pick<StyledButtonProps, 'color' | 'backgroundColor'> = {
		...DEFAULT_COLORS[type]
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function ButtonFn(
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
		secondaryAction,
		...rest
	},
	ref
) {
	const buttonRef = useCombinedRefs<HTMLButtonElement>(ref);

	const clickHandler = useCallback(
		(e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
			if (!disabled && onClick && !e.defaultPrevented) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);

	const secondaryActionClickHandler = useCallback(
		(e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
			if (secondaryAction && !secondaryAction.disabled) {
				secondaryAction.onClick(e);
			}
			e.preventDefault();
		},
		[secondaryAction]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', clickHandler), [clickHandler]);
	useKeyboard(buttonRef, keyEvents);

	const colors = useMemo(() => getColors(type, { type, ...rest }), [type, rest]);

	return (
		<StyledGrid width={width} padding={SIZES[size].padding}>
			<StyledButton
				{...rest}
				backgroundColor={colors.backgroundColor}
				color={colors.color}
				forceActive={!disabled && forceActive}
				disabled={disabled}
				shape={shape}
				buttonType={type}
				padding={SIZES[size].padding}
				gap={SIZES[size].gap}
				iconPlacement={iconPlacement}
				onClick={clickHandler}
				ref={buttonRef}
				width={width}
			>
				{icon && (
					<StyledIcon
						icon={icon}
						color="currentColor"
						$size={SIZES[size].icon}
						$loading={loading}
					/>
				)}
				{label && (
					<StyledText color="currentColor" $size={SIZES[size].label} $loading={loading}>
						{label}
					</StyledText>
				)}

				{secondaryAction && size !== 'extrasmall' && size !== 'small' && (
					<StyledSecondaryActionPlaceholder padding={SIZES[size].secondaryButton.padding}>
						<StyledIcon
							icon={`${secondaryAction.icon}Placeholder`}
							color="currentColor"
							$size={SIZES[size].secondaryButton.icon}
						/>
					</StyledSecondaryActionPlaceholder>
				)}

				{loading && (
					<StyledLoadingContainer>
						<Spinner color="currentColor" />
					</StyledLoadingContainer>
				)}
			</StyledButton>
			{secondaryAction && size !== 'extrasmall' && size !== 'small' && (
				<StyledSecondaryAction
					backgroundColor={colors.backgroundColor}
					color={colors.color}
					forceActive={!secondaryAction.disabled && !!secondaryAction.forceActive}
					disabled={!!secondaryAction.disabled}
					shape={shape}
					buttonType={(type === 'outlined' && 'default') || type}
					padding={SIZES[size].secondaryButton.padding}
					gap={SIZES[size].gap}
					onClick={secondaryActionClickHandler}
					$loading={loading}
					width="fit"
					ref={secondaryAction.ref}
				>
					<StyledIcon
						icon={secondaryAction.icon}
						color="currentColor"
						$size={SIZES[size].secondaryButton.icon}
					/>
				</StyledSecondaryAction>
			)}
		</StyledGrid>
	);
});

export { Button, ButtonProps, ButtonSecondaryAction };
