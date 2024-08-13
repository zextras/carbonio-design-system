/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ButtonHTMLAttributes, useCallback, useMemo } from 'react';

import styled, { css } from 'styled-components';

import { useCombinedRefs } from '../../../hooks/useCombinedRefs';
import { getColor, pseudoClasses } from '../../../theme/theme-utils';
import { AnyColor, With$Prefix, Without$Prefix } from '../../../types/utils';
import { Icon, IconProps } from '../icon/Icon';
import { Spinner } from '../Spinner';
import { Text } from '../text/Text';

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
					color?: AnyColor;
					backgroundColor?: never;
					labelColor?: never;
			  }
			| {
					color?: never;
					/** Background color of the button (only for 'default' and 'outlined' types, to use instead of color for more specificity) */
					backgroundColor?: AnyColor;
					/** Specific color of the content (only for 'default' and 'outlined' types, to use instead of color for more specificity) */
					labelColor?: AnyColor;
			  }
	  ))
	| {
			type: 'ghost';
			/** Main color */
			color?: AnyColor;
			backgroundColor?: never;
			labelColor?: never;
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
	/** min width of the button */
	minWidth?: string;
	/** Ref for the button element */
	buttonRef?: React.Ref<HTMLButtonElement> | null;
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
			secondaryAction?: never;
	  }
) &
	ButtonColorsByType;

type ButtonProps = ButtonPropsInternal &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonPropsInternal>;

type StyledButtonProps = With$Prefix<{
	backgroundColor: string;
	color: string;
	padding: string;
	gap: string;
	shape: ButtonShape;
	// cannot name this prop type because of conflicts with button type prop
	buttonType: ButtonType;
	iconPlacement?: ButtonIconPlacement;
	forceActive: boolean;
	width: ButtonWidth;
	minWidth?: string;
}>;

