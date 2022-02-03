import React, { useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';
import { getColor, withPseudoClasses } from '../../theme/theme-utils';
import Icon, { IconProps } from './Icon';
import Text, { TextProps } from './Text';
import Spinner from './Spinner';

type ButtonShape = 'squared' | 'rounded';
type ButtonType = 'filled' | 'outlined' | 'ghost';
type ButtonSizes = Record<
	'extrasmall' | 'small' | 'medium' | 'large',
	{ font: TextProps['size']; icon: IconProps['size']; padding: string }
>;
type ButtonWidth = 'fit' | 'fill';
type ButtonIconPosition = 'left' | 'right';
type ButtonColors =
	| ({
			type: 'filled' | 'outlined';
	  } & (
			| {
					/** Main color of the content */
					color?: string | keyof ThemeObj['palette'];
			  }
			| {
					/** Background color of the button */
					backgroundColor?: string | keyof ThemeObj['palette'];
					/** Specific color of the label */
					labelColor?: string | keyof ThemeObj['palette'];
			  }
	  ))
	| ({
			type: 'ghost';
	  } & (
			| {
					/** Main color of the content */
					color?: string | keyof ThemeObj['palette'];
			  }
			| {
					/** Specific color of the label */
					labelColor?: string | keyof ThemeObj['palette'];
			  }
	  ));

type ButtonProps = {
	/** Force active status */
	activated?: boolean;
	/** Disabled status */
	disabled?: boolean;
	// TODO: forceActive
	/** Icon to display beside the label */
	icon?: string;
	/** Icon position relative to the label  */
	iconPosition?: ButtonIconPosition;
	/** Text content of the button */
	label?: string;
	/** Whether to show the loading icon */
	loading?: boolean;
	/** Main action callback */
	onClick?: (e: Event) => void;
	/** Secondary action callback */
	secondaryAction?: (e: React.SyntheticEvent) => void;
	/** Secondary action icon */
	secondaryActionIcon?: string;
	/** Shape of the button */
	shape?: ButtonShape;
	/** Size variant of the button */
	size?: keyof ButtonSizes;
	/** Type of the button */
	type?: ButtonType;
	/** Width of the button.
	 * <li>fit: assume the size of the content</li>
	 * <li>fill: take the width of the container</li>
	 */
	width?: ButtonWidth;
} & ButtonColors;

interface StyledButtonProps {
	backgroundColor: string;
	color: string;
	padding: string;
	shape: ButtonShape;
	// cannot name this prop type because of conflicts with button type prop
	buttonType: ButtonType;
	width: ButtonWidth;
	iconPosition?: ButtonIconPosition;
	activated: boolean;
}

const defaultPropsByType = {
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
>(({ buttonType, padding }) => ({
	border: buttonType === 'outlined' ? '1px solid' : 'none',
	outerPadding: buttonType === 'outlined' ? `calc(${padding} - 1px)` : padding
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
	// width
	width: ${({ width }): SimpleInterpolation =>
		(width === 'fill' && '100%') || (width === 'fit' && 'fit-content')};
	// cursor
	cursor: pointer;
	&:disabled {
		cursor: default;
	}
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
		padding: '8px'
	},
	large: {
		font: 'extralarge',
		icon: 'extralarge',
		padding: '8px'
	}
};

function getColors(
	type: ButtonColors['type'],
	props: ButtonColors
): Pick<StyledButtonProps, 'color' | 'backgroundColor'> {
	const colors: Pick<StyledButtonProps, 'color' | 'backgroundColor'> = {
		...defaultPropsByType[type]
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
		secondaryActionIcon,
		shape = 'squared',
		size = 'medium',
		type = 'filled',
		width = 'fit',
		...rest
	},
	ref
) {
	const buttonRef = useCombinedRefs<HTMLButtonElement>(ref);
	const keyPress = useCallback(
		(e: Event) => {
			if (!disabled && onClick) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);
	const keyEvents = useMemo(() => getKeyboardPreset('button', keyPress), [keyPress]);
	useKeyboard(buttonRef, keyEvents);

	const colors = useMemo(() => getColors(type, { type, ...rest }), [type, rest]);

	return (
		<StyledButton
			backgroundColor={colors.backgroundColor}
			color={colors.color}
			activated={activated}
			disabled={disabled}
			shape={shape}
			buttonType={type}
			width={width}
			padding={BUTTON_SIZES[size].padding}
			iconPosition={iconPosition}
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
			{loading && (
				<StyledLoadingContainer>
					<Spinner color="currentColor" />
				</StyledLoadingContainer>
			)}
		</StyledButton>
	);
});

export default Button;
