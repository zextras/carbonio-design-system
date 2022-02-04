import React, { useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';
import { getColor, withPseudoClasses } from '../../theme/theme-utils';
import Icon from './Icon';
import Text from './Text';
import Spinner from './Spinner';

type IconProps = React.ComponentPropsWithoutRef<typeof Icon>;
type TextProps = React.ComponentPropsWithoutRef<typeof Text>;
type ButtonShape = 'squared' | 'rounded';
type ButtonType = 'filled' | 'outlined' | 'ghost';
type ButtonSizes = Record<
	'extrasmall' | 'small' | 'medium' | 'large',
	{ font: TextProps['size']; icon: IconProps['size']; padding: string }
> &
	Record<'medium' | 'large', { secondaryButton: keyof ButtonSizes }>;
type ButtonWidth = 'fit' | 'fill';
type ButtonIconPosition = 'left' | 'right';
type ButtonColorsByType =
	| ({
			type?: 'filled' | 'outlined';
	  } & (
			| {
					/** Main color */
					color?: string | keyof ThemeObj['palette'];
			  }
			| {
					/** Background color of the button (only for 'filled' and 'outlined' types, alternative to color) */
					backgroundColor?: string | keyof ThemeObj['palette'];
					/** Specific color of the content (only for 'filled' and 'outlined' types, alternative to color) */
					labelColor?: string | keyof ThemeObj['palette'];
			  }
	  ))
	| {
			type: 'ghost';
			/** Main color */
			color?: string | keyof ThemeObj['palette'];
	  };

type ButtonProps = {
	/** Force active status */
	activated?: boolean | undefined;
	/** Disabled status */
	disabled?: boolean | undefined;
	/** Icon to display beside the label */
	icon?: IconProps['icon'];
	/** Icon position relative to the label  */
	iconPosition?: ButtonIconPosition;
	/** Text content of the button */
	label?: string;
	/** Whether to show the loading icon */
	loading?: boolean;
	/** Main action callback */
	onClick?: (e: Event | React.MouseEvent<HTMLButtonElement>) => void;
	/** Shape of the button */
	shape?: ButtonShape;
	/** Size variant of the button */
	size?: keyof ButtonSizes;
	/** Width of the button */
	width?: ButtonWidth;
} & ButtonColorsByType & {
		size: 'medium' | 'large';
		/** Secondary action object (available only for medium and large buttons) */
		secondaryAction?: {
			/** Icon of the secondary action */
			icon: IconProps['icon'];
			/** Callback for the secondary action */
			onClick: (e: Event | React.MouseEvent<HTMLButtonElement>) => void;
			/** Disabled status for the secondary action */
			disabled?: boolean | undefined;
			/** Activated status for the secondary action */
			activated?: boolean | undefined;
		};
	};

interface StyledButtonProps {
	backgroundColor: string;
	color: string;
	padding: string;
	shape: ButtonShape;
	// cannot name this prop type because of conflicts with button type prop
	buttonType: ButtonType;
	iconPosition?: ButtonIconPosition;
	disabled: boolean;
	activated: boolean;
	onClick?: (e: Event) => void;
	width: ButtonWidth;
}

const StyledIcon = styled(Icon)<{ $loading: boolean }>`
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			opacity: 0;
		`};
`;

const StyledText = styled(Text)<{ $loading: boolean }>`
	user-select: none;
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
	role: 'button',
	tabIndex: disabled ? -1 : 0
}))<StyledButtonProps>`
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	text-transform: uppercase;
	// padding
	padding: ${({ outerPadding }): string => outerPadding};
	gap: ${({ padding }): string => padding};
	// width
	width: ${({ width }): SimpleInterpolation =>
		(width === 'fill' && '100%') || (width === 'fit' && 'fit-content')};
	// order
	${StyledIcon} {
		order: ${({ iconPosition = 'left' }): number | false =>
			(iconPosition === 'left' && 1) || (iconPosition === 'right' && 2)};
	}
	${StyledText} {
		order: ${({ iconPosition = 'left' }): number | false =>
			(iconPosition === 'left' && 2) || (iconPosition === 'right' && 1)};
	}
	// border
	border: ${({ border }): string => border};
	border-radius: ${({ shape }): SimpleInterpolation =>
		(shape === 'squared' && '4px') || (shape === 'rounded' && '1000px')};
	// colors
	${({ color, backgroundColor, theme, activated }): SimpleInterpolation =>
		activated
			? css`
					color: ${getColor(`${color}.active`, theme)};
					background-color: ${getColor(`${backgroundColor}.active`, theme)};
			  `
			: css`
					${withPseudoClasses(theme, color, 'color')}
					${withPseudoClasses(theme, backgroundColor, 'background-color')}
		${withPseudoClasses(theme, color, 'border-color')}
			  `};

	// cursor
	cursor: pointer;
	&:disabled {
		cursor: default;
	}
`;

const StyledSecondaryAction = styled(StyledButton)<{ $loading: boolean }>`
	${({ $loading }): SimpleInterpolation =>
		$loading &&
		css`
			opacity: 0;
		`};
`;