const StyledIcon = styled(Icon)<{ $loading?: boolean; $size: string }>`
	${({ $loading }): ReturnType<typeof css> | false | undefined =>
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
	${({ $loading }): ReturnType<typeof css> | false | undefined =>
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

const StyledButton = styled.button.attrs<StyledButtonProps>(({ disabled, $minWidth }) => ({
	tabIndex: disabled ? -1 : 0,
	$minWidth: $minWidth ?? '0'
}))<StyledButtonProps>`
	/* set line-height to normal so that the browser can calculate it based on the font, and the accents are not cut off */
	line-height: normal;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	text-transform: uppercase;
	/* padding */
	padding: ${({ $buttonType, $padding }): string =>
		$buttonType === 'outlined' ? `calc(${$padding} - 0.0625rem)` : $padding};
	gap: ${({ $gap }): string => $gap};
	/* width */
	width: ${({ $width }): string | false | undefined =>
		($width === 'fill' && '100%') || ($width === 'fit' && 'auto')};
	max-width: 100%;
	min-width: 0;
	/* order of elements */
	${StyledIcon} {
		order: ${({ $iconPlacement = 'left' }): number | false =>
			($iconPlacement === 'left' && 1) || ($iconPlacement === 'right' && 2)};
	}
	${StyledText} {
		order: ${({ $iconPlacement = 'left' }): number | false =>
			($iconPlacement === 'left' && 2) || ($iconPlacement === 'right' && 1)};
	}
	/* border */
	border: ${({ $buttonType }): string => ($buttonType === 'outlined' ? '0.0625rem solid' : 'none')};
	border-radius: ${({ $shape }): false | string =>
		($shape === 'regular' && '0.25rem') || ($shape === 'round' && '3.125rem')};
	/* colors */
	${({ $color, $backgroundColor, theme, $forceActive }): ReturnType<typeof css> =>
		$forceActive
			? css`
					color: ${getColor(`${$color}.active`, theme)};
					background-color: ${getColor(`${$backgroundColor}.active`, theme)};
				`
			: css`
					${pseudoClasses(theme, $color, 'color')};
					${pseudoClasses(theme, $backgroundColor, 'background-color')};
					${pseudoClasses(theme, $color, 'border-color')};
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
	${({ $loading }): ReturnType<typeof css> | false | undefined =>
		$loading &&
		css`
			opacity: 0;
		`};
`;

const StyledSecondaryActionPlaceholder = styled.span<{ $padding: string }>`
	/* padding */
	padding: ${({ $padding }): string => $padding};
	order: 3;
	visibility: hidden;
`;

const StyledGrid = styled.div<{ $width: 'fill' | 'fit'; $padding: string; $minWidth?: string }>`
	width: ${({ $width }): false | string =>
		($width === 'fill' && '100%') || ($width === 'fit' && 'fit-content')};
	max-width: 100%;
	min-width: ${({ $minWidth }): string | undefined => $minWidth};

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
		margin-right: ${({ $padding }): string => $padding};
	}
`;

const SIZES: Record<ButtonSize, { label: string; icon: string; padding: string; gap: string }> &
	Record<
		'medium' | 'large' | 'extralarge',
		{ secondaryButton: { icon: string; padding: string } }
	> = {
	extrasmall: {
		label: '0.5rem',
		icon: '0.5rem',
		padding: '0.25rem',
		gap: '0.25rem'
	},
	small: {
		label: '0.75rem',
		icon: '0.75rem',
		padding: '0.25rem',
		gap: '0.25rem'
	},
	medium: {
		label: '1rem',
		icon: '1rem',
		padding: '0.5rem',
		gap: '0.5rem',
		secondaryButton: {
			icon: '1rem',
			padding: '0rem'
		}
	},
	large: {
		label: '1.25rem',
		icon: '1.25rem',
		padding: '0.5rem',
		gap: '0.5rem',
		secondaryButton: {
			icon: '1.25rem',
			padding: '0rem'
		}
	},
	extralarge: {
		label: '1.25rem',
		icon: '1.25rem',
		padding: '0.75rem',
		gap: '0.5rem',
		secondaryButton: {
			icon: '1.25rem',
			padding: '0rem'
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
	{ color, labelColor, backgroundColor }: Omit<ButtonColorsByType, 'type'>
): Without$Prefix<Pick<StyledButtonProps, '$color' | '$backgroundColor'>> {
	const colors: Without$Prefix<Pick<StyledButtonProps, '$color' | '$backgroundColor'>> = {
		...DEFAULT_COLORS[type]
	};
	if (backgroundColor) {
		colors.backgroundColor = backgroundColor;
	}
	if (labelColor) {
		colors.color = labelColor;
	}
	if (color) {
		if (type === 'default') {
			colors.backgroundColor = color;
		} else if (type === 'outlined' || type === 'ghost') {
			colors.color = color;
		}
	}
	return colors;
}

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
		secondaryAction,
		minWidth,
		buttonRef = null,
		color,
		labelColor,
		backgroundColor,
		...rest
	},
	ref
) {
	const innerButtonRef = useCombinedRefs<HTMLButtonElement>(buttonRef);

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

	const colors = useMemo(
		() => getColors(type, { labelColor, backgroundColor, color }),
		[type, backgroundColor, color, labelColor]
	);

	return (
		<StyledGrid $width={width} $minWidth={minWidth} $padding={SIZES[size].padding} ref={ref}>
			<StyledButton
				{...rest}
				$backgroundColor={colors.backgroundColor}
				$color={colors.color}
				$forceActive={!disabled && forceActive}
				$shape={shape}
				$buttonType={type}
				$padding={SIZES[size].padding}
				$gap={SIZES[size].gap}
				$iconPlacement={iconPlacement}
				$width={width}
				$minWidth={minWidth}
				disabled={disabled}
				onClick={clickHandler}
				ref={innerButtonRef}
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
					<StyledSecondaryActionPlaceholder $padding={SIZES[size].secondaryButton.padding}>
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
					$backgroundColor={colors.backgroundColor}
					$color={colors.color}
					$forceActive={!secondaryAction.disabled && !!secondaryAction.forceActive}
					$shape={shape}
					$buttonType={(type === 'outlined' && 'default') || type}
					$padding={SIZES[size].secondaryButton.padding}
					$gap={SIZES[size].gap}
					$loading={loading}
					$width="fit"
					disabled={!!secondaryAction.disabled}
					ref={secondaryAction.ref}
					onClick={secondaryActionClickHandler}
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
