/*
 * Button Medium
 *
 * Label: "BUTTON"
 * Font-size: medium (16px)
 * Icon-name: heart-outline
 * Icon-size: medium (16px)
 * Padding: small (8px)
 * Resulting height: 32px
 *
 * button background-color: primary/regular
 * icon color: gray6/regular
 * color: gray6/regular
 * */

import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useCombinedRefs } from '../../../hooks/useCombinedRefs';
import { getKeyboardPreset, Icon, useKeyboard } from '../../../index';
import { ThemeObj } from '../../../theme/theme';
import { getColor } from '../../../theme/theme-utils';

interface StyledButtonProps {
	backgroundColor: string | keyof ThemeObj['palette'];
	color: string | keyof ThemeObj['palette'];
	disabled: boolean;
	shape: 'rounded' | 'square';
	size: 'extrasmall' | 'small' | 'medium' | 'large';
	// cannot name this prop type because of conflicts with button type prop
	styleType: 'filled' | 'outlined' | 'ghost';
	width: 'fit' | 'fill';
}

const StyledButton = styled.button<StyledButtonProps>`
	outline: none;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	font-weight: 400;
	padding: 8px;
	*:not(:last-child) {
		padding-right: 8px;
	}
	line-height: 1;
	transition: 0.2s ease-out;
`;

const StyledIcon = styled(Icon)`
	display: block;
	color: ${getColor('gray6')};
`;

const StyledLabel = styled.span<{ color: string }>`
	color: ${({ theme, color }): string => getColor(color, theme)};
`;

interface ButtonProps {
	/** Background color of the button */
	backgroundColor?: string | keyof ThemeObj['palette'];
	/** Main color of the content */
	color?: string | keyof ThemeObj['palette'];
	/** Disabled status */
	disabled?: boolean;
	// TODO: forceActive
	/** Icon to display beside the label */
	icon?: string;
	/** Icon position relative to  */
	iconPosition?: 'left' | 'right';
	/** Text content of the button */
	label?: string;
	/** Specific color of the label */
	labelColor?: string | keyof ThemeObj['palette'];
	/** Whether to show the loading icon */
	loading?: boolean;
	/** Main action callback */
	onClick?: (e: Event) => void;
	/** Secondary action callback */
	secondaryAction?: (e: React.SyntheticEvent) => void;
	/** Secondary action icon */
	secondaryActionIcon?: string;
	/** Shape of the button */
	shape?: 'rounded' | 'square';
	/** Size variant of the button */
	size?: 'extrasmall' | 'small' | 'medium' | 'large';
	/** Type of the button */
	type?: 'filled' | 'outlined' | 'ghost';
	/** Width of the button.
	 * <li>fit: assume the size of the content</li>
	 * <li>fill: take the width of the container</li>
	 */
	width?: 'fit' | 'fill';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function ButtonFn(
	{
		backgroundColor = 'primary',
		color = 'gray6',
		disabled = false,
		icon,
		iconPosition,
		label,
		labelColor,
		loading,
		onClick,
		secondaryAction,
		secondaryActionIcon,
		shape = 'square',
		size = 'medium',
		type = 'filled',
		width = 'fit'
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

	return (
		<StyledButton
			backgroundColor={backgroundColor}
			color={color}
			disabled={disabled}
			shape={shape}
			size={size}
			styleType={type}
			width={width}
		>
			<StyledIcon width="16px" height="16px" fill="currentColor" viewBox="0 0 24 24" />
			<StyledLabel color={labelColor || color}>BUTTON</StyledLabel>
		</StyledButton>
	);
});

export default Button;