const StyledSecondaryActionPlaceholder = styled.span<{ padding: string }>`
	// padding
	padding: ${({ padding }): string => padding};
	order: 3;
	visibility: hidden;
`;

const StyledGrid = styled.div<{ width: 'fill' | 'fit'; padding: string }>`
	width: ${({ width }): SimpleInterpolation =>
		(width === 'fill' && '100%') || (width === 'fit' && 'auto')};

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
`;

const BUTTON_SIZES: ButtonSizes = {
	extrasmall: {
		font: 'extrasmall',
		icon: 'extrasmall',
		padding: '4px'
	},
	small: {
		font: 'small',
		icon: 'small',
		padding: '4px'
	},
	medium: {
		font: 'medium',
		icon: 'medium',
		padding: '8px',
		secondaryButton: 'extrasmall'
	},
	large: {
		font: 'extralarge',
		icon: 'extralarge',
		padding: '8px',
		secondaryButton: 'small'
	}
} as const;

const DEFAULT_PROPS = {
	outlined: {
		backgroundColor: 'gray6',
		color: 'primary'
	},
	ghost: {
		backgroundColor: 'transparent',
		color: 'primary'
	},
	filled: {
		backgroundColor: 'primary',
		color: 'gray6'
	}
} as const;

function getColors(
	type: NonNullable<ButtonColorsByType['type']>,
	props: ButtonColorsByType
): Pick<StyledButtonProps, 'color' | 'backgroundColor'> {
	const colors: Pick<StyledButtonProps, 'color' | 'backgroundColor'> = {
		...DEFAULT_PROPS[type]
	};
	if ('backgroundColor' in props && props.backgroundColor) {
		colors.backgroundColor = props.backgroundColor;
	}
	if ('labelColor' in props && props.labelColor) {
		colors.color = props.labelColor;
	}
	if ('color' in props && props.color) {
		if (type === 'filled') {
			colors.backgroundColor = props.color;
		} else if (type === 'outlined' || type === 'ghost') {
			colors.color = props.color;
		}
	}
	return colors;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function ButtonFn(
	{
		activated = false,
		disabled = false,
		icon,
		iconPosition,
		label,
		loading = false,
		onClick,
		secondaryAction,
		shape = 'squared',
		size = 'medium',
		type = 'filled',
		width = 'fit',
		...rest
	},
	ref
) {
	const buttonRef = useCombinedRefs<HTMLButtonElement>(ref);

	const clickHandler = useCallback(
		(e: Event | React.MouseEvent<HTMLButtonElement>) => {
			if (!disabled && onClick && !e.defaultPrevented) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);

	const secondaryActionClickHandler = useCallback(
		(e: Event | React.MouseEvent<HTMLButtonElement>) => {
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
		<StyledGrid width={width} padding={BUTTON_SIZES[size].padding}>
			<StyledButton
				backgroundColor={colors.backgroundColor}
				color={colors.color}
				activated={!disabled && activated}
				disabled={disabled}
				shape={shape}
				buttonType={type}
				padding={BUTTON_SIZES[size].padding}
				iconPosition={iconPosition}
				onClick={clickHandler}
				ref={buttonRef}
				width={width}
			>
				{icon && (
					<StyledIcon
						icon={icon}
						color="currentColor"
						size={BUTTON_SIZES[size].icon}
						$loading={loading}
					/>
				)}
				{label && (
					<StyledText color="currentColor" size={BUTTON_SIZES[size].font} $loading={loading}>
						{label}
					</StyledText>
				)}

				{secondaryAction && (
					<StyledSecondaryActionPlaceholder
						padding={BUTTON_SIZES[BUTTON_SIZES[size].secondaryButton].padding}
					>
						<Icon
							icon={secondaryAction.icon}
							color="currentColor"
							size={BUTTON_SIZES[BUTTON_SIZES[size].secondaryButton].icon}
						/>
					</StyledSecondaryActionPlaceholder>
				)}

				{loading && (
					<StyledLoadingContainer>
						<Spinner color="currentColor" />
					</StyledLoadingContainer>
				)}
			</StyledButton>
			{secondaryAction && (
				<StyledSecondaryAction
					backgroundColor={colors.backgroundColor}
					color={colors.color}
					activated={!secondaryAction.disabled && !!secondaryAction.activated}
					disabled={!!secondaryAction.disabled}
					shape={shape}
					buttonType={(type === 'outlined' && 'filled') || type}
					padding={BUTTON_SIZES[BUTTON_SIZES[size].secondaryButton].padding}
					onClick={secondaryActionClickHandler}
					$loading={loading}
					width="fit"
				>
					<Icon
						icon={secondaryAction.icon}
						color="currentColor"
						size={BUTTON_SIZES[BUTTON_SIZES[size].secondaryButton].icon}
					/>
				</StyledSecondaryAction>
			)}
		</StyledGrid>
	);
});

export default Button;
