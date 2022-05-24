/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { InputHTMLAttributes, useCallback, useMemo, useRef, useState } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import type { ThemeObj } from '../../theme/theme';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Container } from '../layout/Container';
import { Text, TextProps } from '../basic/Text';
import { Divider } from '../layout/Divider';

const ContainerEl = styled(Container)<{
	background: keyof ThemeObj['palette'];
	$disabled: boolean;
	$hasLabel: boolean;
}>`
	position: relative;
	${({ $disabled, background, theme }): SimpleInterpolation =>
		$disabled
			? css`
					background: ${getColor(`${background}.disabled`, theme)};
			  `
			: css`
					cursor: text;
					${pseudoClasses(theme, background)}
			  `};
	padding: ${({ $hasLabel }): string => ($hasLabel ? '1px' : '10px')} 12px;
	gap: 8px;
	min-height: calc(
		${({ theme }): string => theme.sizes.font.medium} * 1.5 +
			${({ theme }): string => theme.sizes.font.extrasmall} * 1.5 + 2px
	);
`;

const InputEl = styled.input<{ color: keyof ThemeObj['palette'] }>`
	border: none !important;
	height: auto !important;
	width: 100%;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, color }): string => getColor(color, theme)};

	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
	}

	transition: background 0.2s ease-out;
	line-height: 1.5;
	padding: 0;

	&::placeholder {
		color: transparent;
		font-size: 0;
	}
`;

const Label = styled.label<{ hasError: boolean; hasFocus: boolean; disabled: boolean }>`
	position: absolute;
	top: 50%;
	left: 12px;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	color: ${({ theme, hasError, hasFocus, disabled }): string =>
		getColor(
			`${(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}.${
				disabled ? 'disabled' : 'regular'
			}`,
			theme
		)};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out,
		left 150ms ease-out;
	pointer-events: none;
	user-select: none;
	max-width: calc(100% - ${({ theme }): string => `${theme.sizes.padding.large} * 2`});
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${InputEl}:focus + &,
  ${InputEl}:not(:placeholder-shown) + & {
		top: 1px;
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.extrasmall};
	}
`;

const CustomIconContainer = styled.span`
	align-self: center;
`;

const DividerEl = styled(Divider)`
	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
	}
`;

const CustomText = styled(Text)<{ size: NonNullable<TextProps['size']> }>`
	line-height: 1.5;
	padding-top: 4px;
	min-height: calc(${({ theme, size }): string => theme.sizes.font[size]} * 1.5);
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/** Input's background color */
	backgroundColor?: keyof ThemeObj['palette'];
	/** whether to disable the Input or not */
	disabled?: boolean;
	/** Input's text color */
	textColor?: keyof ThemeObj['palette'];
	/** Input's bottom border color */
	borderColor?: keyof ThemeObj['palette'];
	/** Label of the input, will act (graphically) as placeholder when the input is not focused */
	label?: string;
	/** input change callback */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/** ref to the input element */
	inputRef?: React.RefObject<HTMLInputElement>;
	/** value of the input */
	value?: string | number;
	/** default value of the input */
	defaultValue?: string | number;
	/** Whether the input has an error */
	hasError?: boolean;
	/** Whether the input should focus on load */
	autoFocus?: boolean;
	/** input autocompletion type (HTML input attribute) */
	autoComplete?: string;
	/** HTML input name */
	inputName?: string;
	/** Custom component to show on the right of the input, it occupies 56x42 px */
	CustomIcon?: React.ComponentType<{ hasError: boolean; hasFocus: boolean; disabled: boolean }>;
	/** input type attribute */
	type?: string;
	/** hide the inputs bottom line */
	hideBorder?: boolean;
	/** on Enter key callback */
	onEnter?: (e: KeyboardEvent) => void;
	/** Description of the input */
	description?: string | undefined;
}

type Input = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>> & {
	_newId?: number;
};

const Input: Input = React.forwardRef<HTMLDivElement, InputProps>(function InputFn(
	{
		autoFocus = false,
		autoComplete = 'off',
		borderColor = 'gray2',
		backgroundColor = 'gray6',
		defaultValue,
		disabled = false,
		textColor = 'text',
		label,
		inputRef = null,
		value,
		CustomIcon,
		onChange,
		hasError = false,
		inputName,
		type = 'text',
		hideBorder = false,
		onEnter,
		description,
		...rest
	},
	ref
) {
	const [hasFocus, setHasFocus] = useState(false);
	const innerRef = useRef<HTMLInputElement | null>(null);
	const comboRef = useCombinedRefs<HTMLInputElement>(inputRef, innerRef);
	const [id] = useState(() => {
		if (!Input._newId) {
			Input._newId = 0;
		}
		// eslint-disable-next-line no-plusplus
		return `input-${Input._newId++}`;
	});

	const onInputFocus = useCallback(() => {
		if (!disabled && comboRef && comboRef.current) {
			setHasFocus(true);
			comboRef.current.focus();
		}
	}, [setHasFocus, comboRef, disabled]);

	const onInputBlur = useCallback(() => setHasFocus(false), [setHasFocus]);

	const keyboardEvents = useMemo<KeyboardPreset>(() => {
		const events: KeyboardPreset = [];
		if (onEnter) {
			events.push({
				type: 'keyup',
				callback: onEnter,
				keys: ['Enter'],
				haveToPreventDefault: true,
				modifier: false
			});
		}
		return events;
	}, [onEnter]);

	useKeyboard(comboRef, keyboardEvents);

	return (
		<Container height="fit" width="fill" crossAlignment="flex-start">
			<ContainerEl
				ref={ref}
				orientation="horizontal"
				width="fill"
				height="fit"
				crossAlignment={label ? 'flex-end' : 'center'}
				borderRadius="half"
				background={backgroundColor}
				onClick={onInputFocus}
				$disabled={disabled}
				$hasLabel={!!label}
				{...rest}
			>
				<InputEl
					// eslint-disable-next-line jsx-a11y/no-autofocus
					autoFocus={autoFocus || undefined}
					autoComplete={autoComplete || 'off'} // This one seems to be a React quirk, 'off' doesn't really work
					color={textColor}
					ref={comboRef}
					type={type}
					onFocus={onInputFocus}
					onBlur={onInputBlur}
					id={id}
					name={inputName || label}
					defaultValue={defaultValue}
					value={value}
					onChange={onChange}
					disabled={disabled}
					placeholder={label}
				/>
				{label && (
					<Label htmlFor={id} hasFocus={hasFocus} hasError={hasError} disabled={disabled}>
						{label}
					</Label>
				)}
				{CustomIcon && (
					<CustomIconContainer>
						<CustomIcon hasError={hasError} hasFocus={hasFocus} disabled={disabled} />
					</CustomIconContainer>
				)}
			</ContainerEl>
			<DividerEl
				color={
					(hideBorder && 'transparent') ||
					(hasError && 'error') ||
					(hasFocus && 'primary') ||
					borderColor
				}
			/>
			{description !== undefined && (
				<CustomText
					size="extrasmall"
					color={(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}
					disabled={disabled}
					overflow="break-word"
				>
					{description}
				</CustomText>
			)}
		</Container>
	);
});

Input._newId = 0;

export { Input, InputProps };
